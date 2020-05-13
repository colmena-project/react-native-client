import * as types from './types';

import Parse from 'parse/react-native';

// myParseAcccount
const getMyParseAccount = data => ({
  type: types.GET_MY_ACCOUNT,
  data,
});

const myParseAcccount = () => {
  const action = async dispatch => {
    const myAccount = await Parse.Cloud.run('getMyAccount');
    parseAccount = new Parse.Query('Account').get(myAccount.objectId);
    return dispatch(getMyParseAccount(parseAccount));
  };
  return action;
};

export {myParseAcccount};