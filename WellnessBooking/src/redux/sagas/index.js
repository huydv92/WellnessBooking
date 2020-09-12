
import { all } from 'redux-saga/effects';
import { loginFlow } from './authSaga';
import  { getBookingsFlow } from './bookingsSaga';
import  { createBookingFlow } from './createBookingSaga';

export default function* rootSaga() {
    yield all([
        loginFlow(),
        getBookingsFlow(),
        createBookingFlow()
    ])
}