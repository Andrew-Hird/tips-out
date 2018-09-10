import React from 'react'
import { connect } from 'react-redux'
import { Keyboard, StyleSheet } from 'react-native'
import numeral from 'numeral'
import getSymbolFromCurrency from 'currency-symbol-map'
import { listRates, setOptions, setPrice, setShowInputModal, setTipPercent } from '../../reducer'
import StateRates from '../../stateRates'

const homeBase = (WrappedComponent) => {
    class HOC extends React.Component {
        constructor(props) {
            super(props)
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

        setOptions = (key) => {
            const options = {
                ...this.props.options,
                [key]: !this.props.options[key],
            }
            this.props.setOptions(options)
        }

        getTipAmount = () => {
            const price = parseFloat(this.props.price) || 0
            const tipPercent = parseFloat(this.props.tipPercent)

            return price * (tipPercent / 100)

        }

        getTaxAmount = () => {
            const price = parseFloat(this.props.price) || 0
            const taxRate = parseFloat(this.props.selectedStateRate)

            return price * (taxRate / 100)
        }

        getOffshoreMarginAmount = () => {
            const price = parseFloat(this.props.price) || 0
            const offshoreMargin = parseFloat(this.props.offshoreMargin)

            const tip = this.props.options.tip? this.getTipAmount() : 0
            const tax = this.props.options.state? this.getTaxAmount() : 0

            return (price + tip + tax) * (offshoreMargin / 100)
        }

        getCalculatedPrice = () => {
            const price = parseFloat(this.props.price) || 0
            const tip = this.props.options.tip? this.getTipAmount() : 0
            const tax = this.props.options.state? this.getTaxAmount() : 0

            return price + tip + tax
        }

        getCalculatedPricePlusMargin = () => {
            const calculatedPrice = this.getCalculatedPrice()
            const margin = this.props.options.margin ? this.getOffshoreMarginAmount() : 0

            return calculatedPrice + margin
        }

        formatPrice = (price) => {
            const { baseCurrency } = this.props
            const formattedPrice = this.format(price, baseCurrency)

            return `${formattedPrice} ${baseCurrency}`
        }

        convertAndFormatPrice = (price) => {
            const { selectedCurrencyRate, selectedCurrency } = this.props
            const conversionRate = parseFloat(selectedCurrencyRate)
            const convertedPrice  = price * conversionRate
            const formattedPrice = this.format(convertedPrice, selectedCurrency)

            return `${formattedPrice} ${selectedCurrency}`
        }

        format = (price, currency) => {
            const currencySymbol = getSymbolFromCurrency(currency)
            const priceFormat = price >= 10000 ? '(0.00a)' : '0,0.00'
            const formattedPrice = numeral(price).format(priceFormat)

            return `${currencySymbol}${formattedPrice}`
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    hideKeyboard={this.hideKeyboard}
                    handlePriceInput={this.handlePriceInput}
                    handleTipInput={this.handleTipInput}
                    handleTipSelect={this.handleTipSelect}
                    handleStateSelect={this.handleStateSelect}
                    handleOffshoreSelectSelect={this.handleOffshoreSelectSelect}
                    setOptions={this.setOptions}
                    getTipAmount={this.getTipAmount}
                    getTaxAmount={this.getTaxAmount}
                    getOffshoreMarginAmount={this.getOffshoreMarginAmount}
                    getCalculatedPrice={this.getCalculatedPrice}
                    getCalculatedPricePlusMargin={this.getCalculatedPricePlusMargin}
                    formatPrice={this.formatPrice}
                    convertAndFormatPrice={this.convertAndFormatPrice}
                />
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
            showInputModal: state.showInputModal,
            defaultPercents: [ '15', '17.5', '20' ],
        }
    }

    const mapDispatchToProps = {
        listRates,
        setPrice,
        setTipPercent,
        setOptions,
        setShowInputModal
    }

    return connect(mapStateToProps, mapDispatchToProps)(HOC)
}

export const styles = StyleSheet.create({
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
    textDisabled: {
        color: '#9b9b9b'
    },
})

export default homeBase