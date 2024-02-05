import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, Alert, Image } from 'react-native';
import colors from '../../../constants/colors';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const SplashSecond = props => {
    const handleSwipeLeft = () => {
        props.navigation.navigate('SplashEnd');
    };
    const handleSwipeRight = () => {
        props.navigation.navigate('SplashFirst');
    }; 
    return (
        <GestureRecognizer
            flex={1}
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleSwipeLeft}>
            <View style={{ flex: 1, backgroundColor: colors.colmenaBackground }}>
                <View style={{height:80, backgroundColor: colors.colmenaBackground}} alignItems={'center'}>
                    <Image style={{ width:"50%", height:80, resizeMode:'contain'}}
                        source={require('../../../../assets/colmena_logo.png')}
                    />
                </View>
                <View alignItems={'center'} style={{ flex: 1, backgroundColor: colors.colmenaBackground }}>
                    <Image style={{ width:"100%",height:Dimensions.get('window').height-250, resizeMode:'contain'}}
                        source={require('../../../../assets/splash/splash3.png')}
                    />
                </View>
                <View alignItems = {'center'} style={{height:150, backgroundColor: colors.colmenaBackground}}>
                    <View alignItems = {'center'}>
                        <Text style={{fontSize:22, fontFamily: 'Nunito-Regular'}}>Descubrí otros usuarios</Text>
                    </View>
                    <View alignItems = {'center'} style={{width:'80%'}}>
                        <Text style={{color: '#999999', fontSize:14, textAlign:'center', fontFamily: 'Nunito-Regular'}}>Conocé a los usuarios de Colmena cercanos a tu domicilio para coordinar actividades</Text>
                    </View>                
                    <View flexDirection="row" width = "40%" style={{ marginTop:20, height:3}} justifyContent="space-between">
                        <View flex ={1} alignItems = {'center'} backgroundColor ={'#999999'} style={{ padding: 1, marginRight:5}}>
                            <TouchableOpacity >
                                <View flex={1} style={{height:1}}/>
                            </TouchableOpacity>
                        </View>
                        <View flex ={3} alignItems = {'center'} backgroundColor ={'#21BDA3'} style={{ padding: 1, marginRight:5}}>
                            <TouchableOpacity >
                                <View flex={4}/>
                            </TouchableOpacity>
                        </View>
                        <View flex ={1} alignItems = {'center'} backgroundColor ={'#999999'} style={{ padding: 1}}>
                            <TouchableOpacity >
                                <View flex={4}/>
                            </TouchableOpacity>                    
                        </View>
                        
                    </View>
                </View>            
            </View>
        </GestureRecognizer>
        
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

export default SplashSecond;