import { createStore, applyMiddleware } from 'redux'
import { multiClientMiddleware } from 'redux-axios-middleware'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import axios from 'axios'

import Config from '../config.json'
import reducer from './reducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['rates', 'selectedStateIndex', 'selectedCurrency', 'offshoreMargin', 'options']
}

const persistedReducer = persistReducer(persistConfig, reducer)

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
    createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(multiClientMiddleware(clients)))) :
    createStore(persistedReducer, applyMiddleware(multiClientMiddleware(clients)))

export default store