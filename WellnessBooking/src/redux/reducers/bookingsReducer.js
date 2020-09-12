import {
    GET_BOOKINGS,
    GET_BOOKINGS_ERROR,
    GET_BOOKINGS_SUCCESS
} from '../actions';

const initialState = {
    errorMsg: '',
    listBookings: [],
    isFetching: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKINGS:
            return {
                ...state,
                isFetching: false
            };

        case GET_BOOKINGS_ERROR:
            return {
                ...state,
                errorMsg: action && action.error && action.error.message,
                isFetching: true
            };

        case GET_BOOKINGS_SUCCESS:
            const newList = action && action.items && action.items.reverse();
            return {
                ...state,
                listBookings: newList || [],
                isFetching: true
            };
        default:
                return state;
    };
}