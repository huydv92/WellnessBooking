
import { all } from 'redux-saga/effects';
import { loginFlow } from './authSaga';
import  { getBookingsFlow } from './bookingsSaga';

export default function* rootSaga() {
    yield all([
        loginFlow(),
        getBookingsFlow()
    ])
}