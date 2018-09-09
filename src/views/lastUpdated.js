import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'native-base'
import { connect } from 'react-redux'
import moment from 'moment'


class LastUpdated extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View>
                <Text style={styles.text}>
                    Rates published: {moment.unix(this.props.timestamp).format('HH:mm - DD/MM/YY')}
                </Text>
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        timestamp: state.rates.timestamp,
        baseCurrency: state.rates.base,
        selectedCurrency: state.settings.selectedCurrency,
        selectedCurrencyRate: state.rates.rates[state.settings.selectedCurrency],
    }
}

const styles = StyleSheet.create({
    text: {
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 14,
        fontStyle: 'italic',
    }
})

export default connect(mapStateToProps)(LastUpdated)
