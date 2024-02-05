import React, {useState, useEffect } from 'react';
import { View, Image, AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/auth/LoginScreen';
import TnCScreen from '../screens/auth/TnCScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

import SplashHome from '../screens/main/splash/splashhome';
import SplashFirst from '../screens/main/splash/splashfirst';
import SplashSecond from '../screens/main/splash/splashsecond';
import SplashEnd from '../screens/main/splash/splashend';

import HomeScreen from '../screens/main/home';

import MainWasteActionsScreen from '../screens/main/waste';

import RegisterWasteScreen from '../screens/main/waste/register';
import PickRegisterSourceAddressScreen from '../screens/main/waste/register/pickAddress';
import RegisterConfirmationScreen from '../screens/main/waste/register/confirmation';
import CongratulationsScreen from '../screens/main/waste/register/congratulations';

import PickWasteToTransportScreen from '../screens/main/waste/transport';
import PickTransportDestinyScreen from '../screens/main/waste/transport/pickDestiny';
import VerifyTransportInfoScreen from '../screens/main/waste/transport/verifyInfo';
import TransportInEvaluationScreen from '../screens/main/waste/transport/inEvaluation';

import PickWasteToManageScreen from '../screens/main/waste/manage';
import ManageWasteScreen from '../screens/main/waste/manage/manageWaste';

import SummaryScreen from '../screens/main/summary';
import Buscar from '../screens/main/buscar/buscar';
import PendantsScreen from '../screens/main/pendants';
import ProfileScreen from '../screens/main/profile';
import EditProfile from '../screens/main/profile/edit';
import About from '../screens/main/profile/about'
import AboutJellyCoin from '../screens/main/profile/aboutcoin'
import ActivityWallet from '../screens/main/transfercoin/activitywallet';
import TransferUserList from '../screens/main/transfercoin/transferuserlist';
import TransferCoin from '../screens/main/transfercoin/transfercoin';
import TransferCoinQR from '../screens/main/transfercoin/transfercoinqr';
import RequestUserList from '../screens/main/transfercoin/requestuserlist';
import RequestCoin from '../screens/main/transfercoin/requestcoin';
import GeneralQR from '../screens/main/transfercoin/generateqr';
import ScanQRCode from '../screens/main/transfercoin/scanqrcode';
import OthersProfile from '../screens/main/profile/othersProfile';
import TransportCancel from '../screens/main/profile/cancelTransport';
import ChangePasswordScreen from '../screens/main/profile/changePassword';

import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import colors from '../constants/colors';


const RootNavigator = () => {

    const AppStack = createStackNavigator();
    const HomeTabs = createBottomTabNavigator();

    const HomeStack = createStackNavigator();
    const BuscarStack = createStackNavigator();
    const SummaryStack = createStackNavigator();
    const WasteStack = createStackNavigator();
    const PendantsStack = createStackNavigator();
    const ProfileStack = createStackNavigator();
    
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const isSeeSplash = useSelector(state => state.isSeeSplash);


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
    const BuscarNavigator = () => {
        return (
            <BuscarStack.Navigator>
                <BuscarStack.Screen name={'Buscar'} component={Buscar} options={setProfileHeaderOptions('Buscar')} />
                <HomeStack.Screen name={'OthersProfile'} component={OthersProfile} options={setProfileHeaderOptions('Ver perfil')} />
            </BuscarStack.Navigator>
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
                <WasteStack.Screen name={'RegisterConfirmation'} component={RegisterConfirmationScreen} options={{ headerShown: false }} />
                <WasteStack.Screen name={'Congratulations'} component={CongratulationsScreen} options={{ headerShown: false }} />
                <WasteStack.Screen name={'PickWasteToTransport'} component={PickWasteToTransportScreen} options={setProfileHeaderOptions('Elija los Residuos')} />
                <WasteStack.Screen name={'PickTransportDestiny'} component={PickTransportDestinyScreen} options={setProfileHeaderOptions('Elija el destino')} />
                <WasteStack.Screen name={'VerifyTransportInfo'} component={VerifyTransportInfoScreen} options={setProfileHeaderOptions('Verificar información')} />
                <WasteStack.Screen name={'TransportInEvaluation'} component={TransportInEvaluationScreen} options={{ headerShown: false }} />
                <WasteStack.Screen name={'Pendants'} component={PendantsScreen} options={setProfileHeaderOptions('Pendientes')} />
            </WasteStack.Navigator>
        );
    };

    const SummaryNavigator = () => {
        return (
            <SummaryStack.Navigator>
                <SummaryStack.Screen name={'Summary'} component={SummaryScreen} options={setProfileHeaderOptions('Mi Actividad')} />
                <SummaryStack.Screen name={'ManageWaste'} component={ManageWasteScreen} options={setProfileHeaderOptions('Elija los Residuos')} />
            </SummaryStack.Navigator>
        );
    };

    const PendantsNavigator = () => {
        return (
            <PendantsStack.Navigator>
                {/* <PendantsStack.Screen name={'Pendants'} component={PendantsScreen} options={setProfileHeaderOptions('Pendientes')} /> */}
                {/* <PendantsStack.Screen name={'Cancel Transport'} component={TransportCancel} options={setProfileHeaderOptions('Cancelar transporte')} /> */}
                <PendantsStack.Screen name={'ActivityWallet'} component={ActivityWallet} options={setProfileHeaderOptions('Movimientos')} />
                <PendantsStack.Screen name={'TransferUserList'} component={TransferUserList} options={setProfileHeaderOptions('A quién enviar?')} />
                <PendantsStack.Screen name={'TransferCoin'} component={TransferCoin} options={setProfileHeaderOptions('Cuánto quieres enviar?')} />
                <PendantsStack.Screen name={'RequestUserList'} component={RequestUserList} options={setProfileHeaderOptions('A quién solicitar?')} />
                <PendantsStack.Screen name={'RequestCoin'} component={RequestCoin} options={setProfileHeaderOptions('Cuánto quieres recibir?')} />
                <PendantsStack.Screen name={'GeneralQR'} component={GeneralQR} options={setProfileHeaderOptions('Compartir')} />
                <PendantsStack.Screen name={'ScanQRCode'} component={ScanQRCode} options={setProfileHeaderOptions('ScanQRCode')} />
                <PendantsStack.Screen name={'TransferCoinQR'} component={TransferCoinQR} options={setProfileHeaderOptions('Cuánto quieres enviar?')} />
                
            </PendantsStack.Navigator>
        );
    };

    const ProfileNavigator = () => {
        return (
            <ProfileStack.Navigator>
                <ProfileStack.Screen name={'Index'} component={ProfileScreen} options={setProfileHeaderOptions('Perfil')} />
                <ProfileStack.Screen name={'ChangePassword'} component={ChangePasswordScreen} options={{ headerShown: false }} />
                <ProfileStack.Screen name={'EditProfile'} component={EditProfile} options={setProfileHeaderOptions('Editar perfil')} />
                <ProfileStack.Screen name={'ManageWaste'} component={ManageWasteScreen} options={setProfileHeaderOptions('Elija los Residuos')} />                
                <ProfileStack.Screen name={'OthersProfile'} component={OthersProfile} options={setProfileHeaderOptions('Ver perfil')} />
                <ProfileStack.Screen name={'ActivityWallet'} component={ActivityWallet} options={setProfileHeaderOptions('Movimientos')} />
                <ProfileStack.Screen name={'TransferUserList'} component={TransferUserList} options={setProfileHeaderOptions('A quién enviar?')} />
                <ProfileStack.Screen name={'TransferCoin'} component={TransferCoin} options={setProfileHeaderOptions('Cuánto quieres enviar?')} />
                <ProfileStack.Screen name={'About'} component={About} options={setProfileHeaderOptions('Acerca de')} />
                <ProfileStack.Screen name={'AboutJellyCoin'} component={AboutJellyCoin} options={setProfileHeaderOptions('jellyCoin')} />
                <ProfileStack.Screen name={'CancelTransport'} component={TransportCancel} options={setProfileHeaderOptions('Cancelar transporte')} />
            </ProfileStack.Navigator>
        );
    };

    const homeTabsNavigator = () => {
        return (
            <HomeTabs.Navigator tabBarOptions={{
                showLabel: true,
                activeTintColor: colors.colmenaGreen,
            }}>
                <HomeTabs.Screen
                    name={'Home'}
                    component={HomeNavigator}
                    options={{
                        unmountOnBlur: true,
                        tabBarLabel: 'Inicio',
                        tabBarIcon: ({ color, size }) => (
                            <View style={{ paddingTop: 8 }}>
                                <Feather name="home" color={color} size={size-2} />
                            </View>
                        ),
                    }}
                />
                <HomeTabs.Screen
                    name={'Buscar'}
                    component={BuscarNavigator}
                    options={{
                        unmountOnBlur: true,
                        tabBarLabel: 'Buscar',
                        tabBarIcon: ({ color, size }) => (
                            <View style={{ paddingTop: 8 }}>
                                <AntDesign name="search1" color={color} size={size-2} />
                            </View>
                        ),
                    }}
                />
                <HomeTabs.Screen
                    name={'Waste'}
                    component={WasteNavigator}
                    options={{
                        unmountOnBlur: true,
                        tabBarLabel: 'Acciones',
                        tabBarIcon: ({ color, size }) => (
                            <View style={{ paddingTop: 8 }}>
                                {/* <FontAwesome name="recycle" color={color} size={size} /> */}
                                <Image
                                    style={{width:40, height:40}}
                                    source={require('../../assets/add.png')}
                                />
                            </View>
                        ),
                    }}
                />
                <HomeTabs.Screen
                    name={'Pendants'}
                    component={PendantsNavigator}
                    // options={setProfileHeaderOptions('Pendientes')}
                    options={{
                        unmountOnBlur: true,
                        tabBarLabel: 'JellyCoins',
                        tabBarIcon: ({ color, size }) => (
                            <View style={{ paddingTop: 8 }}>
                                <Image
                                    style={{width:30, height:30}}
                                    source={require('../../assets/coleman.png')}
                                />
                            </View>
                        ),
                    }}
                />
                <HomeTabs.Screen
                    name={'User'}
                    component={ProfileNavigator}
                    options={{
                        unmountOnBlur: true,
                        tabBarLabel: 'Perfil',
                        tabBarIcon: ({ color, size }) => (
                            <View style={{ paddingTop: 8 }}>
                                <FontAwesome name="user-o" color={color} size={size-2} />
                            </View>
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
                        {isSeeSplash ?
                            <>
                                <AppStack.Screen name={'App'} component={homeTabsNavigator} options={{ headerShown: false }} />
                            </>
                            :
                            <>
                                <AppStack.Screen name={'SplashHome'} component={SplashHome} options={{ headerShown: false }} />
                                <AppStack.Screen name={'SplashFirst'} component={SplashFirst} options={{ headerShown: false }} />
                                <AppStack.Screen name={'SplashSecond'} component={SplashSecond} options={{ headerShown: false }} />
                                <AppStack.Screen name={'SplashEnd'} component={SplashEnd} options={{ headerShown: false }} />
                            </>
                        }
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