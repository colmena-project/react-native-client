import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/main/home';

import ActionSelector from '../screens/main/actionsMenu/actionSelector';

import Profile from '../screens/main/profile';
import EditProfile from '../screens/main/profile/edit';
import OthersProfile from '../screens/main/profile/othersProfile';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';


import colors from '../styles/colors';

enableScreens();

const InAppTabNavigator = () => {
  
  const ProfileStack = createNativeStackNavigator();
  const HomeStack = createBottomTabNavigator();
  const ActionStack = createNativeStackNavigator();

  const ActionNav = () => {
    return (
      <ActionStack.Navigator>
        <ActionStack.Screen name="Action" component={ActionSelector} options={{ headerShown: false }} />
      </ActionStack.Navigator>
    );
  }

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
        tabBarIcon: ({ color, focused }) => (<AntDesign name="home" color={focused ? colors.colmenaGreen : color} size={30} />)
      }} />
      <HomeStack.Screen name="ActionNav" component={ActionNav} options={{
        tabBarIcon: ({ color, focused }) => ( <AntDesign name={'plus'} color={focused ? colors.colmenaGreen : color} size={32} />),
      }} />
      <HomeStack.Screen name="ProfileNav" component={ProfileNav} options={{
        tabBarIcon: ({ color, focused }) => (<FontAwesome name="user-o" color={focused ? colors.colmenaGreen : color} size={30} />),
      }} />
    </HomeStack.Navigator>
  )
};

export default InAppTabNavigator;
