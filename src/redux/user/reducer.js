import { SET_USER_DATA } from './actions';

const initialState = [];

const userReducer = (userData = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...userData,
                ...action.data,
            };

        default:
            return userData;
    }
};

export default userReducer;