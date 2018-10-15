import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import history from '../history';
import reducer from './reducer';
import rootSaga from "./saga";


const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), logger);
const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;