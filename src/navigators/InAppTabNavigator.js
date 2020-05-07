import React from 'react';
import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Home from '../screens/main/home';
import Profile from '../screens/main/profile';
import EditProfile from '../screens/main/profile/edit';
import OthersProfile from '../screens/main/profile/othersProfile';

// Menus Screens
import Menu1 from '../screens/main/actionsMenu/actionSelector';
import Menu2 from '../screens/main/actionsMenu/wastesActionSelector';

import Waste from '../screens/main/waste';
import WasteCheckInfo from '../screens/main/waste/check';
import WasteSuccess from '../screens/main/waste/success';
import colors from '../styles/colors';

const WasteNav = createStackNavigator({
  Waste: { screen: Waste, navigationOptions: { header: null } },
  WasteCheckInfo: { screen: WasteCheckInfo },
  WasteSuccess: { screen: WasteSuccess },
});

const HomeNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'HOME',
        tabBarIcon: ({ focused }) => {
          const img = focused ? require('../../assets/icons/png/menu-home-active.png') : require('../../assets/icons/png/menu-home-gray.png')
          return (
            <Image style={{ width: 40, height: 40 }} source={img} />
          );
        }
      },
    },
    Waste: {
      screen: WasteNav,
      navigationOptions: {
        tabBarLabel: 'MIS RESIDUOS',
        tabBarIcon: ({ focused }) => {
          const img = focused ? require('../../assets/icons/png/menu-search-active.png') : require('../../assets/icons/png/menu-search-gray.png')
          return (
            <Image style={{ width: 40, height: 40 }} source={img} />
          );
        }
      },
    },
    Menu1: {
      screen: Menu1,
      navigationOptions: {
        tabBarLabel: 'MENU 1',
        tabBarIcon: ({ focused }) => {
          const img = focused ? require('../../assets/icons/png/menu-actions-gray.png') : require('../../assets/icons/png/menu-actions-gray.png')
          return (
            <Image style={{ width: 40, height: 40 }} source={img} />
          );
        }
      },
    },
    Menu2: {
      screen: Menu2,
      navigationOptions: {
        tabBarLabel: 'MENU 2',
        tabBarIcon: ({ focused }) => {
          const img = focused ? require('../../assets/icons/png/menu-impact-active.png') : require('../../assets/icons/png/menu-home-gray.png')
          return (
            <Image style={{ width: 40, height: 40 }} source={img} />
          );
        }
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'MI PERFIL',
        tabBarIcon: ({ focused }) => {
          const img = focused ? require('../../assets/icons/png/menu-burger-active.png') : require('../../assets/icons/png/menu-home-gray.png')
          return (
            <Image style={{ width: 40, height: 40 }} source={img} />
          );
        }
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
