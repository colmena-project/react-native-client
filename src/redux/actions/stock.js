import * as types from './types';

import AsyncStorage from '@react-native-community/async-storage';

import Parse from 'parse/react-native';

// LocalStock
const getLocalStock = data => ({
  type: types.GET_LOCAL_STOCK,
  data,
});

const localStock = () => {
  const action = async dispatch => {
    //dispatch(getLocalStock(account.stock));
  };
  return action;
};

// myStock
const getMyStock = data => ({
  type: types.GET_STOCK,
  data,
});

const myStock = () => {
  const action = async dispatch => {
    const account = await Parse.Cloud.run('getMyAccount');

    if (account.stock && account.stock.length > 0) {
      dispatch(getMyStock(account.stock));
    } else {
      dispatch(getMyStock([]));
    }
  };
  return action;
};

// ChangeStock
const setChangeStock = changeStockInState => ({
  type: types.CHANGE_STOCK,
  changeStockInState,
});

const changeStock = (wasteID, qty) => {
  const action = async dispatch => {
    const account = await Parse.Cloud.run('getMyAccount');
    const stock = account.stock.filter(
      record => record.wasteType.id === wasteID,
    );
    if (stock.length > 0) {
      AsyncStorage.setItem('stock', {
        wasteID: wasteID,
        qty: qty - stock[0].ammount,
      });
      dispatch(setChangeStock({wasteID: wasteID, qty: qty - stock[0].ammount}));
    } else {
      dispatch(setChangeStock(false));
    }
  };
  return action;
};

const setUpdateStock = updateStockInState => ({
  type: types.UPDATE_STOCK,
  updateStockInState,
});

const updateStock = wasteContainers => {
  const action = async dispatch => {
    // TODO: luego agregariamos addressId: address
    return await Parse.Cloud.run('registerRecover', {
      containers: wasteContainers,
    }).then(
      result => {
        dispatch(setUpdateStock(result));
        return result;
      },
      error => {
        dispatch(setUpdateStock(false));
      },
    );
  };
  return action;
};

export {myStock, changeStock, setChangeStock, updateStock, setUpdateStock};
