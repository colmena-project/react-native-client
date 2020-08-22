import { createStore, combineReducers } from 'redux';
import userReducer from '../user/reducer';
import authReducer from '../auth/reducer';
import wasteTypesReducer from '../waste/reducer';
import registerWasteReducer from '../waste/register/reducer';

const rootReducer = combineReducers({
    isLoggedIn: authReducer,
    user: userReducer,
    wasteTypes: wasteTypesReducer,
    registerWaste: registerWasteReducer,
});

export default createStore(rootReducer);