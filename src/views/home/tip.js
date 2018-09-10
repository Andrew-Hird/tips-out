import React from 'react'// eslint-disable-line
import { Text, Col, Row, CheckBox, Button } from 'native-base'

import homeBase, { styles } from './base'
import PriceBadge from '../../components/PriceBadge'

const Base = props => (
    <Row style={{ height: 150 }}>
        <Col>
            <Row>
                <Col size={15} style={styles.col} onPress={props.handleTipSelect}>
                    <CheckBox checked={props.options.tip} onPress={props.handleTipSelect} color="#007aff" />
                </Col>
                <Col size={75} style={styles.col}>
                    <Text style={[!props.options.tip && styles.textDisabled]}>
                        Tip ({props.tipPercent}%)
                    </Text>
                </Col>
            </Row>
            <Row>
                {props.defaultPercents.map((percent, i) => {
                    return (
                        <Col key={i} style={styles.col}>
                            <Button
                                primary
                                disabled={!props.options.tip}
                                bordered={props.tipPercent !== percent}
                                onPress={() => {
                                    props.handleTipInput(percent)
                                    props.hideKeyboard()
                                }}
                                style={{ width: 75 }}
                            >
                                <Text>{percent}%</Text>
                            </Button>
                        </Col>
                    )
                })}
                <Col style={styles.col}>
                    <Button
                        primary
                        disabled={!props.options.tip}
                        bordered={props.tipPercent === props.defaultPercents.find(percent => percent === props.tipPercent)}
                        onPress={() => {
                            props.setShowInputModal(true)
                            props.hideKeyboard()
                        }}
                        style={{ width: 75 }}
                    >
                        <Text>Other</Text>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col style={styles.col}>
                    <PriceBadge
                        disabled={!props.options.tip}
                        label={props.formatPrice(props.getTipAmount())}
                    />
                </Col>
                <Col style={styles.col}>
                    <PriceBadge
                        right
                        disabled={!props.options.tip}
                        label={props.convertAndFormatPrice(props.getTipAmount())}
                    />
                </Col>
            </Row>
        </Col>
    </Row>
)

const WrappedComponent = homeBase(Base)

export default WrappedComponent
