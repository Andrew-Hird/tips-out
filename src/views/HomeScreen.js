import React from 'react'
import { Keyboard, View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { Container, Content, Item, Input, Label, Text, Button, Grid, Col, Row, CheckBox, Icon, ListItem, Body, H2, H3 } from 'native-base'
import numeral from 'numeral'
import { listRates, setStateIndex, setCurrency, setOptions } from '../reducer'
import StateRates from '../stateRates'

import Divider from '../components/Divider'


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

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible })

    hideKeyboard() {
        Keyboard.dismiss()
    }

    handlePriceInput = (price) => {
        this.setState({ price })
    }

    handleTipInput = (tipPercent) => {
        this.setState({ tipPercent })
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
        const price = parseFloat(this.state.price) || 0
        const tipPercent = parseFloat(this.state.tipPercent)

        return price * (tipPercent / 100)

    }

    getTaxAmount() {
        const price = parseFloat(this.state.price) || 0
        const taxRate = parseFloat(this.props.selectedStateRate)

        return price * (taxRate / 100)
    }

    getOffshoreMarginAmount() {
        const price = parseFloat(this.state.price) || 0
        const offshoreMargin = parseFloat(this.props.offshoreMargin)

        const tip = this.props.options.tip? this.getTipAmount() : 0
        const tax = this.props.options.state? this.getTaxAmount() : 0

        return (price + tip + tax) * (offshoreMargin / 100)
    }

    getCalculatedPrice() {
        const price = parseFloat(this.state.price) || 0
        const tip = this.props.options.tip? this.getTipAmount() : 0
        const tax = this.props.options.state? this.getTaxAmount() : 0

        return price + tip + tax
    }

    getCalculatedPricePlusMargin() {
        const calculatedPrice = this.getCalculatedPrice()
        const margin = this.props.options.margin ? this.getOffshoreMarginAmount() : 0

        return calculatedPrice + margin
    }

    formatPrice(price) {
        return `${numeral(price).format('$0,0.00')} ${this.props.baseCurrency}`
    }

    convertAndFormatPrice(price) {
        const conversionRate = parseFloat(this.props.selectedCurrencyRate)
        const convertedPrice  = price * conversionRate

        return `${numeral(convertedPrice).format('$0,0.00')} ${this.props.selectedCurrency}`
    }

    renderPriceButton(price, position, large) {

        return (
            <Button rounded light small={!large} disabled style={{ alignSelf: position }}>
                <Text>{price}</Text>
            </Button>
        )
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
                                        value={this.state.price}
                                        style={{ fontSize: 50 }}
                                    />
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <Col size={15} style={styles.col}>
                                        <CheckBox checked={this.props.options.tip} onPress={this.handleTipSelect} />
                                    </Col>
                                    <Col size={75} style={styles.col}>
                                        <Text onPress={this.handleTipSelect}>Tip ({this.state.tipPercent}%)</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    {this.props.defaultPercents.map((percent, i) => {
                                        return (
                                            <Col key={i} style={styles.col}>
                                                <Button
                                                    info
                                                    bordered={this.state.tipPercent !== percent}
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
                                            info
                                            bordered={this.state.tipPercent === this.props.defaultPercents.find(percent => percent === this.state.tipPercent)}
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
                                        {this.renderPriceButton(this.formatPrice(this.getTipAmount()), 'flex-start')}
                                    </Col>
                                    <Col>
                                        {this.renderPriceButton(this.convertAndFormatPrice(this.getTipAmount()), 'flex-end')}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Divider />

                        <Row style={styles.row}>
                            <Col>
                                <Row>
                                    <Col size={15} style={styles.col}>
                                        <CheckBox checked={this.props.options.state} onPress={this.handleStateSelect} />
                                    </Col>
                                    <Col size={75} style={styles.col}>
                                        <Text onPress={this.handleStateSelect}>State Tax ({this.props.selectedStateName} - {this.props.selectedStateRate}%)</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={styles.col}>
                                        {this.renderPriceButton(this.formatPrice(this.getTaxAmount()), 'flex-start')}
                                    </Col>
                                    <Col style={styles.col}>
                                        {this.renderPriceButton(this.convertAndFormatPrice(this.getTaxAmount()), 'flex-end')}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Divider />

                        <Row style={styles.row}>
                            <Row>
                                <Col size={15} style={styles.col}>
                                    <CheckBox checked={this.props.options.margin} onPress={this.handleOffshoreSelectSelect} />
                                </Col>
                                <Col size={35} style={styles.col}>
                                    <Text onPress={this.handleOffshoreSelectSelect}>Offshore Service Margin ({this.props.offshoreMargin}%)</Text>
                                </Col>
                                <Col size={50} style={styles.col}>
                                    {this.renderPriceButton(this.convertAndFormatPrice(this.getOffshoreMarginAmount()), 'flex-end')}
                                </Col>
                            </Row>
                        </Row>

                        <Divider />

                        <Row style={styles.row}>
                            <Col>
                                <Row>
                                    <Col style={styles.col}>
                                        <H2>Total</H2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={styles.col}>
                                        {this.renderPriceButton(this.formatPrice(this.getCalculatedPrice()), 'flex-start', true)}
                                    </Col>
                                    <Col style={styles.col}>
                                        {this.renderPriceButton(this.convertAndFormatPrice(this.getCalculatedPricePlusMargin()), 'flex-end', true)}
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
                                value={this.state.tipPercent}
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
        rates: state.rates.rates,
        baseCurrency: state.rates.base,
        selectedStateName: StateRates[state.selectedStateIndex].name,
        selectedStateRate: StateRates[state.selectedStateIndex].combined,
        selectedStateIndex: state.selectedStateIndex,
        selectedCurrency: state.selectedCurrency,
        selectedCurrencyRate: state.rates.rates[state.selectedCurrency],
        offshoreMargin: state.offshoreMargin,
        options: state.options,
        defaultPercents: [ '15', '17.5', '20' ],
    }
}

const mapDispatchToProps = {
    listRates,
    setStateIndex,
    setCurrency,
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
        height: 60,
        marginTop: 10,
        marginBottom: 10,
    },
    col: {
        justifyContent: 'center',
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

