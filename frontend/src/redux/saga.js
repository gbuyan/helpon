import {fork} from "redux-saga/effects";
import {clientFlow} from './sagas/client';
import {donationFlow} from './sagas/donation';
import {getterFlow} from './sagas/getter';

export default function* () {
    yield fork(clientFlow);
    yield fork(donationFlow);
    yield fork(getterFlow);
};