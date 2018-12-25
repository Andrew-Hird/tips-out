import { Toast } from 'native-base'


export const GET_RATES = 'tips-out/rates/LOAD'
export const GET_RATES_SUCCESS = 'tips-out/rates/LOAD_SUCCESS'
export const GET_RATES_FAIL = 'tips-out/rates/LOAD_FAIL'

export const SET_PRICE = 'tips-out/price/SET'
export const SET_TIP_PERCENT = 'tips-out/tip-percent/SET'
export const SET_OPTIONS = 'tips-out/options/SET'
export const SET_SETTINGS = 'tips-out/settings/SET'
export const SHOW_INPUT_MODAL = 'tips-out/input-modal/show'

const initialState = {
    price: '0',
    tipPercent: '17.5',
    rates: {
        timestamp: '',
        base: '',
        rates: {},
    },
    options: {
        tip: true,
        state: true,
        margin: true,
    },
    settings: {
        selectedStateIndex: 0,
        selectedCurrency: 'NZD',
        offshoreMargin: '2.10',
    },
    showInputModal: false,
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
    case SET_TIP_PERCENT:
        return {
            ...state,
            tipPercent: action.payload
        }
    case SET_PRICE:
        return {
            ...state,
            price: action.payload
        }
    case SET_OPTIONS:
        return {
            ...state,
            options: action.payload
        }
    case SET_SETTINGS:
        return {
            ...state,
            settings: action.payload
        }
    case SHOW_INPUT_MODAL:
        return {
            ...state,
            showInputModal: action.payload
        }
    default:
        return state
    }
}

export function listRates() {
    return {
        type: GET_RATES,
        payload: {
            client: 'api',
            request: {
                url: '/GetRates'
            }
        }
    }
}

export function setPrice(price) {
    return {
        type: SET_PRICE,
        payload: price
    }
}

export function setTipPercent(tipPercent) {
    return {
        type: SET_TIP_PERCENT,
        payload: tipPercent
    }
}

export function setOptions(options) {
    return {
        type: SET_OPTIONS,
        payload: options
    }
}

export function setSettings(settings) {
    return {
        type: SET_SETTINGS,
        payload: settings
    }
}

export function setShowInputModal(show) {
    return {
        type: SHOW_INPUT_MODAL,
        payload: show
    }
}