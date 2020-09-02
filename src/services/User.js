import Parse from 'parse/react-native';
import { setUserAccount, setUserAddress, setUserStock, setUserTransactions, setRecoveredContainers } from '../redux/user/actions';

const dispatch = null;

const setDispatcher = dispatch => {
    dispatch = dispatch;
};

const getDispatcher = () => {
    return dispatch;
};

const fetchAccount = async (dispatch = null) => {
    console.log('Fetching Account...');
    try {
        const userAccountJSON = await Parse.Cloud.run("getMyAccount");
        const accountObject = new Parse.Query('Account');
        const userAccountParse = await accountObject.get(userAccountJSON.objectId);
        if (dispatch) {
            dispatch(setUserAccount(userAccountParse));
            dispatch(setUserStock(userAccountJSON.stock));
        }
        console.log('Done Fetching Account.');
        return userAccountParse;
    } catch (error) {
        console.log('UserService - fetchAccount: ', error.message);
    }
};

const fetchStock = async (dispatch = null) => {
    console.log('Fetching stock...');
    try {
        const userAccountJSON = await Parse.Cloud.run("getMyAccount");
        if (dispatch) {
            dispatch(setUserStock(userAccountJSON.stock));
        }
        console.log('DONE Fetching stock...');
        return userAccountJSON.stock;
    } catch (error) {
        console.log('UserService - fetchStock: ', error.message);
    }
};

const fetchAddress = async (dispatch = null) => {
    console.log('Fetching address...');
    try {
        const parseAddress = new Parse.Query('Address');
        parseAddress.equalTo('default', true);
        const userAddress = await parseAddress.first();
        if (dispatch) {
            dispatch(setUserAddress(userAddress));
        }
        console.log('DONE Fetching address...');
        return userAddress;
    } catch (error) {
        console.log('UserService - fetchAddress: ', error.message);
    }
};

const fetchTransactions = async (dispatch = null) => {
    console.log('Fetching transactions...');
    try {
        const transactions = new Parse.Query('Transaction');
        transactions.descending('createdAt').equalTo('expiredAt', undefined);
        const userTransactions = await transactions.find();
        if (dispatch) {
            dispatch(setUserTransactions(userTransactions));
        }
        console.log('DONE Fetching transactions...');
        return userTransactions;
    } catch (error) {
        console.log('UserService - fetchTransactions: ', error.message);
    }
};

const fetchRecoveredContainers = async (dispatch = null) => {
    console.log('Fetching recovered containers...');
    try {
        const containers = new Parse.Query('Container');
        containers.equalTo('status', 'RECOVERED').include('type');
        const recoveredContainers = await containers.find();
        if (dispatch) {
            dispatch(setRecoveredContainers(recoveredContainers));
        }
        console.log('DONE Fetching recovered containers...');
        return recoveredContainers;
    } catch (error) {
        console.log('Waste Service - fetchWasteTypes: ', error.message);
    }
};

const fetchData = async (dispatch = null) => {
    fetchAccount(dispatch);
    fetchAddress(dispatch);
    fetchTransactions(dispatch);
    fetchRecoveredContainers(dispatch);
};

export default {
    setDispatcher,
    fetchAccount,
    fetchStock,
    fetchAddress,
    fetchTransactions,
    fetchRecoveredContainers,
    fetchData,
};