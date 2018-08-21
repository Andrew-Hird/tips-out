import React from 'react'
import { Container, Content, Form, Item, Label, Picker, Icon } from 'native-base'
import StateRates from '../stateRates'
import { connect } from 'react-redux'
import { listRates, setStateIndex, setCurrency } from '../reducer'


class SettingsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedState: props.selectedStateIndex,
            selectedCurrency: props.selectedCurrency,
        }
    }

    componentDidMount() {
        this.props.listRates()
    }

    static navigationOptions () {
        return {
            title: 'Settings'
        }
    }

    handleStateSelect = (selectedState) => {
        this.setState({ selectedState })
        this.props.setStateIndex(selectedState)
    }

    handleCurrencySelect = (selectedCurrency) => {
        this.setState({ selectedCurrency })
        this.props.setCurrency(selectedCurrency)
    }

    render() {
        const countryRates = this.props.rates.rates
        return (
            <Container>
                <Content padder>
                    <Item picker>
                        <Label>Home Currency</Label>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            // style={{ height: 50, width: 100 }}
                            placeholder="State"
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selectedCurrency}
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
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            // style={{ height: 50, width: 100 }}
                            placeholder="State"
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selectedState}
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
    }
}

const mapDispatchToProps = {
    listRates,
    setStateIndex,
    setCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
