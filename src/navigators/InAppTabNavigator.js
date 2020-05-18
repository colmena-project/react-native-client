import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/main/home';
import Profile from '../screens/main/profile';
import EditProfile from '../screens/main/profile/edit';
import OthersProfile from '../screens/main/profile/othersProfile';
import Menu1 from '../screens/main/actionsMenu/actionSelector';
import Menu2 from '../screens/main/actionsMenu/wastesActionSelector';
import Waste from '../screens/main/waste';
import WasteCheckInfo from '../screens/main/waste/check';
import WasteSuccess from '../screens/main/waste/success';

const InAppTabNavigator = () => {

  const WasteStack = createStackNavigator();
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

  const HomeNavigator = () => {
    return (
      <HomeStack.Navigator tabBarOptions={{ showLabel: false }} >
        <HomeStack.Screen name="Home" component={Home} options={{
          tabBarIcon: ({ focused }) => {
            const img = focused ? require('../../assets/icons/png/menu-home-active.png') : require('../../assets/icons/png/menu-home-gray.png')
            return (
              <Image style={{ width: 30, height: 30 }} source={img} />
            );
          }
        }} />
        <HomeStack.Screen name="Waste" component={WasteNav} options={{
          tabBarIcon: ({ focused }) => {
            const img = focused ? require('../../assets/icons/png/menu-search-active.png') : require('../../assets/icons/png/menu-search-gray.png')
            return (
              <Image style={{ width: 30, height: 30 }} source={img} />
            );
          }
        }} />
        <HomeStack.Screen name="Menu1" component={Menu1} options={{
          tabBarIcon: ({ focused }) => {
            const img = focused ? require('../../assets/icons/png/menu-actions-gray.png') : require('../../assets/icons/png/menu-actions-gray.png')
            return (
              <Image style={{ width: 30, height: 30 }} source={img} />
            );
          }
        }} />
        <HomeStack.Screen name="Menu2" component={Menu2} options={{
          tabBarIcon: ({ focused }) => {
            const img = focused ? require('../../assets/icons/png/menu-impact-active.png') : require('../../assets/icons/png/menu-home-gray.png')
            return (
              <Image style={{ width: 30, height: 30 }} source={img} />
            );
          }
        }} />
        <HomeStack.Screen name="Profile" component={Profile} options={{
          tabBarIcon: ({ focused }) => {
            const img = focused ? require('../../assets/icons/png/menu-burger-active.png') : require('../../assets/icons/png/menu-home-gray.png')
            return (
              <Image style={{ width: 30, height: 30 }} source={img} />
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
