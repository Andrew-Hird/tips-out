
import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'

import store from './src/store'
import AppNavigator from './src/Routes'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fontLoaded: false,
        }
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <AppNavigator
                        persistenceKey={'NavigationState5'}
                        renderLoadingExperimental={() => <ActivityIndicator />}
                    />
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        justifyContent: 'space-between'
    }
})
