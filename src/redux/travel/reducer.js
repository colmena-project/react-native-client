import { SET_TRAVEL_POINTS, SET_TRAVEL_TRUCK_DATA, SET_TRAVEL_LOCATION } from './actions';

const initialState = [];

const travelReducer = (travelData = initialState, action) => {
    switch (action.type) {
        case SET_TRAVEL_POINTS:
            return {
                ...travelData,
                ...action.data,
            };

        case SET_TRAVEL_TRUCK_DATA:
            return {
                ...travelData,
                ...action.data,
            };

        case SET_TRAVEL_LOCATION:
            return {
                ...travelData,
                ...action.data,
            };

        default:
            return travelData;
    }
};

export default travelReducer;