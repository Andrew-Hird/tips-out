import React from 'react'
import { ActivityIndicator, StyleSheet, AppState } from 'react-native'
import { Root } from 'native-base'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import moment from 'moment'

import store from './src/store'
import { listRates } from './src/reducer'
import AppNavigator from './src/Routes'

const navigationPersistenceKey = __DEV__ ? 'NavigationStateDEV' : null


export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fontLoaded: false,
            appState: AppState.currentState
        }
    }

    persistor = persistStore(store, null, this.getRates)

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange)
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange)
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
            this.getRates()
        }
        this.setState({appState: nextAppState})
    }

    getRates() {
        const state = store.getState()
        if (state.rates && state.rates.timestamp) {
            const ratesTimestamp = moment.unix(state.rates.timestamp)
            const todaysRates = moment().isSame(ratesTimestamp, 'day')

            if (!todaysRates) {
                console.log('Updating rates')
                store.dispatch(listRates())
            } else {
                console.log('Rates current')
            }
        } else {
            store.dispatch(listRates())
        }
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={this.persistor}>
                    <Root style={styles.container}>
                        <AppNavigator
                            persistenceKey={navigationPersistenceKey}
                        />
                    </Root>
                </PersistGate>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    }
})
