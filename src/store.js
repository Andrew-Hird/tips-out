import { createStore, applyMiddleware } from 'redux'
import { multiClientMiddleware } from 'redux-axios-middleware'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { API_BASE_URL, API_KEY } from 'react-native-dotenv'
import axios from 'axios'
import reducer from './reducer'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['showInputModal']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const clients = {
    api: {
        client: axios.create({
            baseURL: API_BASE_URL,
            headers: { 'x-api-key': API_KEY },
        })
    }
}

const store = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(multiClientMiddleware(clients)))) :
    createStore(persistedReducer, applyMiddleware(multiClientMiddleware(clients)))

export default store
