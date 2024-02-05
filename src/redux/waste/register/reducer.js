import { REGISTER_WASTE_CONTAINERS, RESET_WASTE_CONTAINERS } from './actions';

const initialState = [];

const registerWasteReducer = (registerWasteData = initialState, action) => {
    switch (action.type) {
        case REGISTER_WASTE_CONTAINERS:
            let exists = false;
            registerWasteData.map(container => {
                if (container.id == action.data.id) {
                    exists = true;
                    container.qty = action.data.qty;
                    container.item = action.data.item;
                }
                if (container.qty > 0)
                    return container;
                return null;
            });
            if (!exists) {
                registerWasteData.push({ id: action.data.id, qty: action.data.qty, item: action.data.item });
            }
            if (exists && action.data.qty == 0) {
                registerWasteData = registerWasteData.filter(container => container.id != action.data.id)
            }
            return registerWasteData;
        case RESET_WASTE_CONTAINERS:
            registerWasteData = initialState;
            return registerWasteData;

        default:
            return registerWasteData;
    }
};

export default registerWasteReducer;