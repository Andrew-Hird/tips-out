import React from 'react'// eslint-disable-line
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from './views/home/HomeScreen'
import SettingsScreen from './views/SettingsScreen'
import DetailsScreen from './views/DetailsScreen'

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
})
  
const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
    Details: DetailsScreen,
})
  
export default createBottomTabNavigator(
    {
        Home: HomeStack,
        Settings: SettingsStack,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state
                let iconName
                if (routeName === 'Home') {
                    iconName = 'ios-bulb'
                } else if (routeName === 'Settings') {
                    iconName = 'ios-options'
                }
      
                return <Ionicons name={iconName} size={25} color={tintColor} />
            }
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            showLabel: false,
            style: {height: 40}
        }
    }
)