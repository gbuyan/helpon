import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';
import registration from './reducers/registration';

export default combineReducers({
    router,
    registration
});