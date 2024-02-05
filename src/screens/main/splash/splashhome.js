import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, Alert, Image } from 'react-native';
import colors from '../../../constants/colors';
import { setSeeSplash } from '../../../redux/splash/actions';

const SplashHome = props => {
    const dispatch = useDispatch();
    const handleHome = () => {
        dispatch(setSeeSplash(true));
    };
    const handleFirst = () => {
        props.navigation.navigate('SplashFirst');
    };
    return (
        <View style={{ flex: 1, backgroundColor: colors.colmenaBackground }}>
            <View style={{marginTop:50,height:80, backgroundColor: colors.colmenaBackground}} alignItems={'center'}>
                <Image style={{ width:"50%", height:80, resizeMode:'contain'}}
                    source={require('../../../../assets/colmena_logo.png')}
                />
            </View>
            <View alignItems={'center'} style={{ flex: 1, backgroundColor: colors.colmenaBackground }}>
                <Image style={{ width:"80%",height:Dimensions.get('window').height-250, resizeMode:'contain'}}
                    source={require('../../../../assets/splash/splash1.png')}
                />
            </View>
            <View style={{height:150, backgroundColor: colors.colmenaBackground}}>
                <View alignItems = {'center'}>
                    <Text style={{fontSize:22, fontFamily: 'Nunito-Regular'}}>Felicitaciones!</Text>
                </View>
                <View alignItems = {'center'}>
                    <Text style={{color: '#999999', fontSize:14, textAlign:'center', width:'80%', fontFamily: 'Nunito-Regular'}}>Te has registrado correctamente. Comenzá a registrar tus residuos</Text>
                </View>                
                <View flexDirection="row" width = "100%" style={{ padding: 20}} justifyContent="space-between">
                    <View flex ={1} alignItems = {'center'} style={{ padding: 10}}>
                        <TouchableOpacity onPress={handleHome}>
                            <View>
                                <Text style={{ color: '#21BDA3', fontSize:15, fontFamily: 'Nunito-Regular'}}>Más tarde</Text>
                            </View>
                        </TouchableOpacity>                    
                    </View>
                    <View flex ={1} alignItems = {'center'} backgroundColor ={'#21BDA3'} style={{ padding: 10}}>
                        <TouchableOpacity onPress={handleFirst}>
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