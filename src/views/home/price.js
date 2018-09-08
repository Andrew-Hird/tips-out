import React from 'react'// eslint-disable-line
import { Item, Icon, Input } from 'native-base'

import homeBase from './base'

const Base = props => (
    <Item rounded style={{ height: 80 }}>
        <Icon active type='MaterialIcons' name='attach-money' />
        <Input
            keyboardType='numeric'
            clearButtonMode='always'
            onChangeText={props.handlePriceInput}
            value={props.price}
            style={{ fontSize: 50 }}
        />
    </Item>
)

const WrappedComponent = homeBase(Base)

export default WrappedComponent