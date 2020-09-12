import  {
    CREATE_BOOKING_ERROR,
    CREATE_BOOKING_SUCCESS
} from '../actions';

const initialState = {
    errorMsg: '',
    isSucessBooking: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BOOKING_ERROR:
            return {
                ...state ,
                errorMsg: action && action.error && action.error.message,
                isSucessBooking: false        
            };

        case CREATE_BOOKING_SUCCESS:
            return {
                ...state,
                isSucessBooking: true
            };
        default:
            return {
                ...state,
                isSucessBooking: false
            };
    }
};
