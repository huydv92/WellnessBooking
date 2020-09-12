import { put, takeEvery } from 'redux-saga/effects';
import * as Actions from '../actions';
import { viewBookingsAPI } from './api/api'
import API from '../../configs/API';

export function* getBookingsFlow() {
    yield takeEvery(Actions.GET_BOOKINGS, getBookings);
}

function* getBookings(params) {
    const obj = params.param;
    yield put(Actions.showLoading(true));
    const res = yield viewBookingsAPI(API.GET.BOOKINGS, obj);
    console.log(res)
    if (res && res.data) {
        yield put(Actions.getBookingsSuccess(res.data));
    } else {
        yield put(Actions.getBookingsError(res))
    }
    yield put(Actions.showLoading(false));
}

