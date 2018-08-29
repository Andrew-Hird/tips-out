import React from 'react'
import { connect } from 'react-redux'
import { Container, Content, Item, Input, Label, Text, Button, Grid, Col, Row, CheckBox, ListItem, Body } from 'native-base'
import numeral from 'numeral'
import { listRates, setStateIndex, setCurrency, setOptions } from '../reducer'
import StateRates from '../stateRates'


class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: '',
            tipPercent: '17.5',
            tipAmount: '0',
            taxAmount: '0',
            calculatedPrice: '0',
            selectedState: undefined,
        }
    }

    static navigationOptions = {
        header: null
    }

    handlePriceInput = (price) => {
        this.setState({ price })
    }

    handleTipInput = (tipPercent) => {
        this.setState({ tipPercent })
    }

    handleTipSelect = () => {
        this.setOptions('tip')

    }

    handleStateSelect = () => {
        this.setOptions('state')
    }

    handleOffshoreSelectSelect = () => {
        this.setOptions('margin')
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
        const margin = this.props.options.margin ? this.getOffshoreMarginAmount() : 0

        return price + tip + tax + margin
    }

    formatPrice(price) {
        return numeral(price).format('$0,0.00')
    }

    convertAndFormatPrice(price) {
        const conversionRate = parseFloat(this.props.selectedCurrencyRate)
        const convertedPrice  = price * conversionRate

        return `${numeral(convertedPrice).format('$0,0.00')} ${this.props.selectedCurrency}`
    }

    render() {
        const defaultPercents = [ '15', '17.5', '20' ]

        return (
            <Container>
                <Content padder contentContainerStyle={{ flex: 1 }}>
                    <Grid style={{ marginTop: 20 }}>
                        <Row>
                            <Col>
                                <Item floatingLabel>
                                    <Label>Price</Label>
                                    <Input
                                        keyboardType='numeric'
                                        clearButtonMode='always'
                                        onChangeText={this.handlePriceInput}
                                        value={this.state.price}
                                    />
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Item floatingLabel>
                                    <Label>Tip %</Label>
                                    <Input
                                        keyboardType='numeric'
                                        onChangeText={this.handleTipInput}
                                        value={this.state.tipPercent}
                                    />
                                </Item>
                            </Col>
                            {defaultPercents.map((percent, i) => {
                                return (
                                    <Col key={i}>
                                        <Button
                                            info
                                            bordered={this.state.tipPercent !== percent}
                                            onPress={() => this.handleTipInput(percent)}
                                            style={{ width: 75 }}
                                        >
                                            <Text>{percent}%</Text>
                                        </Button>
                                    </Col>
                                )
                            })}
                        </Row>
                        <Row>
                            <Col>
                                <Text>Tip ({this.state.tipPercent}%)</Text>
                                <ListItem onPress={this.handleTipSelect}>
                                    <CheckBox checked={this.props.options.tip} onPress={this.handleTipSelect} />
                                    <Body>
                                        <Text>{this.formatPrice(this.getTipAmount())} ({this.convertAndFormatPrice(this.getTipAmount())})</Text>
                                    </Body>
                                </ListItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Text>State Tax ({this.props.selectedStateName} - {this.props.selectedStateRate}%)</Text>
                                <ListItem onPress={this.handleStateSelect}>
                                    <CheckBox checked={this.props.options.state} onPress={this.handleStateSelect} />
                                    <Body>
                                        <Text>{this.formatPrice(this.getTaxAmount())} ({this.convertAndFormatPrice(this.getTaxAmount())})</Text>
                                    </Body>
                                </ListItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Text>Offshore Service Margin ({this.props.offshoreMargin}%)</Text>
                                <ListItem onPress={this.handleOffshoreSelectSelect}>
                                    <CheckBox checked={this.props.options.margin} onPress={this.handleOffshoreSelectSelect} />
                                    <Body>
                                        <Text>{this.convertAndFormatPrice(this.getOffshoreMarginAmount())}</Text>
                                    </Body>
                                </ListItem>
                            </Col>
                        </Row>
                        <Row size={3}>
                            <Text>
                                Total
                                {'\n'}
                                {this.formatPrice(this.getCalculatedPrice())} ({this.convertAndFormatPrice(this.getCalculatedPrice())})
                            </Text>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        rates: state.rates.rates,
        selectedStateName: StateRates[state.selectedStateIndex].name,
        selectedStateRate: StateRates[state.selectedStateIndex].combined,
        selectedStateIndex: state.selectedStateIndex,
        selectedCurrency: state.selectedCurrency,
        selectedCurrencyRate: state.rates.rates[state.selectedCurrency],
        offshoreMargin: state.offshoreMargin,
        options: state.options,
    }
}

const mapDispatchToProps = {
    listRates,
    setStateIndex,
    setCurrency,
    setOptions
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

