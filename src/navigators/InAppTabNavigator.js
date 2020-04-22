import React from 'react';
import { Text, View } from 'react-native';
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

import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

import SvgUri from 'react-native-svg-uri';


const CustomIcon = (name, size) => {
  const icon = ({ tintColor }) => (
    <Icon name={name} size={size} color={tintColor} />
  );

  icon.propTypes = {
    tintColor: PropTypes.string.isRequired,
  };
  return icon;
};

const CustomSvgIcon = (image, focused) => {
  const color = focused ? colors.colmenaGreen : colors.colmenaGrey;
  return <View style={{ width: 20, height: 20 }}>
    <SvgUri
      width="20"
      height="20"
      source={image}
      fill={color}
    />
  </View>
};

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
          return (
            CustomSvgIcon(require('../../assets/icons/svg/arrow-back.svg'), focused)
          );
        }
      },
    },
    Waste: {
      screen: WasteNav,
      navigationOptions: {
        tabBarLabel: 'MIS RESIDUOS',
        tabBarIcon: CustomIcon('ios-archive', 28),
      },
    },
    Menu1: {
      screen: Menu1,
      navigationOptions: {
        tabBarLabel: 'MENU 1',
        tabBarIcon: CustomIcon('ios-rocket', 28),
      },
    },
    Menu2: {
      screen: Menu2,
      navigationOptions: {
        tabBarLabel: 'MENU 2',
        tabBarIcon: CustomIcon('ios-jet', 28),
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
