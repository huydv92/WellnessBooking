export const CREATE_BOOKING = 'CREATE_BOOKING';
export const CREATE_BOOKING_SUCCESS = 'CREATE_BOOKING_SUCCESS';
export const CREATE_BOOKING_ERROR = 'CREATE_BOOKING_ERROR';

export function createBooking(params) {
    return {
        type: CREATE_BOOKING,
        params
    }
}

export function createBookingSuccess(items) {
    return {
        type: CREATE_BOOKING_SUCCESS,
        items
    }
}
export function createBookingError(error) {
    return {
        type: CREATE_BOOKING_ERROR,
        error
    }
}
