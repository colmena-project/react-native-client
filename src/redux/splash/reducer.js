import { IS_SEE_SPLASH, SET_SEE_SPLASH } from './actions';

const initialState = false;

const splashReducer = (isSeeSplash = initialState, action) => {
    switch (action.type) {
        case SET_SEE_SPLASH:
            isSeeSplash = action.data;
            return isSeeSplash;

        default:
            return isSeeSplash;
    }
};

export default splashReducer;