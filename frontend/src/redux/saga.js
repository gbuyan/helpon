import {fork} from "redux-saga/effects";
import {clientFlow} from './sagas/client';

export default function* () {
    yield fork(clientFlow)
};