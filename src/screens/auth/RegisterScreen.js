import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, Button, ScrollView, Alert, ActivityIndicator } from 'react-native'
import Parse from 'parse/react-native';
import { useDispatch } from 'react-redux';
import Input from '../../components/form/Input';
import validate from '../../services/Validate';
import colors from '../../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slugify from 'slugify';
import ecc from 'eosjs-ecc-rn';
import { Buffer } from 'buffer'

const RegisterScreen = props => {

    const fields = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        street: '',
        city: '',
        state: '',
        country: '',
        addressDescription: '',
        coords: { latitude: -27.3715333, longitude: -55.9170078 },
        password: '',
        passwordConfirm: ''
    };
    const [inputs, setInputs] = useState(fields);
    const [walletid, setWalletID] = useState("");
    const [errorMessages, setErrorMessages] = useState(fields);
    const [isLoading, setIsloading] = useState(false);
    const dispatch = useDispatch();

    const checkErrors = errors => {
        for (let item in errors) {
            if (errors[item] !== null) {
                throw { message: 'Revise los datos!' };
            }
        }
    };

    const handleError = (field, value) => {
        const errors = { ...errorMessages };
        errors[field] = validate(field, value);
        setErrorMessages(errors);
    };

    const handleField = (field, value) => {
        const updateData = { ...inputs };
        updateData[field] = value;
        setInputs(updateData);
    };

    const handleInput = (field, value) => {
        handleError(field, value);
        handleField(field, value);
    };

    const handlePasswordConfirm = (field, value) => {
        const errors = { ...errorMessages };
        if (value != inputs.password) {
            errors[field] = 'Las contraseñas deben coincidir';
        } else {
            errors[field] = '';
        }
        setErrorMessages(errors);
        handleField(field, value);
    };

    const resetFields = () => {
        setInputs(fields);
    };

    const handleRegister = async () => {
        setIsloading(true);
        await Parse.User.currentAsync().then(async user => {
            if (user) {
                await Parse.User.logOut();
            }
        });
        checkErrors();
        
        let private_Key = "";
        let public_key = "";
        let eosuserid = "";
        await ecc.randomKey().then(privateKey => {
            console.log('Private Key:\t', privateKey) // wif
            console.log('Public Key:\t', ecc.privateToPublic(privateKey)) // EOSkey...
            private_Key = privateKey;
            public_key = ecc.privateToPublic(privateKey);
            })
        console.log(private_Key);
        fetch('https://api.sandbox.circularnetwork.io/v1/project/JYC/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pubkey: public_key,
                data: {
                name : inputs.firstName,
                lastname : inputs.lastName,
                email : inputs.email
                }
            })
        })
        .then((response) => response.json())
        .then((json) => {
            eosuserid = json.userid;
            console.log(eosuserid);
            if(eosuserid === undefined){
                setIsloading(false);
            }else{
                setWalletID(eosuserid);
                handleRegisterAccount(eosuserid)
            }
        })
        .catch((error) =>{
            setIsloading(false);
            console.error(error);
        });
    };

    const handleRegisterAccount = async (wallet_id) => {
        console.log("walletid", wallet_id);
        try {            
            const latLng = new Parse.GeoPoint({ latitude: -27.3715333, longitude: -55.9170078 });
            console.log(latLng);
            const params = {
                email: inputs.email,
                password: inputs.password,
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                username: Slugify(`${inputs.firstName.charAt(0)} ${inputs.lastName}`, '_').toLowerCase(),
                walletId: wallet_id,
                defaultLanguage: 'es-AR',
                address: {
                    street: 'Test Street',
                    city: 'Test City',
                    state: 'Test State',
                    country: 'Test Country',
                    description: 'Test description',
                    latLng
                }
            };
            await Parse.Cloud.run('createAccount', params);
            Alert.alert('CONFIRME SU EMAIL', 'Hemos enviado un email a su cuenta con el vínculo para confirmarlo.');
            props.navigation.navigate('Login');
            setIsloading(false);
        } catch (error) {
            setIsloading(false);
            console.log("Error: " + error.code + " " + error.message);
            Alert.alert(error.message);
        }
    }


    return (
        <View style={styles.screen}>
            {isLoading === true ? <ActivityIndicator size={'large'} color={colors.colmenaGreen} /> :
                <ScrollView>
                    <View style={styles.container}>

                        <View style={styles.loginText}>
                            <View style={styles.colmenaHeaderTextContainer}>
                                <Text style={styles.colmenaHeaderText}>Registrarse</Text>
                            </View>
                            <View style={styles.colmenaHeaderIconContainer}>
                                <Image style={styles.colmenaHeaderIcon} source={require('../../../assets/colmena/icon.png')} />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            {/* <View style={styles.input}>
                                <Input
                                    label={'Usuario'}
                                    style={styles.input}
                                    blurOnSubmit
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={inputs.username}
                                    onChangeText={value => setUsername(value)}
                                />
                            </View> */}
                            <View style={styles.input}>
                                <Input
                                    label={'Nombre/s'}
                                    style={styles.input}
                                    blurOnSubmit
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={inputs.firstName}
                                    error={errorMessages.firstName}
                                    onChangeText={value => handleInput('firstName', value)}
                                />
                            </View>
                            <View style={styles.input}>
                                <Input
                                    label={'Apellido/s'}
                                    style={styles.input}
                                    blurOnSubmit
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={inputs.lastName}
                                    error={errorMessages.lastName}
                                    onChangeText={value => handleInput('lastName', value)}
                                />
                            </View>
                            <View style={styles.input}>
                                <Input
                                    label={'Email'}
                                    style={styles.input}
                                    blurOnSubmit
                                    keyboardType={'email-address'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={inputs.email}
                                    error={errorMessages.email}
                                    onChangeText={value => handleInput('email', value)}
                                />
                            </View>
                            <View style={styles.input}>
                                <Input
                                    label={'Contraseña'}
                                    style={styles.input}
                                    blurOnSubmit
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    secureTextEntry
                                    value={inputs.password}
                                    error={errorMessages.password}
                                    onChangeText={value => handleInput('password', value)}
                                />
                            </View>

                            <View style={styles.input}>
                                <Input
                                    label={'Confirmar contraseña'}
                                    style={styles.input}
                                    blurOnSubmit
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    secureTextEntry
                                    value={inputs.confirmPassword}
                                    error={errorMessages.confirmPassword}
                                    onChangeText={value => handlePasswordConfirm('confirmPassword', value)}
                                />
                            </View>

                        </View>

                        <View style={styles.additionalContainer}>
                            <View style={styles.button}>
                                {/* <Button color={colors.colmenaGreen} title={'Registrarme'} onPress={handleRegister} /> */}
                                <TouchableOpacity style={{ backgroundColor: colors.colmenaGreen, padding: 10, borderRadius: 5 }} onPress={handleRegister}>
                                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Nunito-SemiBold' }}>REGISTRARME</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.additionalContainer}>
                            <View style={styles.text}>
                                <Text style={styles.textCenter}>O ingresa utilizando tu cuenta de:</Text>
                            </View>
                            <View style={styles.socialIconsContainer}>
                                <TouchableOpacity style={styles.facebookLoginBtn} onPress={() => { }}>
                                    <MaterialCommunityIcons style={styles.facebookLoginTextIcon} name={'facebook'} color={'white'} size={24} />
                                    <Text style={styles.facebookLoginText}>Facebook</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        margin: '7.5%',
    },
    loginText: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: 30,
    },
    additionalContainer: {
        alignItems: 'center',
        paddingTop: 40,
    },
    input: {
        width: '100%',
    },
    btnContainer: {
        marginVertical: 2,
    },
    button: {
        width: 400,
        maxWidth: '100%',
        marginBottom: 20,
    },
    text: {
        width: '100%',
        marginVertical: 10,
    },
    textCenter: {
        textAlign: 'center',
        color: colors.greyText
    },
    underlinedColoredText: {
        textAlign: 'center',
        color: colors.colmenaGreen,
        textDecorationLine: 'underline'
    },
    colmenaHeaderTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    colmenaHeaderText: {
        fontSize: 30,
        color: colors.colmenaGrey,
        fontFamily: 'Nunito-Regular'
    },
    colmenaHeaderIconContainer: {
        overflow: 'hidden',
    },
    colmenaHeaderIcon: {
        width: 55,
        height: 55
    },
    socialIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    facebookLoginBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        backgroundColor: colors.colmenaGreen,
        padding: 7,
        borderRadius: 3
    },
    facebookLoginText: {
        fontFamily: 'Nunito-Bold',
        color: 'white',
        fontSize: 16
    }
});

export default RegisterScreen;