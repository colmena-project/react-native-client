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

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../styles/colors';

const InAppTabNavigator = () => {

  const WasteStack = createStackNavigator();
  const TransportStack = createStackNavigator();
  const ManageWasteStack = createStackNavigator();
  const ProfileStack = createStackNavigator();
  const HomeStack = createBottomTabNavigator();
  //const InAppStack = createStackNavigator();

  const WasteNav = () => {
    return (
      <WasteStack.Navigator>
        <WasteStack.Screen name="Waste" component={Waste} options={{ headerShown: false }} />
        <WasteStack.Screen name="WasteAddress" component={WasteAddress} options={{ headerShown: false }} />
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
  
  const ProfileNav = () => {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <ProfileStack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <ProfileStack.Screen name="OthersProfile" component={OthersProfile} options={{ headerShown: false }} />
      </ProfileStack.Navigator>
    );
  };

  return(
    <HomeStack.Navigator tabBarOptions={{ showLabel: false }} >
      <HomeStack.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ color, focused }) => (<AntDesign name="home" color={focused ? colors.colmenaGreen : color} size={28} />)
      }} />
      <HomeStack.Screen name="WasteNav" component={WasteNav} options={{
        tabBarIcon: ({ color, focused }) => ( <MaterialIcons name={'move-to-inbox'} color={focused ? colors.colmenaGreen : color} size={28} />),
      }} />
      <HomeStack.Screen name="TransportNav" component={TransportNav} options={{
        tabBarIcon: ({ color, focused }) => ( <MaterialCommunityIcons name={'bank-transfer-in'} color={focused ? colors.colmenaGreen : color} size={28} />),
      }} />
      <HomeStack.Screen name="wastesSelectNav" component={ManageWasteNav} options={{
        tabBarIcon: ({ color, focused }) => ( <MaterialCommunityIcons name={'recycle'} color={focused ? colors.colmenaGreen : color} size={28} />),
      }} />
      <HomeStack.Screen name="ProfileNav" component={ProfileNav} options={{
        tabBarIcon: ({ color, focused }) => (<FontAwesome name="user-o" color={focused ? colors.colmenaGreen : color} size={28} />),
      }} />
    </HomeStack.Navigator>
  )
};

export default InAppTabNavigator;
