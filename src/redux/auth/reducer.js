import { IS_LOGGED_IN, SET_LOGGED_IN } from './actions';

const initialState = false;

const authReducer = (isLoggedIn = initialState, action) => {
    switch (action.type) {
        case SET_LOGGED_IN:
            isLoggedIn = action.data;
            return isLoggedIn;

        case IS_LOGGED_IN:
            return isLoggedIn;

        default:
            return isLoggedIn;
    }
};

export default authReducer;