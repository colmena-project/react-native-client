import * as types from './types';

import Parse from 'parse/react-native';

// myAccount
const getMyAccount = data => ({
  type: types.GET_MY_ACCOUNT,
  data,
});

const getMyParseAccount = data => ({
  type: types.GET_MY_PARSE_ACCOUNT,
  data,
});

const myAccount = () => {
  const action = async dispatch => {
    const account = await Parse.Cloud.run('getMyAccount');
    return dispatch(getMyAccount(account));
  };
  return action;
};

export { myAccount, getMyAccount };
