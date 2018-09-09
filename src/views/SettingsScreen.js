import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Container, Content, Item, Label, Picker, Icon, Button, Text } from 'native-base'
import StateRates from '../stateRates'
import { connect } from 'react-redux'
import { listRates, setSettings } from '../reducer'

import LastUpdated from './lastUpdated'


class SettingsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedState: props.selectedStateIndex,
            selectedCurrency: props.selectedCurrency,
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

    setSettings(key, value) {
        const settings = {
            ...this.props.settings,
            [key]: value,
        }
        this.props.setSettings(settings)
    }

    render() {
        const countryRates = this.props.rates.rates
        return (
            <Container>
                <Content padder contentContainerStyle={{ flex: 1 }}>
                    <Button
                        block
                        info
                        onPress={this.props.listRates}
                        disabled={this.props.loading}
                    >
                        {this.props.loading ? (
                            <ActivityIndicator size="small" />
                        ) : (
                            <View>
                                <Icon name='refresh' />
                            </View>
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
                                return (
                                    <Picker.Item key={i} label={`${country.currency} - ${country.rate}`} value={country.currency} />
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
                    </Item>
                </Content>
                <LastUpdated />
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
