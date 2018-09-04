import React from 'React'
import PropTypes from 'prop-types'
import { Badge, Text } from 'native-base'
import { StyleSheet } from 'react-native'

export default class PriceBadge extends React.Component {
    render() {
        return (
            <Badge
                style={[styles.badge, this.props.right && styles.right, this.props.disabled && styles.disabledBtn]}
                info={!this.props.disabled}>
                <Text style={styles.text}>
                    {this.props.label}
                </Text>
            </Badge>
        )
    }
}

PriceBadge.propTypes = {
    label: PropTypes.string,
    right: PropTypes.bool,
    disabled: PropTypes.bool,
}

const styles = StyleSheet.create({
    badge: {
        alignSelf: 'flex-start',
    },
    right: {
        alignSelf: 'flex-end',
    },
    text: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    disabledBtn: {
        backgroundColor: '#b5b5b5',
    },
})