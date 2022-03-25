import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image, TextInput} from 'react-native';
import { Parse } from 'parse/react-native';
import colors from '../../../constants/colors';


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
    const [inputs, setInputs] = useState(fields);
    const [isLoading, setIsLoading] = useState(false);
    const [valuestr, setValueStr] = useState("");
    const [description, setDescription] = useState("");
    // const oneuser = props.route.params.oneuser;
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            console.log("input data::")
            const parseAddress = new Parse.Query('Address');
            parseAddress.equalTo('default', true);
            const userAddress = await parseAddress.first();
            const parseAccount = await userAddress.get('account').fetch();
            if (parseAccount.get('avatar')) {
                // setUserProfilePhoto(parseAccount.get('avatar')._url);
            }
            setUserAccount(parseAccount);
            setInputs({
                ...inputs,
                firstName: parseAccount.get('firstName'),
                lastName: parseAccount.get('lastName'),
                nickname: parseAccount.get('nickname'),
                email: parseAccount.get('user').get('email'),
                aboutMe: parseAccount.get('aboutMe'),
                walletId: parseAccount.get('walletId'),
                avatar:parseAccount.get('avatar'),
                id:parseAccount.id
            });
            console.log("input data::", inputs)
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log('Error!! ' + err);
        }
    };

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
                        <View flex={1}>
                        </View>

                        <View flexDirection="row">
                            <Text style={{color:"#21BDA3",fontSize:70,fontFamily: 'Nunito-Regular'}}>500</Text>
                            <Text style={{color:"#21BDA3",fontSize:14,marginTop:15, fontFamily: 'Nunito-Regular'}}>JYC</Text>
                        </View>
                        <TouchableOpacity onPress={handleRequest}>
                            <View style={{backgroundColor:"#21BDA3", width:200,paddingStart:60, paddingEnd:60, paddingTop:15, paddingBottom:15, borderRadius:10}}>
                                <Text style={{color:"#fff" , fontFamily: 'Nunito-Regular'}}>Generar QR</Text>
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