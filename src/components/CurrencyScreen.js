import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import RatesList from './RatesList'

export default class CurrencyScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static navigationOptions() {
        return {
            title: 'Currency Conversion'
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <RatesList />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
})
