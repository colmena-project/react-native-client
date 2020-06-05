import Parse from 'parse/react-native';
import { setLoggedInState } from '../redux/actions/auth';

const isSignedIn = async (dispatch) => {
    try {
        const user = await Parse.User.currentAsync();
        return user.fetch();
    } catch (err) {
        Parse.User.logOut().catch(err => console.log('INVALID SESSION')).finally(() => dispatch(setLoggedInState(false)));
    }
};

export default isSignedIn;