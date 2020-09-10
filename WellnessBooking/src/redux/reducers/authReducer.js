import  {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS
} from '../actions';

const initialState = {
    errorMsg: '',
    isLoggedIn: false,
    user: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.result.data
            };

        case LOGIN_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                errorMsg: action.error.message,
            };
        case LOGOUT_SUCCESS:
            return { ...initialState };
        default:
            return state;
    }
};
