import {createActions} from 'redux-actions';

export const {
    donationRequest,
    donationSuccess,
    donationFailure
} = createActions(
    "DONATION_REQUEST",
    "DONATION_SUCCESS",
    "DONATION_FAILURE"
);