import { call, put, take, takeLatest, takeEvery, all } from 'redux-saga/effects';
import * as Actions from '../actions';
import { getAPI, postAPI } from './api/api'
import API from '../../configs/API';

export function* loginFlow() {
    yield takeEvery(Actions.LOGIN, login);
}

function* login(params) {
    const obj = params.param;
    console.log(obj)
    yield put(Actions.showLoading(true));
    const res = yield postAPI(API.AUTH.LOGIN, obj);
    yield put(Actions.showLoading(false));
    if (res && res.data) {
        yield put(Actions.loginSuccess(res.data));
    } else {
        yield put(Actions.loginError(res))
    }
}

export function* logoutFlow(username) {
     yield takeLatest(Actions.LOGOUT, logout);

}

function* logout(username) {
    try {
        yield put(Actions.logoutSuccess());
    } catch (error) {

    }
}
