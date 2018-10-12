import React from 'react'
import { Image, View } from 'react-native'

const LoadingScreen = () => (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
            style={{width: 125, height: 125}}
            source={require('../../assets/images/loading-screen.png')} />
    </View>
)

export default LoadingScreen