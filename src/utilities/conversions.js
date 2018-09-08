
const getTipAmount = (props) => {
    const price = parseFloat(props.price) || 0
    const tipPercent = parseFloat(props.tipPercent)

    return price * (tipPercent / 100)
}

const getTaxAmount = (props) => {
    const price = parseFloat(props.price) || 0
    const taxRate = parseFloat(props.selectedStateRate)

    return price * (taxRate / 100)
}

const getOffshoreMarginAmount = (props) => {
    const price = parseFloat(props.price) || 0
    const offshoreMargin = parseFloat(props.offshoreMargin)
    const tip = props.options.tip? getTipAmount(props) : 0
    const tax = props.options.state? getTaxAmount(props) : 0

    return (price + tip + tax) * (offshoreMargin / 100)
}

const getCalculatedPrice = (props) => {
    const price = parseFloat(props.price) || 0
    const tip = props.options.tip? getTipAmount(props) : 0
    const tax = props.options.state? getTaxAmount(props) : 0

    return price + tip + tax
}

const getCalculatedPricePlusMargin = (props) => {
    const calculatedPrice = getCalculatedPrice(props)
    const margin = props.options.margin ? getOffshoreMarginAmount(props) : 0

    return calculatedPrice + margin
}

export default {
    getTipAmount,
    getTaxAmount,
    getOffshoreMarginAmount,
    getCalculatedPrice,
    getCalculatedPricePlusMargin,
}
