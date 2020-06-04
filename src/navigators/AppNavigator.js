

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Intro from '../components/Intro';
import Login from '../screens/auth/login';
import Logout from '../screens/auth/logout';
import ForgotPassword from '../components/ForgotPassword';
import Register from '../screens/auth/register';
import InAppTabNavigator from './InAppTabNavigator';

const AppNavigator = () => {

  const RootStack = createStackNavigator();

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {/* <RootStack.Screen name="Intro" component={Intro} /> */}
        <RootStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <RootStack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        <RootStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <RootStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <RootStack.Screen name="Home" component={InAppTabNavigator} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
