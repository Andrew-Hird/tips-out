import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.content}>
                <Text>Tipping app!</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
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
