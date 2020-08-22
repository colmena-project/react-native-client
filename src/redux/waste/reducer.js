import { SET_WASTE_TYPES } from './actions';

const initialState = [];

const wasteTypesReducer = (wasteTypes = initialState, action) => {
    switch (action.type) {
        case SET_WASTE_TYPES:
            return {
                ...wasteTypes,
                ...action.data
            };

        default:
            return wasteTypes;
    }
};

export default wasteTypesReducer;