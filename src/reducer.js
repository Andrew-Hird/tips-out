
export const GET_RATES = 'tips-out/rates/LOAD'
export const GET_RATES_SUCCESS = 'tips-out/rates/LOAD_SUCCESS'
export const GET_RATES_FAIL = 'tips-out/rates/LOAD_FAIL'

const initialState = {
    rates: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case GET_RATES:
        return { ...state, loading: true }
    case GET_RATES_SUCCESS:
        return { 
            ...state, 
            loading: false, 
            rates: {
                timestamp: action.payload.data.timestamp,
                base: action.payload.data.base,
                rates: action.payload.data.rates
            }
        }
    case GET_RATES_FAIL:
        return {
            ...state,
            loading: false,
            error: 'Error while fetching rates'
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