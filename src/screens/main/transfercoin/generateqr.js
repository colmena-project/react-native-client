import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image, TextInput} from 'react-native';
import { Parse } from 'parse/react-native';
import colors from '../../../constants/colors';
import SvgQRCode from 'react-native-qrcode-svg';
import { QRCode} from 'react-native-custom-qr-codes-expo';


const GeneralQR = props => {
    const fields = {
        firstName: '',
        lastName: '',
        nickname: '',
        email: '',
        aboutMe: '',       
        walletId: '',
        avatar: '',
        id: '',
    };
    const [isLoading, setIsLoading] = useState(false);
    const parsedata = props.route.params.parse_data;

    const handleRequest = () => {            
    };

    return (
            <View style={{ height:"100%",width:"100%",  backgroundColor: colors.colmenaBackground }}>
                {isLoading === true ? <ActivityIndicator style={{ marginTop: 50 }} size={'large'} color={colors.colmenaGreen} /> :
                    <View style={{margin:15}} flex={1} alignItems="center">
                        <View justifyContent="space-between">
                            <Text  style={{ color: '#000', fontSize:20, fontFamily: 'Mulish-Regular'}}>Muestre el código QR o comparta el link</Text>
                            <Text  style={{ color: '#000', fontSize:14, fontFamily: 'Mulish-Regular'}}>La persona que lo reciba te podrá enviar la cantidad de jellycoins de tu pedido</Text>
                        </View>
                        <View flex={1} justifyContent="center">
                            <QRCode logo={require('../../../../assets/coleman.png')} value = {parsedata} />
                        </View>

                        <View flexDirection="row">
                            <Text style={{color:"#21BDA3",fontSize:70,fontFamily: 'Nunito-Regular'}}>{parsedata.requestamount}</Text>
                            <Text style={{color:"#21BDA3",fontSize:14,marginTop:15, fontFamily: 'Nunito-Regular'}}>JYC</Text>
                        </View>
                        <TouchableOpacity onPress={handleRequest}>
                            <View style={{paddingStart:60, paddingEnd:60, paddingTop:15, paddingBottom:15, borderRadius:10}} flexDirection="row">
                                <Image style={{width:20, height:20, marginEnd:10}} source={require('../../../../assets/share.png')}/>
                                <Text style={{fontFamily: 'Nunito-Regular'}}>Compartir Link</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }                
            </View>      
    );
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

export default GeneralQR;