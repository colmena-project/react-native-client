import { createStore, combineReducers } from 'redux';
import userReducer from '../user/reducer';
import travelReducer from '../travel/reducer';
import authReducer from '../auth/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    newTravel: travelReducer,
});

export default createStore(rootReducer);