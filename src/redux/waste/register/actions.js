export const REGISTER_WASTE_CONTAINERS = 'REGISTER_WASTE_CONTAINERS';
export const RESET_WASTE_CONTAINERS = 'RESET_WASTE_CONTAINERS';

export const registerWasteContainers = data => {
    return { type: REGISTER_WASTE_CONTAINERS, data };
};

export const resetWasteContainers = data => {
    return { type: RESET_WASTE_CONTAINERS, data };
};