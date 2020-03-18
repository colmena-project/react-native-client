import React from 'react';
import PropTypes from 'prop-types';

import MiColmenaContainer from '../containers/MiColmenaContainer';

import Profile from '../components/Profile';

import MyWaste from '../components/MyWaste';

import HomeFeed from '../components/posts/HomeFeed';

import {createStackNavigator} from 'react-navigation-stack';

import {createBottomTabNavigator} from 'react-navigation-tabs';

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

const MiColmenaTab = createStackNavigator(
  {
    ComunidadContainer: {
      screen: MiColmenaContainer,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    mode: 'modal',
  },
);

const InAppTabNavigator = createBottomTabNavigator(
  {
    HomeFeed: {
      screen: HomeFeed,
      navigationOptions: {
        tabBarLabel: 'HOME',
        tabBarIcon: CustomIcon('ios-home', 28),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'MI PERFIL',
        tabBarIcon: CustomIcon('ios-person', 28),
      },
    },
    MiColmena: {
      screen: MiColmenaTab,
      navigationOptions: {
        tabBarLabel: 'MI BARRIO',
        tabBarIcon: CustomIcon('ios-people', 28),
      },
    },
    MyWaste: {
      screen: MyWaste,
      navigationOptions: {
        tabBarLabel: 'MIS RESIDUOS',
        tabBarIcon: CustomIcon('ios-archive', 28),
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

export default InAppTabNavigator;
