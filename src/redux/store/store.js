import { createStore, combineReducers } from 'redux';
import userReducer from '../user/reducer';
import authReducer from '../auth/reducer';
import registerWasteReducer from '../waste/register/reducer';

const rootReducer = combineReducers({
    isLoggedIn: authReducer,
    user: userReducer,
    registerWaste: registerWasteReducer,
});

export default createStore(rootReducer);