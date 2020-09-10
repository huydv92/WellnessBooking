import { SHOW_LOADING } from '../actions';

const initialState = {
    loading: false,
};

export default function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_LOADING:
            return {
                ...state,
                loading: action.isShow
            };
        default:
            return state;
    }
}