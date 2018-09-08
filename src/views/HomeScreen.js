import React from 'react'
import { Keyboard, View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { Container, Content, Item, Input, Label, Text, Button, Grid, Col, Row, CheckBox, Icon } from 'native-base'
import { listRates, setPrice, setTipPercent, setOptions } from '../reducer'
import StateRates from '../stateRates'

import Divider from '../components/Divider'
import TotalBadge from '../components/TotalBadge'
import PriceBadge from '../components/PriceBadge'
import Conversions from '../utilities/conversions'
import Format from '../utilities/format'


class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: '0',
            tipPercent: '17.5',
            tipAmount: '0',
            taxAmount: '0',
            calculatedPrice: '0',
            selectedState: undefined,
            showInputModal: false,
        }
    }

    static navigationOptions = {
        header: null
    }

    hideKeyboard() {
        Keyboard.dismiss()
    }

    handlePriceInput = (price) => {
        this.props.setPrice(price)
    }

    handleTipInput = (tipPercent) => {
        this.props.setTipPercent(tipPercent)
    }

    handleTipSelect = () => {
        this.setOptions('tip')
        this.hideKeyboard()

    }

    handleStateSelect = () => {
        this.setOptions('state')
        this.hideKeyboard()
    }

    handleOffshoreSelectSelect = () => {
        this.setOptions('margin')
        this.hideKeyboard()
    }

    setOptions(key) {
        const options = {
            ...this.props.options,
            [key]: !this.props.options[key],
        }
        this.props.setOptions(options)
    }

    getTipAmount() {
        return Conversions.getTipAmount(this.props)
    }

    getTaxAmount() {
        return Conversions.getTaxAmount(this.props)
    }

    getOffshoreMarginAmount() {
        return Conversions.getOffshoreMarginAmount(this.props)
    }

    getCalculatedPrice() {
        return Conversions.getCalculatedPrice(this.props)
    }

    getCalculatedPricePlusMargin() {
        return Conversions.getCalculatedPricePlusMargin(this.props)
    }

    formatPrice(price) {
        const { baseCurrency } = this.props
        return Format.formatPrice(price, baseCurrency)
    }

    convertAndFormatPrice(price) {
        const { selectedCurrencyRate, selectedCurrency } = this.props
        return Format.convertAndFormatPrice(price, selectedCurrencyRate, selectedCurrency)
    }

    render() {
        return (
            <Container>
                <Content padder contentContainerStyle={{ flex: 1 }}>
                    <Grid style={{ marginTop: 20 }}>
                        <Row>
                            <Col>
                                <Item rounded style={{ height: 80 }}>
                                    <Icon active type='MaterialIcons' name='attach-money' />
                                    <Input
                                        keyboardType='numeric'
                                        clearButtonMode='always'
                                        onChangeText={this.handlePriceInput}
                                        value={this.props.price}
                                        style={{ fontSize: 50 }}
                                    />
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <Col size={15} style={styles.col} onPress={this.handleTipSelect}>
                                        <CheckBox checked={this.props.options.tip} onPress={this.handleTipSelect} color="#007aff" />
                                    </Col>
                                    <Col size={75} style={styles.col}>
                                        <Text>Tip ({this.props.tipPercent}%)</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    {this.props.defaultPercents.map((percent, i) => {
                                        return (
                                            <Col key={i} style={styles.col}>
                                                <Button
                                                    primary
                                                    disabled={!this.props.options.tip}
                                                    bordered={this.props.tipPercent !== percent}
                                                    onPress={() => {
                                                        this.handleTipInput(percent)
                                                        this.hideKeyboard()
                                                    }}
                                                    style={{ width: 75 }}
                                                >
                                                    <Text>{percent}%</Text>
                                                </Button>
                                            </Col>
                                        )
                                    })}
                                    <Col style={styles.col}>
                                        <Button
                                            primary
                                            disabled={!this.props.options.tip}
                                            bordered={this.props.tipPercent === this.props.defaultPercents.find(percent => percent === this.props.tipPercent)}
                                            onPress={() => {
                                                this.setState({ showInputModal: true })
                                                this.hideKeyboard()
                                            }}
                                            style={{ width: 75 }}
                                        >
                                            <Text>Other</Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 10, marginBottom: 10, height: 30 }}>
                            <Col>
                                <Row>
                                    <Col>
                                        <PriceBadge
                                            disabled={!this.props.options.tip}
                                            label={this.formatPrice(this.getTipAmount())}
                                        />
                                    </Col>
                                    <Col>
                                        <PriceBadge
                                            right
                                            disabled={!this.props.options.tip}
                                            label={this.convertAndFormatPrice(this.getTipAmount())}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Divider />

                        <Row style={styles.row}>
                            <Col>
                                <Row>
                                    <Col size={15} style={styles.col} onPress={this.handleStateSelect}>
                                        <CheckBox checked={this.props.options.state} onPress={this.handleStateSelect} color="#007aff" />
                                    </Col>
                                    <Col size={75} style={styles.col}>
                                        <Text>State Tax ({this.props.selectedStateName} - {this.props.selectedStateRate}%)</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={styles.col}>
                                        <PriceBadge
                                            disabled={!this.props.options.state}
                                            label={this.formatPrice(this.getTaxAmount())}
                                        />
                                    </Col>
                                    <Col style={styles.col}>
                                        <PriceBadge
                                            right
                                            disabled={!this.props.options.state}
                                            label={this.convertAndFormatPrice(this.getTaxAmount())}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Divider />

                        <Row style={styles.row}>
                            <Row>
                                <Col size={15} style={styles.col} onPress={this.handleOffshoreSelectSelect}>
                                    <CheckBox checked={this.props.options.margin} onPress={this.handleOffshoreSelectSelect} color="#007aff" />
                                </Col>
                                <Col size={35} style={styles.col}>
                                    <Text>Offshore Service Margin ({this.props.offshoreMargin}%)</Text>
                                </Col>
                                <Col size={50} style={styles.col}>
                                    <PriceBadge
                                        right
                                        disabled={!this.props.options.margin}
                                        label={this.convertAndFormatPrice(this.getOffshoreMarginAmount())}
                                    />
                                </Col>
                            </Row>
                        </Row>

                        <Divider />

                        <Row style={styles.row}>
                            <Col>
                                <Row>
                                    <Col style={styles.col}>
                                        <TotalBadge label={this.formatPrice(this.getCalculatedPrice())} />
                                    </Col>
                                    <Col style={styles.col}>
                                        <TotalBadge label={this.convertAndFormatPrice(this.getCalculatedPricePlusMargin())} right />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
                <Modal
                    isVisible={this.state.showInputModal}
                    onBackdropPress={() => this.setState({ showInputModal: false })}
                >
                    <View style={styles.modalContent}>
                        <Item floatingLabel>
                            <Label>Tip %</Label>
                            <Input
                                keyboardType='numeric'
                                clearButtonMode='always'
                                onChangeText={this.handleTipInput}
                                value={this.props.tipPercent}
                                autoFocus={true}
                                selectTextOnFocus={true}
                            />
                        </Item>
                    </View>
                </Modal>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        price: state.price,
        tipPercent: state.tipPercent,
        rates: state.rates.rates,
        baseCurrency: state.rates.base,
        selectedStateName: StateRates[state.settings.selectedStateIndex].name,
        selectedStateRate: StateRates[state.settings.selectedStateIndex].combined,
        selectedStateIndex: state.settings.selectedStateIndex,
        selectedCurrency: state.settings.selectedCurrency,
        selectedCurrencyRate: state.rates.rates[state.settings.selectedCurrency],
        offshoreMargin: state.settings.offshoreMargin,
        options: state.options,
        defaultPercents: [ '15', '17.5', '20' ],
    }
}

const mapDispatchToProps = {
    listRates,
    setPrice,
    setTipPercent,
    setOptions
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    priceButton: {
        alignSelf: 'flex-end'
    },
    row: {
        marginTop: 10,
        marginBottom: 10,
    },
    col: {
        justifyContent: 'center',
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

