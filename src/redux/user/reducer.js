import { SET_USER_ACCOUNT, SET_USER_ADDRESS, SET_USER_POSTS, SET_USER_STOCK } from './actions';

const initialState = [];

const userReducer = (userData = initialState, action) => {
    switch (action.type) {
        case SET_USER_ACCOUNT:
            return {
                ...userData,
                userAccount: action.data,
            };
        case SET_USER_ADDRESS:
            return {
                ...userData,
                userAddress: action.data,
            };
        case SET_USER_POSTS:
            return {
                ...userData,
                userPosts: action.data,
            };
        case SET_USER_STOCK:
            return {
                ...userData,
                userStock: action.data,
            };
        default:
            return userData;
    }
};

export default userReducer;