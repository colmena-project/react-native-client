import * as types from './types';

import getDataFailure from './error';

import Config from '../../config';

import AsyncStorage from '@react-native-community/async-storage';

import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize(Config.parseConnect);

Parse.serverURL = Config.parseUrl;

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
