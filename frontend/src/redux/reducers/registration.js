import {handleActions} from 'redux-actions';
import {registrationRequest, registrationSuccess, registrationFailure, logout} from '../actions/client';

const initialState = {
    isLoading: false,
    data: [],
    error: ''
};

export default handleActions(
    {
        [registrationRequest]: state => ({...state, isLoading: true, data: [], error: ''}),
        [registrationSuccess]: (state, action) => ({...state, isLoading: false, data: action.payload}),
        [registrationFailure]: (state, action) => ({...state, isLoading: false, error: action.payload}),
        [logout]: state => ({...state, isLoading: false, data: [], error: ''})
    },
    initialState
);

export const getIsLoading = state => state.registration.isLoading;
export const getClientData = state => state.registration.data;