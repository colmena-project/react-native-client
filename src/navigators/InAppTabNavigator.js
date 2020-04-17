import React from 'react';
import PropTypes from 'prop-types';

import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Home from '../screens/main/home';
import Profile from '../screens/main/profile';
import EditProfile from '../screens/main/profile/edit';
import OthersProfile from '../screens/main/profile/othersProfile';

import Waste from '../screens/main/waste';
import WasteCheckInfo from '../screens/main/waste/check';
import WasteSuccess from '../screens/main/waste/success';

import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

const CustomIcon = (name, size) => {
  const icon = ({tintColor}) => (
    <Icon name={name} size={size} color={tintColor} />
  );

  icon.propTypes = {
    tintColor: PropTypes.string.isRequired,
  };
  return icon;
};

const WasteNav = createStackNavigator({
  Waste: {screen: Waste, navigationOptions: {header: null}},
  WasteCheckInfo: {screen: WasteCheckInfo},
  WasteSuccess: {screen: WasteSuccess},
});

const HomeNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'HOME',
        tabBarIcon: CustomIcon('ios-home', 28),
      },
    },
    Waste: {
      screen: WasteNav,
      navigationOptions: {
        tabBarLabel: 'MIS RESIDUOS',
        tabBarIcon: CustomIcon('ios-archive', 28),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'MI PERFIL',
        tabBarIcon: CustomIcon('ios-person', 28),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      labelStyle: {
        fontWeight: '600',
        marginBottom: 5,
      },
      activeBackgroundColor: 'white',
      activeTintColor: colors.colmenaGreen,
      style: {
        borderTopWidth: 0,
      },
    },
    tabBarPosition: 'bottom',
  },
);

const InAppTabNavigator = createStackNavigator({
  InApp: {
    screen: HomeNavigator,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    }
  },
  OthersProfile: {
    screen: OthersProfile,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    }
  },
});

export default InAppTabNavigator;
