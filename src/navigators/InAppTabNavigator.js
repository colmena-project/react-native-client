import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../styles/colors';

const InAppTabNavigator = () => {

  const WasteStack = createStackNavigator();
  const TransportStack = createStackNavigator();
  const ManageWasteStack = createStackNavigator();
  const HomeStack = createBottomTabNavigator();
  const InAppStack = createStackNavigator();

  const WasteNav = () => {
    return (
      <WasteStack.Navigator>
        <WasteStack.Screen name="Waste" component={Waste} options={{ headerShown: false }} />
        <WasteStack.Screen name="WasteCheckInfo" component={WasteCheckInfo} options={{ headerShown: false }} />
        <WasteStack.Screen name="WasteSuccess" component={WasteSuccess} options={{ headerShown: false }} />
      </WasteStack.Navigator>
    );
  };
  
  const TransportNav = () => {
    return (
      <TransportStack.Navigator>
        <TransportStack.Screen name="Transport" component={Transport} options={{ headerShown: false }} />
        <TransportStack.Screen name="TransportAddress" component={TransportAddress} options={{ headerShown: false }} />
        <TransportStack.Screen name="TransportCheckInfo" component={TransportCheckInfo} options={{ headerShown: false }} />
        <TransportStack.Screen name="TransportSuccess" component={TransportSuccess} options={{ headerShown: false }} />
      </TransportStack.Navigator>
    );
  };
  
  const ManageWasteNav = () => {
    return (
      <ManageWasteStack.Navigator>
        <ManageWasteStack.Screen name="wastesSelect" component={wastesSelect} options={{ headerShown: false }} />
        <ManageWasteStack.Screen name="WastesEdit" component={WastesEdit} options={{ headerShown: false }} />
      </ManageWasteStack.Navigator>
    );
  };
  
  const HomeNavigator = () => {
    return (
      <HomeStack.Navigator tabBarOptions={{ showLabel: false }} >
        <HomeStack.Screen name="Home" component={Home} options={{
          tabBarIcon: ({ focused }) => {
            const img = focused ? require('../../assets/icons/png/menu-home-active.png') : require('../../assets/icons/png/menu-home-gray.png')
            return (
              <Image style={{ width: 28, height: 28 }} source={img} />
            );
          }
        }} />
        <HomeStack.Screen name="Waste" component={WasteNav} options={{
          tabBarIcon: ({ focused }) => {
            const img = focused ? require('../../assets/icons/png/menu-search-active.png') : require('../../assets/icons/png/menu-search-gray.png')
            return (
              <Image style={{ width: 28, height: 28 }} source={img} />
            );
          }
        }} />
        <HomeStack.Screen name="Waste" component={WasteNav} options={{
          tabBarIcon: <MaterialIcons name={'move-to-inbox'} size={28} />,
        }} />
        <HomeStack.Screen name="Transport" component={TransportNav} options={{
          tabBarIcon: <MaterialCommunityIcons name={'bank-transfer-in'} size={28} />,
          }
        }} />
        <HomeStack.Screen name="wastesSelect" component={ManageWasteNav} options={{
          tabBarIcon: <MaterialCommunityIcons name={'recycle'} size={28} />,
          }
        }} />
        <HomeStack.Screen name="Profile" component={Profile} options={{
          tabBarIcon: ({ focused }) => {
            const img = focused ? require('../../assets/icons/png/menu-burger-active.png') : require('../../assets/icons/png/menu-home-gray.png')
            return (
              <Image style={{ width: 28, height: 28 }} source={img} />
            );
          }
        }} />
      </HomeStack.Navigator>
    );
  };
  return (
    <InAppStack.Navigator>
      <InAppStack.Screen name="InApp" component={HomeNavigator} options={{ headerShown: false }} />
      <InAppStack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
      <InAppStack.Screen name="OthersProfile" component={OthersProfile} options={{ headerShown: false }} />
    </InAppStack.Navigator>
  );
};

export default InAppTabNavigator;
