import Parse from 'parse/react-native';
import { setLoggedIn } from '../redux/auth/actions';

const isSignedIn = async (dispatch) => {
    let user = undefined;
    try {
        user = await Parse.Cloud.run('me');
        return user;
    } catch (err) {
        Parse.User.logOut().catch(err => console.log('INVALID SESSION')).finally(() => dispatch(setLoggedIn(false)));
    }
};

const logOut = dispatch => {
    try {
        Parse.User.currentAsync().then(async user => {
            await Parse.User.logOut();
            GeolocationService.stopTracking();
            dispatch(setLoggedIn(false));
        });
    } catch (err) {
        console.log(err);
    }
};

export default {
    isSignedIn,
    logOut,
};