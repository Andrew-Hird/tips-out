import React from 'react'
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Modal from 'react-native-modal'
import { Container, Item, Label, Picker, Icon, Button, Text, Toast } from 'native-base'
import { connect } from 'react-redux'
import getSymbolFromCurrency from 'currency-symbol-map'
import StateRates from '../stateRates'
import { listRates, setSettings } from '../reducer'

import LastUpdated from './lastUpdated'
import moment from 'moment/moment'


class SettingsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedState: props.selectedStateIndex,
            selectedCurrency: props.selectedCurrency,
            showInfoModal: false,
            showOffshoreInfoModal: false,
            showOffshoreModal: false,
        }
    }

    static navigationOptions () {
        return {
            title: 'Settings'
        }
    }

    handleStateSelect = (selectedStateIndex) => {
        this.setSettings('selectedStateIndex', selectedStateIndex)
    }

    handleCurrencySelect = (selectedCurrency) => {
        this.setSettings('selectedCurrency', selectedCurrency)
    }

    handleOffshoreInput = (offshoreMargin) => {
        this.setSettings('offshoreMargin', offshoreMargin)
    }

    setSettings(key, value) {
        const settings = {
            ...this.props.settings,
            [key]: value,
        }
        this.props.setSettings(settings)
    }

    toggleTaxInfo = () => {
        this.setState({ showInfoModal: !this.state.showInfoModal })
    }

    toggleOffshoreModal = () => {
        this.setState({ showOffshoreModal: !this.state.showOffshoreModal })
    }

    toggleOffshoreInfoModal = () => {
        this.setState({ showOffshoreInfoModal: !this.state.showOffshoreInfoModal })
    }

    setDefaultOffshore = () => {
        this.handleOffshoreInput('2.10')
        this.toggleOffshoreModal()
    }

    getRates = () => {
        const ratesTimestamp = moment.unix(this.props.rates.timestamp)
        const hoursRates = moment().isSame(ratesTimestamp, 'hour')

        if (!hoursRates) {
            this.props.listRates()
        } else {
            Toast.show({ text: 'Rates already current' })
        }
    }

    render() {
        const countryRates = this.props.rates.rates
        return (
            <Container>
                <View style={styles.contentStyle}>
                    <Button
                        block
                        info
                        onPress={this.getRates}
                        disabled={this.props.loading}
                    >
                        {this.props.loading ? (
                            <ActivityIndicator size="small" />
                        ) : (
                            <View><Icon name='refresh' /></View>
                        )}
                        <Text>Get Rates</Text>
                    </Button>
                    <Item picker>
                        <Label>Home Currency</Label>
                        <Picker
                            mode="dropdown"
                            iosHeader="Home Currency"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="State"
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.props.settings.selectedCurrency}
                            onValueChange={this.handleCurrencySelect}
                        >
                            {countryRates.map((country, i) => {
                                const { currency, rate } = country
                                const currencySymbol = getSymbolFromCurrency(currency) || ''

                                return (
                                    <Picker.Item key={i} label={`\u202D ${currency} - ${currencySymbol}${rate}`} value={currency} />
                                )
                            })}
                        </Picker>
                    </Item>
                    <Item picker>
                        <Label>State</Label>
                        <Picker
                            mode="dropdown"
                            iosHeader="Destination Currency"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="State"
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.props.settings.selectedStateIndex}
                            onValueChange={this.handleStateSelect}
                        >
                            {StateRates.map((state, i) => {
                                return (
                                    <Picker.Item key={i} label={`${state.name} - ${state.combined}%`} value={i} />
                                )
                            })}
                        </Picker>
                        <Button transparent style={{ position: 'absolute', right: -15 }} onPress={this.toggleTaxInfo}>
                            <Icon name='information-circle' />
                        </Button>
                    </Item>
                    <Item>
                        <View style={styles.offshoreCont}>
                            <Text style={styles.offshoreText}>Offshore Service Margin</Text>
                            <TouchableOpacity onPress={this.toggleOffshoreModal} style={styles.offsboreTouchable}>
                                <Text style={styles.offshoreTextBlack}>{this.props.settings.offshoreMargin}% </Text>
                                <Icon name='arrow-down' style={styles.offshoreIcon} />
                            </TouchableOpacity>
                        </View>
                        <Button transparent style={{ position: 'absolute', right: -15 }} onPress={this.toggleOffshoreInfoModal}>
                            <Icon name='information-circle' />
                        </Button>
                    </Item>
                </View>
                <LastUpdated />
                <Modal
                    isVisible={this.state.showInfoModal}
                    onBackdropPress={this.toggleTaxInfo}
                >
                    <View style={styles.modalContent}>
                        <Text>State tax is calculated by summing the State Rate and a average of Local / County Rates.</Text>
                    </View>
                </Modal>
                <Modal
                    isVisible={this.state.showOffshoreModal}
                    onBackdropPress={this.toggleOffshoreModal}
                >
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={this.handleOffshoreInput}
                            value={this.props.settings.offshoreMargin}
                            autoFocus
                            selectTextOnFocus
                            keyboardType='numeric'
                            clearButtonMode='always'
                        />
                        <Button
                            block
                            info
                            style={{ marginTop: 20 }}
                            disabled={this.props.settings.offshoreMargin === '2.10'}
                            onPress={this.setDefaultOffshore}
                        >
                            <Text>Set Default</Text>
                        </Button>
                    </View>
                </Modal>
                <Modal
                    isVisible={this.state.showOffshoreInfoModal}
                    onBackdropPress={this.toggleOffshoreInfoModal}
                >
                    <View style={styles.modalContent}>
                        <Text>Offshore Service Margin is a percentage added on when using a credit card abroad.</Text>
                    </View>
                </Modal>
            </Container>
        )
    }
}

const sortRates = ratesObj => {
    if (ratesObj) {
        const ratesKeys = Object.keys(ratesObj)
        return ratesKeys.map(key => ({key: key, currency: key, rate: ratesObj[key]}))
    }
    return []
}

const mapStateToProps = state => {
    let rates = {
        ...state.rates,
        rates: sortRates(state.rates.rates),
    }
    return {
        rates: rates,
        selectedStateIndex: state.selectedStateIndex,
        selectedCurrency: state.selectedCurrency,
        settings: state.settings,
        loading: state.loading
    }
}

const mapDispatchToProps = {
    listRates,
    setSettings,
}

export const styles = StyleSheet.create({
    contentStyle: {
        flex: 1,
        padding: 10,
    },
    offshoreCont: {
        height: 46,
        alignItems: 'center',
        flexDirection: 'row'
    },
    offsboreTouchable: {
        flexDirection: 'row'
    },
    offshoreIcon: {
        marginLeft: 16
    },
    offshoreText: {
        fontSize: 17,
        color: '#575757',
        paddingRight: 5,
    },
    offshoreTextBlack: {
        fontSize: 17,
        paddingLeft: 16,
        paddingRight: 16,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    modalInput: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        fontSize: 30,
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
