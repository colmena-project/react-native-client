import {createStackNavigator} from 'react-navigation-stack';

import Intro from '../components/Intro';
// import Login from '../components/Login';
import Logout from '../components/Logout';
import ForgotPassword from '../components/ForgotPassword';
import InAppTabNavigator from './InAppTabNavigator';
import Home from '../components/Home';

import Login from '../components/Login';
import MyColmena from '../components/MyColmena';
import MyWallet from '../components/MyWallet';
import Register from '../components/Register';

const AppRouteConfigs = createStackNavigator({
  Intro: {screen: Intro},
  Login: {screen: Login},
  Logout: {screen: Logout},
  ForgotPassword: {screen: ForgotPassword},
  Register: {screen: Register},
  InApp: {
    screen: InAppTabNavigator,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
});

export default AppRouteConfigs;
