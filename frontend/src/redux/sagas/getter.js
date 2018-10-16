import {take, call, put} from "redux-saga/effects";
import {getterRequest, getterSuccess, getterFailure} from '../actions/getter';
import {askForDonation} from '../../api';


export function* getterFlow() {
    while (true) {
        const action = yield take(getterRequest);

        try {
            const {data} = yield call(askForDonation, action.payload);

            yield put(getterSuccess(data));
        } catch (e) {
            console.log(e.message);
            yield put(getterFailure());
        }
    }
}