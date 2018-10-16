import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';
import registration from './reducers/registration';
import donation from './reducers/donation';
import requests from './reducers/requests';

export default combineReducers({
    router,
    registration,
    donation,
    requests
});