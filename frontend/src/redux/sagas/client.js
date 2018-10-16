import {takeEvery, call, put, all} from "redux-saga/effects";
import {
    registrationRequest,
    registrationSuccess,
    registrationFailure,
    logout
} from '../actions/client';
import {clientRegistration} from '../../api';
import {push} from "react-router-redux";
import {setToLocalStorage, removeFromLocalStorage} from "../../helpers";

function* registrationFlow({payload}) {
    try {
        const {data} = yield call(clientRegistration, payload);

        yield all([
            call(setToLocalStorage, 'fullName', data.fullName),
            call(setToLocalStorage, 'address', data.address),
            call(setToLocalStorage, 'clientRole', data.role)
        ]);

        yield put(registrationSuccess(data));
        yield put(push('/account'));
    } catch (e) {
        console.log(e.message);
        yield put(registrationFailure(e));
    }
}

function* logoutFlow() {
    try {
        yield put(push('/auth'));
        yield all([
            call(removeFromLocalStorage, 'fullName'),
            call(removeFromLocalStorage, 'address'),
            call(removeFromLocalStorage, 'clientRole')
        ]);
    } catch (e) {
        console.log(e.message);
    }
}

export function* clientFlow() {
    yield takeEvery(registrationRequest, registrationFlow);
    yield takeEvery(logout, logoutFlow);
}