import Parse from 'parse/react-native';
import { setWasteTypes } from '../redux/waste/actions';

const dispatch = null;

const setDispatcher = dispatch => {
    dispatch = dispatch;
};

const getDispatcher = () => {
    return dispatch;
}

const fetchWasteTypes = async dispatch => {
    try {
        const wasteTypesQuery = new Parse.Query('WasteType');
        wasteTypesQuery.equalTo('active', true);
        const result = await wasteTypesQuery.find();
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