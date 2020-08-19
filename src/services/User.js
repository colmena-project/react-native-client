import Parse from 'parse/react-native';
import { setUserAccount, setUserAddress } from '../redux/user/actions';

const dispatch = null;

const setDispatcher = dispatch => {
    dispatch = dispatch;
};

const getDispatcher = () => {
    return dispatch;
}

const setAccount = async dispatch => {
    const userAccount = await Parse.Cloud.run("getMyAccount");
    dispatch(setUserAccount({ userAccount }));
};

const setAddress = async dispatch => {
    const parseAddress = new Parse.Query('Address');
    parseAddress.equalTo('default', true);
    const userAddress = await parseAddress.first();
    dispatch(setUserAddress({ userAddress }));
};

const getData = dispatch => {
    setAccount(dispatch);
    setAddress(dispatch);
};

export default {
    setDispatcher,
    setAccount,
    setAddress,
    getData,
};