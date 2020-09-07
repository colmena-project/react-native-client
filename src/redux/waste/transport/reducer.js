import { ADD_CONTAINER_TO_TRANSPORT, REMOVE_CONTAINER_TO_TRANSPORT, SET_RECYCLING_CENTER, RESET_TRANSPORT } from './actions';

const initialState = {
    containers: [],
    to: ''
};

const transportWasteReducer = (transportInfo = initialState, action) => {
    switch (action.type) {
        case ADD_CONTAINER_TO_TRANSPORT:
            transportInfo.containers.push(action.data);
            return transportInfo;

        case REMOVE_CONTAINER_TO_TRANSPORT:
            const containers = transportInfo.containers.filter(container => container.id != action.data.id);
            transportInfo.containers = containers;
            return transportInfo;

        case RESET_TRANSPORT:
            transportInfo = {
                containers: [],
                to: ''
            };
            return transportInfo;

        case SET_RECYCLING_CENTER:
            transportInfo.to = action.data;
            return transportInfo;

        default:
            return transportInfo;
    }
};

export default transportWasteReducer;