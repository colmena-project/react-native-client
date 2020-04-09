import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

const myAccountStatus = createReducer(
  {},
  {
    [types.GET_MY_ACCOUNT](state, action) {
      return action;
    },
  },
);
export {myAccountStatus};
