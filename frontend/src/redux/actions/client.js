import {createActions} from 'redux-actions';

export const {registrationRequest, registrationSuccess, registrationFailure, logout} = createActions(
    "REGISTRATION_REQUEST",
    "REGISTRATION_SUCCESS",
    "REGISTRATION_FAILURE",
    "LOGOUT"
);