import Parse from 'parse/react-native';
import { setUserAccount, setUserAddress, setUserStock, setUserTransactions } from '../redux/user/actions';

const dispatch = null;

const setDispatcher = dispatch => {
    dispatch = dispatch;
};

const getDispatcher = () => {
    return dispatch;
}

const fetchAccount = async dispatch => {
    try {
        const userAccountJSON = await Parse.Cloud.run("getMyAccount");
        const accountObject = new Parse.Query('Account');
        const userAccountParse = await accountObject.get(userAccountJSON.objectId);
        dispatch(setUserAccount(userAccountParse));
        dispatch(setUserStock(userAccountJSON.stock));
    } catch (error) {
        console.log('UserService - fetchAccount: ', error.message);
    }
};

const fetchAddress = async dispatch => {
    try {
        const parseAddress = new Parse.Query('Address');
        parseAddress.equalTo('default', true);
        const userAddress = await parseAddress.first();
        dispatch(setUserAddress(userAddress));
    } catch (error) {
        console.log('UserService - fetchAddress: ', error.message);
    }
};

const fetchTransactions = async dispatch => {
    try {
        const transactions = new Parse.Query('Transaction');
        // transactions.equalTo('type', 'TRANSPORT');
        transactions.descending('createdAt').equalTo('expiredAt', undefined);
        const userTransactions = await transactions.find();
        dispatch(setUserTransactions(userTransactions));
    } catch (error) {
        console.log('UserService - fetchTransactions: ', error.message);
    }
};

const fetchData = dispatch => {
    fetchAccount(dispatch);
    fetchAddress(dispatch);
    fetchTransactions(dispatch);
};

export default {
    setDispatcher,
    fetchAccount,
    fetchAddress,
    fetchTransactions,
    fetchData,
};