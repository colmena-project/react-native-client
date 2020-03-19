import {createStackNavigator} from 'react-navigation-stack';

import Intro from '../components/Intro';
import Login from '../screens/auth/login';
import Logout from '../screens/auth/logout';
import ForgotPassword from '../components/ForgotPassword';
import Register from '../screens/auth/register';
import InAppTabNavigator from './InAppTabNavigator';

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
