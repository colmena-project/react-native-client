export const SET_USER_ACCOUNT = 'SET_USER_ACCOUNT';
export const SET_USER_ADDRESS = 'SET_USER_ADDRESS';
export const SET_USER_POSTS = 'SET_USER_POSTS';
export const SET_USER_STOCK = 'SET_USER_STOCK';

export const setUserAccount = data => {
    return { type: SET_USER_ACCOUNT, data };
};

export const setUserAddress = data => {
    return { type: SET_USER_ADDRESS, data };
};

export const setUserPosts = data => {
    return { type: SET_USER_POSTS, data };
};

export const setUserStock = data => {
    return { type: SET_USER_STOCK, data };
};