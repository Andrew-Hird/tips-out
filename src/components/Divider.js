import React from 'react'
import { View, StyleSheet } from 'react-native'

export default class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={styles.divider} />
        )
    }
}

const styles = StyleSheet.create({
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
})