import { applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, legacy_createStore } from '@reduxjs/toolkit';

let middleware = [ReduxThunk];

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const composeEnhancers = compose;

const store = legacy_createStore(
    persistedReducer,
    {},
    composeEnhancers(applyMiddleware(...middleware))
);

export default () => {
    let persistor = persistStore(store)
    return { store, persistor }
}  