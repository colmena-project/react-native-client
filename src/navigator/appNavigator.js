import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/auth/LoginScreen';
import TnCScreen from '../screens/auth/TnCScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

import HomeScreen from '../screens/main/home';

import MainWasteActionsScreen from '../screens/main/waste'

import RegisterWasteScreen from '../screens/main/waste/register';
import PickRegisterSourceAddressScreen from '../screens/main/waste/register/pickAddress';
import CongratulationsScreen from '../screens/main/waste/register/congratulations';

import PickWasteToTransportScreen from '../screens/main/waste/transport';
import PickTransportDestinyScreen from '../screens/main/waste/transport/pickDestiny';
import VerifyTransportInfoScreen from '../screens/main/waste/transport/verifyInfo';
import TransportInEvaluationScreen from '../screens/main/waste/transport/inEvaluation';

import PickWasteToManageScreen from '../screens/main/waste/manage';
import ManageWasteScreen from '../screens/main/waste/manage/manageWaste';

import SummaryScreen from '../screens/main/summary';
import PendantsScreen from '../screens/main/pendants';
import ProfileScreen from '../screens/main/profile';
import EditProfile from '../screens/main/profile/edit';
import OthersProfile from '../screens/main/profile/othersProfile';
import TransportCancel from '../screens/main/profile/cancelTransport';
import ChangePasswordScreen from '../screens/main/profile/changePassword';

import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import colors from '../constants/colors';


