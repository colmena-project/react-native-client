import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

const loggedInStatus = createReducer(
  {},
  {
    [types.SET_LOGGED_IN_STATE](state, action) {
      return action;
    },
  },
);

export {loggedInStatus};
