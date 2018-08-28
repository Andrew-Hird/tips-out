import React from 'react'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Grid, Col, Row, Picker, Icon } from 'native-base'
import numeral from 'numeral'
import { listRates, setStateIndex, setCurrency } from '../reducer'
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
    };

    componentDidUpdate(){
        console.log('updated!')
    }

    handlePriceInput = (price) => {
        this.setState({ price })
    };

    handleTipInput = (tipPercent) => {
        this.setState({ tipPercent })
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

    getCalculatedPrice() {
        const price = parseFloat(this.state.price) || 0
        const conversionRate = parseFloat(this.props.selectedCurrencyRate)

        return (price + this.getTipAmount() + this.getTaxAmount())
        // return (price + this.getTipAmount() + this.getTaxAmount()) * conversionRate
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
                            <Text>
                                Tip ({this.state.tipPercent}%)
                                {'\n'}
                                {this.formatPrice(this.getTipAmount())} ({this.convertAndFormatPrice(this.getTaxAmount())})
                            </Text>
                        </Row>
                        <Row>
                            <Text>
                                State Tax ({this.props.selectedStateName} - {this.props.selectedStateRate}%)
                                {'\n'}
                                {this.formatPrice(this.getTaxAmount())} ({this.convertAndFormatPrice(this.getTaxAmount())})
                            </Text>
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
        selectedCurrencyRate: state.rates.rates[state.selectedCurrency]
    }
}

const mapDispatchToProps = {
    listRates,
    setStateIndex,
    setCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

