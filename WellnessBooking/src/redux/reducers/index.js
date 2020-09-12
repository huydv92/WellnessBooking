import { combineReducers } from 'redux';
import auth from './authReducer';
import loadingReducer from './loadingReducer';
import bookingsReducer from './bookingsReducer';
import createBookingReducer from './createBookingReducer';

export default combineReducers({
    auth,
    loadingReducer,
    bookingsReducer,
    createBookingReducer
});