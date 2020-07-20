export const SET_TRAVEL_POINTS = 'SET_TRAVEL_DATA';
export const SET_TRAVEL_TRUCK_DATA = 'SET_TRAVEL_TRUCK_DATA';
export const SET_TRAVEL_LOCATION = 'SET_TRAVEL_LOCATION';

export const setTravelData = data => {
    return { type: SET_TRAVEL_POINTS, data };
};

export const setTravelTruckData = data => {
    return { type: SET_TRAVEL_TRUCK_DATA, data };
};

export const setTravelLocation = data => {
    return { type: SET_TRAVEL_LOCATION, data };
};