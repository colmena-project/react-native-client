import { SET_USER_ACCOUNT, SET_USER_ADDRESS, SET_USER_POSTS, SET_USER_STOCK, SET_USER_TRANSACTIONS } from './actions';

const initialState = [];

const userReducer = (userData = initialState, action) => {
    switch (action.type) {
        case SET_USER_ACCOUNT:
            return {
                ...userData,
                account: action.data,
            };
        case SET_USER_ADDRESS:
            return {
                ...userData,
                address: action.data,
            };
        case SET_USER_POSTS:
            return {
                ...userData,
                posts: action.data,
            };
        case SET_USER_STOCK:
            return {
                ...userData,
                stock: action.data,
            };
        case SET_USER_TRANSACTIONS:
            return {
                ...userData,
                transactions: action.data,
            };
        default:
            return userData;
    }
};

export default userReducer;