import React from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { Container, Item, Input, Label, Grid, Col, Row } from 'native-base'
import { setShowInputModal, setTipPercent } from '../../reducer'

import Price from './price'
import Tip from './tip'
import Tax from './tax'
import Offshore from './offshore'
import Totals from './totals'
import Divider from '../../components/Divider'

import { styles } from './base'

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static navigationOptions = {
        header: null
    }

    handleTipInput = (tipPercent) => {
        this.props.setTipPercent(tipPercent)
    }

    render() {
        return (
            <Container>
                <View style={styles.contentStyle}>
                    <Grid style={{ marginTop: 15 }}>
                        <Row>
                            <Col style={styles.col}>
                                <Price />
                            </Col>
                        </Row>
                        <Tip />
                        <Divider />
                        <Tax />
                        <Divider />
                        <Offshore />
                        <Divider />
                        <Totals />
                    </Grid>
                </View>
                <Modal
                    isVisible={this.props.showInputModal}
                    onBackdropPress={() => this.props.setShowInputModal(false)}
                >
                    <View style={styles.modalContent}>
                        <Item floatingLabel>
                            <Label>Tip %</Label>
                            <Input
                                keyboardType='numeric'
                                clearButtonMode='always'
                                onChangeText={this.handleTipInput}
                                value={this.props.tipPercent}
                                autoFocus={true}
                                selectTextOnFocus={true}
                            />
                        </Item>
                    </View>
                </Modal>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        tipPercent: state.tipPercent,
        showInputModal: state.showInputModal,
    }
}

const mapDispatchToProps = {
    setShowInputModal,
    setTipPercent
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

