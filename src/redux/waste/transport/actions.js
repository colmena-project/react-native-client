export const ADD_CONTAINER_TO_TRANSPORT = 'ADD_CONTAINER_TO_TRANSPORT';
export const REMOVE_CONTAINER_TO_TRANSPORT = 'REMOVE_CONTAINER_TO_TRANSPORT';
export const RESET_TRANSPORT = 'RESET_TRANSPORT';
export const SET_RECYCLE_CENTER = 'SET_RECYCLE_CENTER';

export const addContainerToTransport = data => {
    return { type: ADD_CONTAINER_TO_TRANSPORT, data };
};

export const removeContainerToTransport = data => {
    return { type: REMOVE_CONTAINER_TO_TRANSPORT, data };
};

export const resetTransport = () => {
    return { type: RESET_TRANSPORT };
};

export const setRecycleCenter = data => {
    return { type: SET_RECYCLE_CENTER, data };
};