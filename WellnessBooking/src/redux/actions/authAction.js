export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function login(param) {
    return {
        type: LOGIN,
        param
    }
}

export function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        user
    }
}
export function loginError(error) {
    return {
        type: LOGIN_ERROR,
        error
    }
}