import React from 'react'// eslint-disable-line
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from './components/HomeScreen'
import CurrencyScreen from './components/CurrencyScreen'
import TaxScreen from './components/TaxScreen'
import SettingsScreen from './components/SettingsScreen'

import DetailsScreen from './components/DetailsScreen'

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
})

const CurrencyStack = createStackNavigator({
    Currency: CurrencyScreen,
    Details: DetailsScreen,
})

const TaxStack = createStackNavigator({
    Tax: TaxScreen,
    Details: DetailsScreen,
})
  
const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
    Details: DetailsScreen,
})
  
  
export default createBottomTabNavigator(
    {
        Home: HomeStack,
        Currency: CurrencyStack,
        Tax: TaxStack,
        Settings: SettingsStack,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state
                let iconName
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`
                } else if (routeName === 'Currency') {
                    iconName = 'ios-stats'
                } else if (routeName === 'Tax') {
                    iconName = 'ios-filing'
                } else if (routeName === 'Settings') {
                    iconName = 'ios-options'
                }
      
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />
            }
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    }
)