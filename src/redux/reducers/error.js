import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

const errorStatus = createReducer(
  {},
  {
    [types.FETCHING_DATA_ERROR](state, action) {
      return action;
    },
  },
);
export {errorStatus};
