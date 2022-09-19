import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import logger from 'redux-logger'
import rootSaga from './sagas'
import requestsReducers from "./reducers/requests";
import addressesReducer from "./reducers/addresses";

const reducer = {
    requests: requestsReducers.requests,
    currentRequest: requestsReducers.currentRequest,
    addresses: addressesReducer,
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer,
    middleware: [logger, sagaMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export default store;