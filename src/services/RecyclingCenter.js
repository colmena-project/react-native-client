import Parse from 'parse/react-native';

const dispatch = null;

const setDispatcher = dispatch => {
    dispatch = dispatch;
};

const getDispatcher = () => {
    return dispatch;
};

const fetchRecyclingCenters = async (dispatch = null) => {
    try {
        const query = new Parse.Query('RecyclingCenter');
        // query.equalTo('active', true);
        const result = await query.find();
        // if (dispatch) {
        //     dispatch(setWasteTypes(result));
        // }
        return result;
    } catch (error) {
        console.log('RecyclingCenter Service - fetchRecyclingCenters: ', error.message);
    }
};

const fetchData = async (dispatch = null) => {
    fetchRecyclingCenters(dispatch);
};

export default {
    setDispatcher,
    fetchRecyclingCenters,
    fetchData,
};