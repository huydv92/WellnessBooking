export const GET_BOOKINGS = 'GET_BOOKINGS';
export const GET_BOOKINGS_SUCCESS = 'GET_BOOKINGS_SUCCESS';
export const GET_BOOKINGS_ERROR = 'GET_BOOKINGS_ERROR';

export function getBookings(param) {
    return {
        type: GET_BOOKINGS,
        param
    }
}

export function getBookingsSuccess(items) {
    return {
        type: GET_BOOKINGS_SUCCESS,
        items
    }
}
export function getBookingsError(error) {
    return {
        type: GET_BOOKINGS_ERROR,
        error
    }
}
