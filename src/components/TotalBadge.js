import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Text } from 'native-base'
import { StyleSheet } from 'react-native'

export default class TotalBadge extends React.Component {
    render() {
        return (
            <Badge style={[styles.badge, this.props.right && styles.right]} success>
                <Text style={styles.text}>
                    {`\u202D ${this.props.label}`}
                </Text>
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
        fontSize: 18,
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 0,
        paddingRight: 5,
    },
})