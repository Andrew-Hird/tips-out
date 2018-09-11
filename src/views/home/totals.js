import React from 'react'// eslint-disable-line
import { Col, Row } from 'native-base'

import homeBase, { styles } from '../../components/HomeBase'
import TotalBadge from '../../components/TotalBadge'

const Base = props => (
    <Row style={styles.row}>
        <Col>
            <Row>
                <Col style={styles.col}>
                    <TotalBadge label={props.formatPrice(props.getCalculatedPrice())} />
                </Col>
                <Col style={styles.col}>
                    <TotalBadge label={props.convertAndFormatPrice(props.getCalculatedPricePlusMargin())} right />
                </Col>
            </Row>
        </Col>
    </Row>
)

const WrappedComponent = homeBase(Base)

export default WrappedComponent
