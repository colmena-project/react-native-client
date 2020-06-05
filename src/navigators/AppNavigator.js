

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';


import Intro from '../components/Intro';
import Login from '../screens/auth/login';
import Logout from '../screens/auth/logout';
import ForgotPassword from '../components/ForgotPassword';
import Register from '../screens/auth/register';
import InAppTabNavigator from './InAppTabNavigator';



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

enableScreens();

const AppNavigator = () => {

  const RootStack = createNativeStackNavigator();

  const WasteStack = createNativeStackNavigator();
  const TransportStack = createNativeStackNavigator();
  const ManageWasteStack = createNativeStackNavigator();

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

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {/* <RootStack.Screen name="Intro" component={Intro} /> */}
        <RootStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <RootStack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        <RootStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <RootStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <RootStack.Screen name="Home" component={InAppTabNavigator} options={{ headerShown: false }} />
        <RootStack.Screen name="WasteNav" component={WasteNav} options={{ headerShown: false }} />
        <RootStack.Screen name="TransportNav" component={TransportNav} options={{ headerShown: false }} />
        <RootStack.Screen name="ManageWasteNav" component={ManageWasteNav} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
