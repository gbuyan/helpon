import {createActions} from 'redux-actions';

export const {getterRequest, getterSuccess, getterFailure, requestsRequest, requestsSuccess, requestsFailure} = createActions(
    "GETTER_REQUEST",
    "GETTER_SUCCESS",
    "GETTER_FAILURE",
    "REQUESTS_REQUEST",
    "REQUESTS_SUCCESS",
    "REQUESTS_FAILURE"
);