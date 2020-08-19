import { SET_USER_ACCOUNT, SET_USER_ADDRESS, SET_USER_POSTS } from './actions';

const initialState = [];

const userReducer = (userData = initialState, action) => {
    switch (action.type) {
        case SET_USER_ACCOUNT:
            return {
                ...userData,
                userAccount: { ...userData.userAccount, ...action.data },
            };
        case SET_USER_ADDRESS:
            return {
                ...userData,
                userAddress: { ...userData.userAddress, ...action.data },
            };
        case SET_USER_POSTS:
            return {
                ...userData,
                userPosts: { ...userData.userPosts, ...action.data },
            };

        default:
            return userData;
    }
};

export default userReducer;