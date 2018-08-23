import React from 'react'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Grid, Col, Row, Picker, Icon } from 'native-base'
import { listRates, setStateIndex, setCurrency } from '../reducer'

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: '',
            tipPercent: '17.5',
            calculatedPrice: '0',
            selectedState: undefined,
        }
    }

    static navigationOptions = {
        header: null
    };

    handlePriceInput = (price) => {
        this.setState({ price }, () => this.calcPrice())
    };

    handleTipInput = (tipPercent) => {
        this.setState({ tipPercent }, () => this.calcPrice())
    }

    calcPrice = () => {
        const price = parseFloat(this.state.price) || 0
        const tipPercent = parseFloat(this.state.tipPercent)

        const tip = price * (tipPercent / 100)

        let calculatedPrice = price + tip

        this.setState({ calculatedPrice })
    };

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
                        <Row size={3}>
                            <Text>
                                ${this.state.calculatedPrice}
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
        selectedStateIndex: state.selectedStateIndex,
        selectedCurrency: state.selectedCurrency,
    }
}

const mapDispatchToProps = {
    listRates,
    setStateIndex,
    setCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

