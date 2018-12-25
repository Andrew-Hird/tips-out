// script to sanitise raw tax info
// pulled from - https://taxfoundation.org/state-and-local-sales-tax-rates-2018/

const fs = require('fs');
const states = require('./src/taxes.json')

const keyMap = {
    name: 'State',
    state: 'State Tax Rate',
    localAvg: 'Avg. Local Tax Rate (a)',
    combined: 'Combined Rate',
}

const stripBrackets = name => {
    return name
        .replace(' (a)', '')
        .replace(' (b)', '')
        .replace(' (c)', '')
        .replace(' (d)', '')
        .replace(' (e)', '')
}

const convertPercentToNum = percent => {
    return parseFloat(percent.replace('%', ''))
}

const mapped = states.map(state => {
    return {
        name: stripBrackets(state[keyMap.name]),
        state: convertPercentToNum(state[keyMap.state]),
        localAvg: convertPercentToNum(state[keyMap.localAvg]),
        combined: convertPercentToNum(state[keyMap.combined])
    }
})

const mappedStringified = JSON.stringify(mapped, null, 4)

console.log(mappedStringified)

fs.writeFile('stateRates.json', mappedStringified, (err) => {
    if (err) throw err
})