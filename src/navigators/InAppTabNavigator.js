import React from 'react';
import PropTypes from 'prop-types';

import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Home from '../screens/main/home';
import Profile from '../screens/main/profile';
import EditProfile from '../screens/main/profile/edit';
import OthersProfile from '../screens/main/profile/othersProfile';

import Waste from '../screens/main/waste';
import WasteAddress from '../screens/main/waste/location';
import WasteCheckInfo from '../screens/main/waste/check';
import WasteSuccess from '../screens/main/waste/success';

import Transport from '../screens/main/transport';
import TransportAddress from '../screens/main/transport/location';
import TransportCheckInfo from '../screens/main/transport/check';
import TransportSuccess from '../screens/main/transport/success';

import wastesSelect from '../screens/main/manageWaste';
import WastesEdit from '../screens/main/manageWaste/edit';

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
  WasteAddress: {screen: WasteAddress},
  WasteCheckInfo: {screen: WasteCheckInfo},
  WasteSuccess: {screen: WasteSuccess},
});

const TransportNav = createStackNavigator({
  Transport: {screen: Transport, navigationOptions: {header: null}},
  TransportAddress: {screen: TransportAddress},
  TransportCheckInfo: {screen: TransportCheckInfo},
  TransportSuccess: {screen: TransportSuccess},
});

const ManageWasteNav = createStackNavigator({
  wastesSelect: {screen: wastesSelect, navigationOptions: {header: null}},
  WastesEdit: {screen: WastesEdit},
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
        tabBarIcon: CustomIcon('ios-download', 28),
      },
    },
    Transport: {
      screen: TransportNav,
      navigationOptions: {
        tabBarLabel: 'TRANSPORTAR MIS RESIDUOS',
        tabBarIcon: CustomIcon('ios-subway', 28),
      },
    },
    ManageWaste: {
      screen: ManageWasteNav,
      navigationOptions: {
        tabBarLabel: 'GESTIONAR RESIDUOS',
        tabBarIcon: CustomIcon('ios-create', 28),
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
