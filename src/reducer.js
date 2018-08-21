
export const GET_RATES = 'tips-out/rates/LOAD'
export const GET_RATES_SUCCESS = 'tips-out/rates/LOAD_SUCCESS'
export const GET_RATES_FAIL = 'tips-out/rates/LOAD_FAIL'

export const SET_STATE_INDEX = 'tips-out/state/SET'
export const SET_CURRENCY = 'tips-out/currency/SET'

const initialState = {
    rates: {},
    selectedStateIndex: 0,
    selectedCurrency: 'NZD',
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case GET_RATES:
        return { ...state, loading: true }
    case GET_RATES_SUCCESS:
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