import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image, TextInput} from 'react-native';
import { Parse } from 'parse/react-native';
import colors from '../../../constants/colors';


const RequestCoin = props => {
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
    const [valuestr, setValueStr] = useState("0");
    const [description, setDescription] = useState("");
    const oneuser = props.route.params.oneuser;
    
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
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log('Error!! ' + err);
        }
    };

    const handleRequest = () => {
        let parse_data = {
            "firstname" : inputs.firstName,
            "lastname" : inputs.lastName,
            "nickname" : inputs.nickname,
            "email" : inputs.email,
            "walletid" : inputs.walletId,
            "userid" : inputs.id,
            "requestamount" : valuestr,
            "description" : description,
            "requestusername" : oneuser.nickname
            }
        props.navigation.navigate('GeneralQR', {parse_data});
    };

    return (
            <View style={{ height:"100%",width:"100%",  backgroundColor: colors.colmenaBackground }}>
                {isLoading === true ? <ActivityIndicator style={{ marginTop: 50 }} size={'large'} color={colors.colmenaGreen} /> :
                    <View style={{margin:15}} flex={1} alignItems="center">
                        <View justifyContent="space-between">
                            <Text  style={{ color: '#000', fontSize:16, fontFamily: 'Mulish-Regular'}}>El usuario que reciba el código QR verá esta información</Text>
                        </View>
                        <View flexDirection="row"> 
                            <TextInput
                                style={{color:"#21BDA3",fontSize:70, fontFamily: 'Nunito-Regular'}}
                                onChangeText={text => setValueStr(text) }
                                value={valuestr}
                                placeholder="0"
                                placeholderTextColor = "#21BDA3"
                                keyboardType="numeric"
                            />
                            <Text style={{color:"#21BDA3",fontSize:14,marginTop:15, fontFamily: 'Nunito-Regular'}}>JYC</Text>
                        </View>
                        
                        <View style={{width:"70%", marginTop:20}}>
                            <TextInput
                                style={{color:"#999", width:"100%", fontFamily: 'Nunito-Regular'}}
                                onChangeText={text => setDescription(text) }
                                value={description}
                                placeholder="Motivo"
                                textAlign="center"/>
                            <View style={{height:2, backgroundColor:colors.colmenaGreen}}/>                     
                        </View>

                        <View flexDirection="row" style={{marginTop:10}}>
                            {oneuser.avatar ?
                                <Image
                                    style={{width:50, height: 50}}
                                    source={{uri: oneuser.avatar}}
                                    resizeMode="cover"
                                    borderRadius={100}
                                />
                                :
                                <Image
                                    style={{width:50, height: 50}}
                                    source={require('../../../../assets/user.png')}
                                    resizeMode="cover"
                                    borderRadius={100}
                                />
                            }
                            <View justifyContent="space-between">
                                <View/>
                                <Text style={{fontSize:16, marginLeft:5, fontFamily: 'Nunito-Regular'}}>{oneuser.nickname}</Text>
                                <View/>
                            </View>                        
                        </View>
                        
                        <TouchableOpacity style={{marginTop:50}} onPress={handleRequest}>
                            <View style={{backgroundColor:"#21BDA3", width:200,paddingStart:60, paddingEnd:60, paddingTop:15, paddingBottom:15, borderRadius:10}}>
                                <Text style={{color:"#fff" , fontFamily: 'Nunito-Regular'}}>Generar QR</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }                
            </View>      
    );
};

export default RequestCoin;