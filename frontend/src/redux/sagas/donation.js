import {takeEvery, call, put} from "redux-saga/effects";
import {donationRequest, donationSuccess, donationFailure} from '../actions/donation';
import {requestsRequest, requestsSuccess, requestsFailure} from '../actions/getter'
import {getDonation, getRequests} from '../../api';

function* donation() {
    try {
        const {data} = yield call(getDonation);

        yield put(donationSuccess(data));
    } catch (e) {
        console.log(e.message);
        yield put(donationFailure(e.message));
    }
}

function* requests() {
    try {
        const {data} = yield call(getRequests);

        yield put(requestsSuccess(data));
    } catch (e) {
        console.log(e.message);
        yield put(requestsFailure(e.message));
    }
}

export function* donationFlow() {
    yield takeEvery(donationRequest, donation);
    yield takeEvery(requestsRequest, requests);
}