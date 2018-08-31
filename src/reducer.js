import { Toast } from 'native-base'


export const GET_RATES = 'tips-out/rates/LOAD'
export const GET_RATES_SUCCESS = 'tips-out/rates/LOAD_SUCCESS'
export const GET_RATES_FAIL = 'tips-out/rates/LOAD_FAIL'

export const SET_STATE_INDEX = 'tips-out/state/SET'
export const SET_CURRENCY = 'tips-out/currency/SET'
export const SET_OPTIONS = 'tips-out/options/SET'

const initialState = {
    rates: {
        timestamp: '',
        base: '',
        rates: {},
    },
    selectedStateIndex: 0,
    selectedCurrency: 'NZD',
    offshoreMargin: '2.10',
    options: {
        tip: true,
        state: true,
        margin: true,
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case GET_RATES:
        return { ...state, loading: true }
    case GET_RATES_SUCCESS:
        Toast.show({ text: 'Rates Updated' })
        const data = action.payload.data
        return { 
            ...state, 
            loading: false, 
            rates: {
                timestamp: data.timestamp,
                base: data.base,
                rates: data.rates
            }
        }
    case GET_RATES_FAIL:
        Toast.show({ text: 'Could not update rates at this time', type: 'danger' })
        return {
            ...state,
            loading: false,
            error: 'Error while fetching rates'
        }
    case SET_STATE_INDEX:
        return {
            ...state,
            selectedStateIndex: action.payload.stateIndex
        }
    case SET_CURRENCY:
        return {
            ...state,
            selectedCurrency: action.payload.currency
        }
    case SET_OPTIONS:
        return {
            ...state,
            options: action.payload
        }
    default:
        return state
    }
}

export function listRates() {
    return {
        type: GET_RATES,
        payload: {
            client: 'openExchangeRates',
            request: {
                url: '/latest.json'
            }
        }
    }
}

export function setStateIndex(stateIndex) {
    return {
        type: SET_STATE_INDEX,
        payload: {
            stateIndex
        }
    }
}

export function setCurrency(currency) {
    return {
        type: SET_CURRENCY,
        payload: {
            currency
        }
    }
}

export function setOptions(options) {
    return {
        type: SET_OPTIONS,
        payload: options
    }
}