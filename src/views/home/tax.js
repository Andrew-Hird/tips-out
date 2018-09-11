import React from 'react'// eslint-disable-line
import { Text, Col, Row, CheckBox } from 'native-base'

import homeBase, { styles } from '../../components/HomeBase'
import PriceBadge from '../../components/PriceBadge'

const Base = props => (
    <Row style={styles.row}>
        <Col>
            <Row>
                <Col size={15} style={styles.col} onPress={props.handleStateSelect}>
                    <CheckBox checked={props.options.state} onPress={props.handleStateSelect} color="#007aff" />
                </Col>
                <Col size={75} style={styles.col}>
                    <Text style={[!props.options.state && styles.textDisabled]}>
                        State Tax ({props.selectedStateName} - {props.selectedStateRate}%)
                    </Text>
                </Col>
            </Row>
            <Row>
                <Col style={styles.col}>
                    <PriceBadge
                        disabled={!props.options.state}
                        label={props.formatPrice(props.getTaxAmount())}
                    />
                </Col>
                <Col style={styles.col}>
                    <PriceBadge
                        right
                        disabled={!props.options.state}
                        label={props.convertAndFormatPrice(props.getTaxAmount())}
                    />
                </Col>
            </Row>
        </Col>
    </Row>
)

const WrappedComponent = homeBase(Base)

export default WrappedComponent