import { useEffect } from 'react';
import Auth from '../../services/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const AuthorizedScreen = props => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.loggedInStatus);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            Auth.isSignedIn(dispatch);
        });
        return unsubscribe;
    }, [navigation]);

    return isLoggedIn.loggedInState ? props.children : null;
};

export default AuthorizedScreen;