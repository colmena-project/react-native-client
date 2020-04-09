import * as types from './types';

export const getDataFailure = err => ({
  type: types.FETCHING_DATA_ERROR,
  err,
});
