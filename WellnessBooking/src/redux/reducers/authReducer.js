import  {
    LOGIN,
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
        case LOGIN:
            return {
                ...state,
                user: action.param.username
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true
            };

        case LOGIN_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                errorMsg: action.error.message,
                user: {}
            };
        case LOGOUT_SUCCESS:
            return { ...initialState };
        default:
            return state;
    }
};
