import * as types from './types';

import getDataFailure from './error';

import Parse from 'parse/react-native';

const getWasteTypes = data => ({
  type: types.GET_WASTE_TYPES,
  data,
});

const wasteTypes = () => {
  const action = async dispatch => {
    const w = Parse.Object.extend('WasteType');
    const q = new Parse.Query(w);
    return await q.find().then(
      data => {
        return dispatch(getWasteTypes(data));
      },
      error => {
        return dispatch(getDataFailure(false));
      },
    );
  };
  return action;
};

export {wasteTypes, getWasteTypes};
