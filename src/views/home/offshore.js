import React from 'react'// eslint-disable-line
import { Text, Col, Row, CheckBox } from 'native-base'

import homeBase, { styles } from '../../components/HomeBase'
import PriceBadge from '../../components/PriceBadge'

const Base = props => (
    <Row style={styles.row}>
        <Row>
            <Col size={15} style={styles.col} onPress={props.handleOffshoreSelectSelect}>
                <CheckBox checked={props.options.margin} onPress={props.handleOffshoreSelectSelect} color="#007aff" />
            </Col>
            <Col size={35} style={styles.col}>
                <Text style={[!props.options.margin && styles.textDisabled]}>
                    Offshore Service Margin ({props.offshoreMargin}%)
                </Text>
            </Col>
            <Col size={50} style={styles.col}>
                <PriceBadge
                    right
                    disabled={!props.options.margin}
                    label={props.convertAndFormatPrice(props.getOffshoreMarginAmount())}
                />
            </Col>
        </Row>
    </Row>
)

const WrappedComponent = homeBase(Base)

export default WrappedComponent
