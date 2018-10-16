import {handleActions} from 'redux-actions';
import {donationRequest, donationSuccess, donationFailure} from '../actions/donation';

const initialState = {
    isLoading: false,
    data: [],
    error: ''
};

export default handleActions(
    {
        [donationRequest]: state => ({...state, isLoading: true, data: {}, error: ''}),
        [donationSuccess]: (state, action) => ({...state, isLoading: false, data: action.payload}),
        [donationFailure]: (state, action) => ({...state, isLoading: false, error: action.payload})
    },
    initialState
);

export const getIsLoading = state => state.donation.isLoading;
export const getDonationData = state => state.donation.data;