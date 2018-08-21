import React from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Grid, Col, Row, Picker, Icon } from 'native-base'

import TaxRates from '../stateRates'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: '',
            tipPercent: '17.5',
            calculatedPrice: '',
            selectedState: undefined,
        }
    }

    static navigationOptions = {
        header: null
    };

    handleStateSelect = (selectedState) => {
        this.setState({ selectedState })
    }

    handlePriceInput = (price) => {
        this.setState({ price }, () => this.calcPrice())
    };

    handleTipInput = (tipPercent) => {
        this.setState({ tipPercent }, () => this.calcPrice())
    }

    calcPrice = () => {
        const { price, tipPercent } = this.state

        let calculatedPrice = price * (tipPercent / 10)

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
