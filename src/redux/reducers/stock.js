import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

const myStockStatus = createReducer(
  {},
  {
    [types.GET_STOCK](state, action) {
      return action;
    },
  },
);

const changeStockStatus = createReducer(
  {},
  {
    [types.CHANGE_STOCK](state, action) {
      return action;
    },
  },
);

export {myStockStatus, changeStockStatus};
