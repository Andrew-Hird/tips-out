import numeral from 'numeral'

const formatPrice = (price, baseCurrency) => {
    return `${format(price)} ${baseCurrency}`
}

const convertAndFormatPrice = (price, selectedCurrencyRate, selectedCurrency) => {
    const conversionRate = parseFloat(selectedCurrencyRate)
    const convertedPrice  = price * conversionRate

    return `${format(convertedPrice)} ${selectedCurrency}`
}

const format = (price) =>  {
    return numeral(price).format('$0,0.00')
}

export default {
    formatPrice,
    convertAndFormatPrice,
}
