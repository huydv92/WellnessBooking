
import { all } from 'redux-saga/effects';
import { loginFlow } from './authSaga';
// import  authSaga from './authSaga';

export default function* rootSaga() {
    yield all([
        loginFlow()
    ])
}