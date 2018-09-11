import React from 'react'
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native'

const DismissKeyboardHOC = () => {
    return ({ children, ...props }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View {...props}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    )
}
const DismissKeyboardView = DismissKeyboardHOC()

export default DismissKeyboardView