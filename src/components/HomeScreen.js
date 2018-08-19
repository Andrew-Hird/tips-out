import React from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Grid, Col, Row } from 'native-base'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: '',
            tipPercent: '17.5',
            calculatedPrice: '',
        }
    }

    static navigationOptions = {
        header: null
    };

    handlePriceInput = (price) => {
        console.log(price)
        this.setState({ price })
        this.calcPrice(price)
    };

    handleTipInput = (tipPercent) => {
        this.setState({ tipPercent })
    }

    calcPrice = (price) => {
        this.setState({
            calculatedPrice: price * 100
        })
    };

    render() {
        const defaultPercents = [ '15', '17.5', '20' ]

        return (
            <Container>
                {/*<Content padder contentContainerStyle={{ flex: 1 }}>*/}
                <Content padder>
                    <Grid>
                        <Row style={{ }}>
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
                        <Row style={{ }}>
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
                                        >
                                            <Text>{percent}%</Text>
                                        </Button>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Grid>
                    {/*<Text>*/}
                        {/*{this.state.price}*/}
                    {/*</Text>*/}
                    {/*<Text>*/}
                        {/*{this.state.calculatedPrice}*/}
                    {/*</Text>*/}
                </Content>
            </Container>
        )
    }
}
