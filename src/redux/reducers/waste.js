import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

const wasteTypeStatus = createReducer(
  {},
  {
    [types.GET_WASTE_TYPES](state, action) {
      return action;
    },
  },
);

export {wasteTypeStatus};