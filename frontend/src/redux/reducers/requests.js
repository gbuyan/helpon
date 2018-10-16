import {handleActions} from 'redux-actions';
import {requestsRequest, requestsSuccess, requestsFailure, getterSuccess} from '../actions/getter';

const initialState = {
    isLoading: false,
    data: [],
    error: ''
};

export default handleActions(
    {
        [requestsRequest]: state => ({...state, isLoading: true, data: {}, error: ''}),
        [requestsSuccess]: (state, action) => ({...state, isLoading: false, data: action.payload.reverse()}),
        [requestsFailure]: (state, action) => ({...state, isLoading: false, error: action.payload}),
        [getterSuccess]: (state, action) => ({...state, data: [action.payload, ...state.data]})
    },
    initialState
);

export const getRequestLoading = state => state.requests.isLoading;
export const getRequestData = state => state.requests.data;