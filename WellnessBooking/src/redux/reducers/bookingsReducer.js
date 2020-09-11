import  {
    GET_BOOKINGS,
    GET_BOOKINGS_ERROR,
    GET_BOOKINGS_SUCCESS
} from '../actions';

const initialState = {
    errorMsg: '',
    listBookings:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKINGS_ERROR:
            return {
                ...state            
            };

        case GET_BOOKINGS_SUCCESS:
            return {
                ...state,
                listBookings: action.items
            };
        default:
            return state;
    }
};
