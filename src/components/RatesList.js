import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { listRepos, listRates } from '../reducer'

class RatesList extends React.Component {
    componentDidMount() {
        this.props.listRates()
    }
  renderItem = ({ item }) => (
      <View style={styles.item}>
          <Text>{item.currency} - {item.rate}</Text>
      </View>
  );
  render() {
      const { rates } = this.props
      return (
          <FlatList 
              styles={styles.container}
              data={rates.rates}
              renderItem={this.renderItem}
          />
      )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
})

const sortRates = ratesObj => {
    if (ratesObj) {
        const ratesKeys = Object.keys(ratesObj)
        const ratesArr = ratesKeys.map(key =>({ key: key, currency: key, rate: ratesObj[key] }))
        return ratesArr
    }
    return []
}

const mapStateToProps = state => {
    let rates = {
        ...state.rates,
        rates: sortRates(state.rates.rates)
    }
    return {
        rates: rates
    }
}

const mapDispatchToProps = {
    listRepos,
    listRates
}

export default connect(mapStateToProps, mapDispatchToProps)(RatesList)