import * as types from './types';

import Config from '../../config';

import AsyncStorage from '@react-native-community/async-storage';

import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize(Config.parseConnect);

Parse.serverURL = Config.parseUrl;

// myAccount
const getMyAccount = data => ({
  type: types.GET_MY_ACCOUNT,
  data,
});

const myAccount = () => {
  const action = async dispatch => {
    const account = await Parse.Cloud.run('getMyAccount');
    return dispatch(getMyAccount(account));
  };
  return action;
};

export {myAccount, getMyAccount};
