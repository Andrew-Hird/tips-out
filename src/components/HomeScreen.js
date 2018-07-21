import React from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Text } from 'native-base'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: '',
            calculatedPrice: '',
        }
    }

    static navigationOptions = {
        header: null
    };

    handlePriceInput = (price) => {
        console.log(price)
        this.setState({price})
        this.calcPrice(price)
    };

    calcPrice = (price) => {
        this.setState({
            calculatedPrice: price * 100
        })
    };

    render() {
        return (
            <Container>
                <Header />
                <Content>
                    <Item floatingLabel>
                        <Label>Price</Label>
                        <Input
                            keyboardType='numeric'
                            clearButtonMode='always'
                            onChangeText={this.handlePriceInput}
                            value={this.state.price}
                        />
                    </Item>
                    <Text>
                        {this.state.price}
                    </Text>
                    <Text>
                        {this.state.calculatedPrice}
                    </Text>
                </Content>
            </Container>
        )
    }
}
