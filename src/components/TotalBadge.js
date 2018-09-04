import React from 'React'
import PropTypes from 'prop-types'
import { Badge, Text } from 'native-base'
import { StyleSheet } from 'react-native'

export default class TotalBadge extends React.Component {
    render() {
        return (
            <Badge style={[styles.badge, this.props.right && styles.right]} success>
                <Text style={styles.text}>{this.props.label}</Text>
            </Badge>
        )
    }
}

TotalBadge.propTypes = {
    label: PropTypes.string,
    right: PropTypes.bool,
}

const styles = StyleSheet.create({
    badge: {
        height: 40,
        alignSelf: 'flex-start',
    },
    right: {
        alignSelf: 'flex-end',
    },
    text: {
        fontSize: 20,
        padding: 10,
        paddingLeft: 10,
        paddingRight: 10,
    }
})