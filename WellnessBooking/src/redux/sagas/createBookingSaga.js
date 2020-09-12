import { put , call, takeLatest, delay} from 'redux-saga/effects';
import * as Actions from '../actions';
import { postAPI } from './api/api'
import API from '../../configs/API';

export function* createBookingFlow() {
    yield takeLatest(Actions.CREATE_BOOKING, createBooking);
}

function* createBooking(params) {
    console.log(params);
    const obj = params.params;
    yield put(Actions.showLoading(true));
    const res = yield call(postAPI, API.CREATE.BOOKING, obj);
    const user = { ['user']: obj.created_by };
    if (res && res.data) {
        yield put(Actions.createBookingSuccess(res.data));
        yield delay(1000)
        yield put(Actions.getBookings(user));
        yield put(Actions.showLoading(false));
    } else {
        yield put(Actions.createBookingError(res))
        yield put(Actions.showLoading(false));
    }
}

