import {
    ADD_CONTAINER_TO_TRANSPORT,
    REMOVE_CONTAINER_TO_TRANSPORT,
    SET_MATERIAL_RETRIBUTION,
    SET_TRANSPORT_RETRIBUTION,
    SET_RECYCLING_CENTER,
    RESET_TRANSPORT
} from './actions';

const initialState = {
    containers: [],
    containersPerType: [],
    materialRetribution: 0,
    transportRetribution: 0,
    to: ''
};

const transportWasteReducer = (transportInfo = initialState, action) => {
    switch (action.type) {
        case ADD_CONTAINER_TO_TRANSPORT:
            transportInfo.containers.push(action.data);
            let found = false;
            for (let i = 0; i < transportInfo.containersPerType.length; i++) {
                if (transportInfo.containersPerType[i].wasteType == action.data.get('type').id) {
                    found = true;
                    transportInfo.containersPerType[i].qty += 1;
                }
            }
            if (!found) {
                transportInfo.containersPerType.push({
                    wasteType: action.data.get('type').id,
                    qty: 1,
                    weight: action.data.get('type').get('qty'),
                    unit: action.data.get('type').get('unit'),
                });
            }
            return transportInfo;

        case REMOVE_CONTAINER_TO_TRANSPORT:
            for (let i = 0; i < transportInfo.containersPerType.length; i++) {
                if (transportInfo.containersPerType[i].wasteType == action.data.get('type').id) {
                    transportInfo.containersPerType[i].qty -= 1;
                }
            }
            transportInfo.containers = transportInfo.containers.filter(container => container.id != action.data.id);
            transportInfo.containersPerType = transportInfo.containersPerType.filter(type => type.qty > 0);
            return transportInfo;

        case SET_MATERIAL_RETRIBUTION:
            transportInfo.materialRetribution = action.data;
            return transportInfo;

        case SET_TRANSPORT_RETRIBUTION:
            transportInfo.transportRetribution = action.data;
            return transportInfo;

        case RESET_TRANSPORT:
            transportInfo = {
                containers: [],
                containersPerType: [],
                materialRetribution: 0,
                transportRetribution: 0,
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