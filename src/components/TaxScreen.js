import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import StateRates from '../stateRates'

export default class TaxScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static navigationOptions () {
        return {
            title: 'Tax Rates'
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                {StateRates.map((state, i) => {
                    return (
                        <View key={i}>
                            <Text>{state.name} - {state.combined}%</Text>
                        </View>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
