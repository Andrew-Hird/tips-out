
import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { COLOR, ThemeProvider } from 'react-native-material-ui'

import { Font } from 'expo'

import store from './src/store'
import AppNavigator from './src/Routes'

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fontLoaded: false,
        }
    }
      
    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
        })
    
        this.setState({ fontLoaded: true })
    }

    render() {
        return (
            this.state.fontLoaded ? (
                <Provider store={store}>
                    <ThemeProvider uiTheme={uiTheme}>
                        <View style={styles.container}>
                            <AppNavigator 
                                persistenceKey={'NavigationState4'}
                                renderLoadingExperimental={() => <ActivityIndicator />}
                            />
                        </View>
                    </ThemeProvider>
                </Provider>
            ) : null
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