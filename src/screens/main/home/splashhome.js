import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Parse } from 'parse/react-native';
import Input from '../../../components/form/Input';
import ImagerPicker from '../../../components/form/ImagePicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapPicker from '../../../components/address/MapPicker';
import colors from '../../../constants/colors';
import validate from '../../../services/Validate';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import Moment from 'moment';
import AnimatedNumbers from 'react-native-animated-numbers';

const SplashHome = props => {
    return (
        <View style={{ flex: 1, backgroundColor: colors.colmenaBackground }}>
            <View style={{ height:200, backgroundColor: colors.colmenaBackground }}>
                <Image
                    source={require('../../../../assets/colmena_logo.png')}
                />
            </View>
            <View style={{ flex: 1, backgroundColor: colors.colmenaBackground }}>
                <Image
                    source={require('../../../../assets/colmena_logo.png')}
                />
            </View>
            <View>
                <View alignItems = {'center'}>
                    <Text style={{fontSize:22, fontFamily: 'Nunito-Regular'}}>Felicitaciones!</Text>
                </View>
                <View alignItems = {'center'}>
                    <Text style={{color: '#999999', fontSize:14, textAlign:'center', width:'80%', fontFamily: 'Nunito-Regular'}}>Te has registrado correctamente. Comenzá a registrar tus residuos</Text>
                </View>                
                <View flexDirection="row" width = "100%" style={{ padding: 20}} justifyContent="space-between">
                    <View flex ={1} alignItems = {'center'} style={{ padding: 10}}>
                        <TouchableOpacity >
                            <View>
                                <Text style={{ color: '#21BDA3', fontSize:15, fontFamily: 'Nunito-Regular'}}>Más tarde</Text>
                            </View>
                        </TouchableOpacity>                    
                    </View>
                    <View flex ={1} alignItems = {'center'} backgroundColor ={'#21BDA3'} style={{ padding: 10}}>
                        <TouchableOpacity>
                            <View>
                                <Text style={{ color: '#fff', fontSize:15 }}>Empezar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        </View>
    )
};

const styles = StyleSheet.create({
    scrollViewWrapper: {
        flex: 1,
        padding: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: colors.colmenaBackground,
    },
    scrollView: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 8,
        flex: 1,
    },
    activityIndicator: {
        flex: 1,
    },
    brand: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    brandText: {
        fontFamily: 'Montserrat-Medium',
        fontWeight: '300',
        fontSize: 26,
        color: colors.colmenaGrey,
        marginLeft: 30,
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputsContainer: {
        marginBottom: 30,
    },
    input: {
        flex: 1,
        textAlign: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    saveIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#e8e8e8',
    },
    changePassword: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        padding: 5,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#e8e8e8',
    },
    getCurrentPositionIcon: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 10,
    },
});

export default SplashHome;