const RootNavigator = () => {

    const AppStack = createStackNavigator();
    const HomeTabs = createBottomTabNavigator();
    const HomeStack = createStackNavigator();

    const WasteStack = createStackNavigator();
    const ManageWasteStack = createStackNavigator();
    const RegisterWasteStack = createStackNavigator();
    const TransportWasteStack = createStackNavigator();

    const SummaryStack = createStackNavigator();
    const PendantsStack = createStackNavigator();
    const ProfileStack = createStackNavigator();
    const isLoggedIn = useSelector(state => state.auth);

    const setProfileHeaderOptions = (title) => {
        return {
            gestureEnabled: true,
            title: title,
            headerStyle: {
                backgroundColor: "#54CD98",
            },
            headerTintColor: "#fff",
        }
    };

    const HomeNavigator = () => {
        return (
            <HomeStack.Navigator>
                <HomeStack.Screen name={'Index'} component={HomeScreen} options={{ headerShown: false }} />
                <HomeStack.Screen name={'OthersProfile'} component={OthersProfile} options={setProfileHeaderOptions('Ver perfil')} />
            </HomeStack.Navigator>
        );
    };

    const WasteNavigator = () => {
        return (
            <WasteStack.Navigator>
                <WasteStack.Screen name={'MainWasteActions'} component={MainWasteActionsScreen} options={setProfileHeaderOptions('¿Qué quieres hacer?')} />
                <WasteStack.Screen name={'IndexManageWaste'} component={PickWasteToManageScreen} options={setProfileHeaderOptions('Gestionar Residuos')} />
                <WasteStack.Screen name={'ManageWaste'} component={ManageWasteScreen} options={setProfileHeaderOptions('Elija los Residuos')} />
                <WasteStack.Screen name={'RegisterWaste'} component={RegisterWasteScreen} options={setProfileHeaderOptions('Registrar Residuos')} />
                <WasteStack.Screen name={'PickSourceAddress'} component={PickRegisterSourceAddressScreen} options={setProfileHeaderOptions('Seleccione el domicilio')} />
                <WasteStack.Screen name={'Congratulations'} component={CongratulationsScreen} options={{ headerShown: false }} />
                <WasteStack.Screen name={'PickWasteToTransport'} component={PickWasteToTransportScreen} options={setProfileHeaderOptions('Elija los Residuos')} />
                <WasteStack.Screen name={'PickTransportDestiny'} component={PickTransportDestinyScreen} options={setProfileHeaderOptions('Elija el destino')} />
                <WasteStack.Screen name={'VerifyTransportInfo'} component={VerifyTransportInfoScreen} options={setProfileHeaderOptions('Verificar información')} />
                <WasteStack.Screen name={'TransportInEvaluation'} component={TransportInEvaluationScreen} options={{ headerShown: false }} />
            </WasteStack.Navigator>
        );
    };

    const SummaryNavigator = () => {
        return (
            <SummaryStack.Navigator>
                <SummaryStack.Screen name={'Summary'} component={SummaryScreen} options={setProfileHeaderOptions('Resumen')} />
            </SummaryStack.Navigator>
        );
    };

    const PendantsNavigator = () => {
        return (
            <PendantsStack.Navigator>
                <PendantsStack.Screen name={'Pendants'} component={PendantsScreen} options={setProfileHeaderOptions('Pendientes')} />
                <PendantsStack.Screen name={'Cancel Transport'} component={TransportCancel} options={setProfileHeaderOptions('Cancelar transporte')} />
            </PendantsStack.Navigator>
        );
    };

    const RegisterWasteNavigator = () => {
        return (
            <RegisterWasteStack.Navigator>
                <RegisterWasteStack.Screen name={'RegisterWaste'} component={RegisterWasteScreen} options={setProfileHeaderOptions('Registrar Residuos')} />
                <RegisterWasteStack.Screen name={'PickSourceAddress'} component={PickRegisterSourceAddressScreen} options={setProfileHeaderOptions('Seleccione el domicilio')} />
                <RegisterWasteStack.Screen name={'Congratulations'} component={CongratulationsScreen} options={{ headerShown: false }} />
            </RegisterWasteStack.Navigator>
        );
    };

    const ManageWasteNavigator = () => {
        return (
            <ManageWasteStack.Navigator>
                <ManageWasteStack.Screen name={'Index'} component={PickWasteToManageScreen} options={setProfileHeaderOptions('Gestionar Residuos')} />
                <ManageWasteStack.Screen name={'ManageWaste'} component={ManageWasteScreen} options={setProfileHeaderOptions('Elija los Residuos')} />
            </ManageWasteStack.Navigator>
        );
    };

    const TransportWasteNavigator = () => {
        return (
            <TransportWasteStack.Navigator>
                <TransportWasteStack.Screen name={'MainWasteActions'} component={MainWasteActionsScreen} options={setProfileHeaderOptions('¿Qué quieres hacer?')} />
                <TransportWasteStack.Screen name={'PickWasteToTransport'} component={PickWasteToTransportScreen} options={setProfileHeaderOptions('Elija los Residuos')} />
                <TransportWasteStack.Screen name={'PickTransportDestiny'} component={PickTransportDestinyScreen} options={setProfileHeaderOptions('Elija el destino')} />
                <TransportWasteStack.Screen name={'VerifyTransportInfo'} component={VerifyTransportInfoScreen} options={setProfileHeaderOptions('Verificar información')} />
                <TransportWasteStack.Screen name={'TransportInEvaluation'} component={TransportInEvaluationScreen} options={{ headerShown: false }} />
            </TransportWasteStack.Navigator>
        );
    };

    const ProfileNavigator = () => {
        return (
            <ProfileStack.Navigator>
                <ProfileStack.Screen name={'Index'} component={ProfileScreen} options={setProfileHeaderOptions('Perfil')} />
                <ProfileStack.Screen name={'ChangePassword'} component={ChangePasswordScreen} options={{ headerShown: false }} />

                <ProfileStack.Screen name={'EditProfile'} component={EditProfile} options={setProfileHeaderOptions('Editar perfil')} />
                <ProfileStack.Screen name={'OthersProfile'} component={OthersProfile} options={setProfileHeaderOptions('Ver perfil')} />
            </ProfileStack.Navigator>
        );
    };

    const homeTabsNavigator = () => {
        return (
            <HomeTabs.Navigator tabBarOptions={{
                showLabel: false,
                activeTintColor: colors.colmenaGreen,
            }}>
                <HomeTabs.Screen
                    name={'Home'}
                    component={HomeNavigator}
                    options={{
                        tabBarLabel: 'Inicio',
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="home" color={color} size={size} />
                        ),
                    }}
                />
                <HomeTabs.Screen
                    name={'Summary'}
                    component={SummaryNavigator}
                    options={{
                        tabBarLabel: 'Summary',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="appstore-o" color={color} size={size} />
                        ),
                    }}
                />
                <HomeTabs.Screen
                    name={'Waste'}
                    component={WasteNavigator}
                    options={{
                        tabBarLabel: 'Waste',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="recycle" color={color} size={size + 8} />
                        ),
                    }}
                />
                <HomeTabs.Screen
                    name={'Pendants'}
                    component={PendantsNavigator}
                    options={setProfileHeaderOptions('Pendientes')}
                    options={{
                        tabBarLabel: 'Summary',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="clockcircleo" color={color} size={size} />
                        ),
                    }}
                />
                {/* <HomeTabs.Screen
                    name={'RegisterWaste'}
                    component={RegisterWasteNavigator}
                    options={{
                        tabBarLabel: 'Waste',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="pencil" color={color} size={size} />
                        ),
                    }}
                />
                <HomeTabs.Screen
                    name={'ManageWaste'}
                    component={ManageWasteNavigator}
                    options={{
                        tabBarLabel: 'Acciones',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="recycle" color={color} size={size + 6} />
                        ),
                    }}
                />
                <HomeTabs.Screen
                    name={'TransportWaste'}
                    component={TransportWasteNavigator}
                    options={{
                        tabBarLabel: 'Transportar',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="truck" color={color} size={size} />
                        ),
                    }}
                /> */}
                <HomeTabs.Screen
                    name={'User'}
                    component={ProfileNavigator}
                    options={{
                        tabBarLabel: 'Perfil',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="user-o" color={color} size={size - 2} />
                        ),
                    }}
                />
            </HomeTabs.Navigator>
        );
    };

    return (
        <NavigationContainer>
            <AppStack.Navigator>
                {isLoggedIn ?
                    <>
                        <AppStack.Screen name={'App'} component={homeTabsNavigator} options={{ headerShown: false }} />
                    </>
                    :
                    <>
                        <AppStack.Screen name={'Login'} component={LoginScreen} options={{ headerShown: false }} />
                        <AppStack.Screen name={'TnC'} component={TnCScreen} options={{ headerShown: false }} />
                        <AppStack.Screen name={'Register'} component={RegisterScreen} options={{ headerShown: false }} />
                        <AppStack.Screen name={'ForgotPassword'} component={ForgotPasswordScreen} options={{ headerShown: false }} />
                    </>
                }
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;