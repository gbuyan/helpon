import {takeEvery, call, put} from "redux-saga/effects";
import {registrationRequest, registrationSuccess, registrationFailure, logout} from '../actions/client';
import {clientRegistration} from '../../api';
import {push} from "react-router-redux";

function* registrationFlow({payload}) {
    try {
        const data = yield call(clientRegistration, payload);

        yield put(registrationSuccess(data));
        yield put(push('/account'));
    } catch (e) {
        console.log(e.message);
        yield put(registrationFailure(e));
    }
}

function* logoutFlow(action) {
    try {
        yield put(push('/auth'));
    } catch (e) {
        console.log(e.message);
    }
}

export function* clientFlow() {
    yield takeEvery(registrationRequest, registrationFlow);
    yield takeEvery(logout, logoutFlow);
}