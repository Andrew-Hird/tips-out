import { createStore, applyMiddleware } from 'redux'
import { multiClientMiddleware } from 'redux-axios-middleware'
import axios from 'axios'

import Config from '../config.json'
import reducer from './reducer'

const clients = {
    openExchangeRates: {
        client: axios.create({
            baseURL: Config.RATES.BASE_URL,
            headers: { Authorization: `Token ${Config.RATES.TOKEN}` },
            responseType: 'json'
        })
    }
}

const store = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(multiClientMiddleware(clients)))) :
    createStore(reducer, applyMiddleware(multiClientMiddleware(clients)))

export default store