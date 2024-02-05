export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export const setLoggedIn = data => {
    return { type: SET_LOGGED_IN, data };
};
