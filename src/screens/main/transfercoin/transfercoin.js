import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image, TextInput, ToastAndroid, AsyncStorage} from 'react-native';
import { Parse } from 'parse/react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../constants/colors';
import ecc from 'eosjs-ecc-rn';
import { Buffer } from 'buffer';
import DialogInput from 'react-native-dialog-input';

const {encode, decode} = require("fastestsmallesttextencoderdecoder");
const {Serialize} = require('eosjs');

const TransferCoin = props => {
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
    const [codeinput,setCodeInput] = useState(false);
    const [valuestr, setValueStr] = useState("");
    const [description, setDescription] = useState("");
    const [tokenkey, setTokenKey] = useState("");
    const oneuser = props.route.params.oneuser;
    
    useEffect(() => {
        fetchData();
        AsyncStorage.getItem('privatekey').then(
            (value) =>{
                if(value){
                    setTokenKey(value)
                }else{
                    setTokenKey("")
                }
            }            
        );
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

    const refreshKey = async () =>{
        // Alert.alert('CONFIRME SU EMAIL', 'Hemos enviado un email a su cuenta con el vínculo para confirmarlo.\nSu ID de token es :: ' + "123123123sdfsdfsdf" +"\nDeberías recordar esta clave.");
        console.log(inputs.walletId);
        fetch('https://api.sandbox.circularnetwork.io/v1/project/JYC/users/'+inputs.walletId+'/changekey', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((json) => {
            console.log(json);
        })
        .catch((error) =>{
            console.error(error);
        });
        setCodeInput(true);
    }

    const onSetPrivatekey = async (inputText) =>{
        setCodeValue(inputText);
        console.log(inputText);
        let private_Key = "";
        let public_key = "";
        await ecc.randomKey().then(privateKey => {
            console.log('Private Key:\t', privateKey) // wif
            console.log('Public Key:\t', ecc.privateToPublic(privateKey)) // EOSkey...
            private_Key = privateKey;
            public_key = ecc.privateToPublic(privateKey);
            })
        console.log(private_Key);
        fetch('https://api.sandbox.circularnetwork.io/v1/project/JYC/users/'+inputs.walletId+'/changekey', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pubkey: public_key,
                account: inputs.walletId,
                code: inputText,                
            })
        })
        .then((response) => response.json())
        .then((json) => {
            setCodeInput(false);
            console.log(json);
            setTokenKey(private_Key);
            AsyncStorage.setItem('privatekey', private_Key);
        })
        .catch((error) =>{
            ToastAndroid.show('Hintkey is not correct!', ToastAndroid.LONG);
            setCodeInput(false);
            console.error(error);
        });

    }

    const handleTransfer = async () => {
        if(tokenkey.trim() != ""){
            if(description.trim() != ""){
                setIsLoading(true);
                fetch('https://api.sandbox.circularnetwork.io/v1/project/JYC/users/'+ inputs.walletId)
                .then((response) => response.json())
                .then((json) => {
                    const result = json.result;
                    let sb = new Serialize.SerialBuffer({textEncoder:encode, textDecoder:decode});
                    let value_str = Number.parseFloat(valuestr).toFixed(2)
        
                    console.log('toaccount::::::::',  tokenkey);
                    console.log('toaccount::::::::',  inputs.walletId);
                    console.log('toaccount::::::::',  oneuser.walletId);
                    console.log('toaccount::::::::',  value_str +" JYC");
                    console.log('toaccount::::::::',  description);
                    console.log('toaccount::::::::',  result.last_seq_num);
        
                    sb.pushName(inputs.walletId);
                    sb.pushName(oneuser.walletId);
                    sb.pushAsset(value_str +" JYC");
                    sb.pushString(description);
                    sb.pushNumberAsUint64(result.last_seq_num);
                    sb.pushNumberAsUint64(1);
                    let buff = Buffer.from(sb.asUint8Array());
                    let signature = ecc.sign(buff, tokenkey);
        
                    fetch('https://api.sandbox.circularnetwork.io/v1/project/JYC/transfer', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            from : inputs.walletId,
                            to : oneuser.walletId,
                            amount : value_str +" JYC",
                            signature : signature,
                            account_type : 'INTERNAL',
                            memo: description
                        })
                    })
                    .then((response) => response.json())
                    .then((json) => {
                        ToastAndroid.show('La transferencia de monedas se ha realizado correctamente!', ToastAndroid.LONG);
                        console.log(json);
                        setIsLoading(false);
                    })
                    .catch((error) =>{
                        ToastAndroid.show('Compruebe los valores de entrada!', ToastAndroid.LONG);
                        setIsLoading(false);
                        console.error(error);
                    });
                })
                .catch((error) =>{
                    setIsLoading(false);
                    console.error(error);
                });
            }else{
                ToastAndroid.show('Introduzca la descripción.', ToastAndroid.LONG);
            }
            
        }else{
            ToastAndroid.show('Ingrese la clave privada, si la olvidó, actualice la nueva clave.', ToastAndroid.SHORT);
        }            
    };

    return (
            <View style={{ height:"100%",width:"100%",  backgroundColor: colors.colmenaBackground }}>
                {isLoading === true ? <ActivityIndicator style={{ marginTop: 50 }} size={'large'} color={colors.colmenaGreen} /> :              
                    <View style={{margin:15}} flex={1} alignItems="center">
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
                        <View style={{maxWidth:"70%", marginTop:20}}>
                            <TextInput
                                style={{color:"#999", fontFamily: 'Nunito-Regular'}}
                                onChangeText={text => setDescription(text) }
                                value={description}
                                placeholder="Motivo"
                                textAlign="center"/>
                            <View flexDirection="row" justifyContent="space-between">
                                <View/>
                                <TextInput
                                    style={{color:"#999", maxWidth:200, fontFamily: 'Nunito-Regular'}}
                                    onChangeText={text => setTokenKey(text) }
                                    value={tokenkey}
                                    placeholder="Token de entrada"
                                    textAlign="center"/>
                                <Ionicons name="md-refresh" size={24} style={{marginLeft:10}} onPress={refreshKey}/>
                                <View/>
                            </View>                            
                        </View>
                        <TouchableOpacity onPress={handleTransfer}>
                            <View style={{backgroundColor:"#21BDA3", width:185,paddingStart:60, paddingEnd:60, paddingTop:15, paddingBottom:15, borderRadius:10, marginTop:10}}>
                                <Text style={{color:"#fff" , fontFamily: 'Nunito-Regular'}}>Continuar</Text>
                            </View>
                        </TouchableOpacity>
                        {/* {codeinput && */}
                            <DialogInput isDialogVisible={codeinput}
                                title={"Código de verificación"}
                                message={"Puede obtener el código de verificación por correo"}
                                hintInput ={"ENTRADA DE SUGERENCIA"}
                                submitInput={ (inputText) => onSetPrivatekey(inputText)}
                                closeDialog={ () => {setCodeInput(false)}}
                                >
                            </DialogInput>
                            {/* } */}
                    </View>
                }
                
            </View>      
    );
};

export default TransferCoin;