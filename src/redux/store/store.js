import { createStore, combineReducers } from 'redux';
import userReducer from '../user/reducer';
import authReducer from '../auth/reducer';
import splashReducer from '../splash/reducer'
import wasteTypesReducer from '../waste/reducer';
import registerWasteReducer from '../waste/register/reducer';
import transportInfoReducer from '../waste/transport/reducer';

const rootReducer = combineReducers({
    isLoggedIn: authReducer,
    isSeeSplash: splashReducer,
    user: userReducer,
    wasteTypes: wasteTypesReducer,
    registerWaste: registerWasteReducer,
    transportInfo: transportInfoReducer,
});

export default createStore(rootReducer);