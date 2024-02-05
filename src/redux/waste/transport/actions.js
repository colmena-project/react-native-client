export const ADD_CONTAINER_TO_TRANSPORT = 'ADD_CONTAINER_TO_TRANSPORT';
export const REMOVE_CONTAINER_TO_TRANSPORT = 'REMOVE_CONTAINER_TO_TRANSPORT';
export const SET_MATERIAL_RETRIBUTION = 'SET_MATERIAL_RETRIBUTION';
export const SET_TRANSPORT_RETRIBUTION = 'SET_TRANSPORT_RETRIBUTION';
export const RESET_TRANSPORT = 'RESET_TRANSPORT';
export const SET_RECYCLING_CENTER = 'SET_RECYCLING_CENTER';

export const addContainerToTransport = data => {
    return { type: ADD_CONTAINER_TO_TRANSPORT, data };
};

export const removeContainerToTransport = data => {
    return { type: REMOVE_CONTAINER_TO_TRANSPORT, data };
};

export const setMaterialRetribution = data => {
    return { type: SET_MATERIAL_RETRIBUTION, data};
};

export const setTransportRetribution = data => {
    return { type: SET_TRANSPORT_RETRIBUTION, data};
};

export const resetTransport = () => {
    return { type: RESET_TRANSPORT };
};

export const setRecyclingCenter = data => {
    return { type: SET_RECYCLING_CENTER, data };
};