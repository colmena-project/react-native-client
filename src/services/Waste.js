import Parse from 'parse/react-native';
import { setWasteTypes } from '../redux/waste/actions';

const dispatch = null;

const setDispatcher = dispatch => {
    dispatch = dispatch;
};

const getDispatcher = () => {
    return dispatch;
};

const fetchWasteTypes = async dispatch => {
    try {
        const query = new Parse.Query('WasteType');
        query.equalTo('active', true);
        const result = await query.find();
        dispatch(setWasteTypes(result));
    } catch (error) {
        console.log('Waste Service - fetchWasteTypes: ', error.message);
    }
};

const fetchData = dispatch => {
    fetchWasteTypes(dispatch);
};

export default {
    setDispatcher,
    fetchWasteTypes,
    fetchData,
};