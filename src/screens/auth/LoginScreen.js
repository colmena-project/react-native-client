import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, Alert, ScrollView, ActivityIndicator, Button, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import { setLoggedIn } from "../../redux/auth/actions";
import Parse from 'parse/react-native';
import validate from '../../services/Validate';
import Installation from '../../services/Installation';
import colors from '../../constants/colors';
import Input from '../../components/form/Input';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen = props => {

    const fields = {
        email: '',
        password: '',
    };

    const checkIfLoggedIn = async () => {
        const user = await Parse.User.currentAsync();
        if (user) {
            dispatch(setLoggedIn(true));
        }
    };

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    const [inputs, setInputs] = useState(fields);
    const [errorMessages, setErrorMessages] = useState(fields);
    const [isLoading, setIsloading] = useState(false);
    const dispatch = useDispatch();

    const checkErrors = () => {
        const errors = { ...errorMessages };
        for (item in errors) {
            if ((errors[item]) !== null) {
                console.log(item + ' => ' + errors[item]);
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

    const resetFields = () => {
        setInputs(fields);
    };

    const handlePressRegister = () => {
        props.navigation.navigate('TnC')
    };

    const handleForgotPassword = () => {
        props.navigation.navigate('ForgotPassword');
    };

    const handleResetPassword = () => {
        props.navigation.navigate('ForgotPassword');
    }

    const handleRegisterLink = () => {
        props.navigation.navigate('Register');
    }

    const handleLoginWithFacebookExpo = () => {
        console.log('expo facebook login');
    }

    const handleLogin = async () => {
        setIsloading(true);
        try {
            await Parse.User.logIn(inputs.email, inputs.password);
            await Installation.setInstallation(inputs.password);
            resetFields();
            setIsloading(false);
            dispatch(setLoggedIn(true));
        } catch (err) {
            setIsloading(false);
            console.log(err.message);
            Alert.alert('Login error:', err.message);
        }
    };

    return (
        <View style={styles.screen}>
            {isLoading === true ? <ActivityIndicator size={'large'} color={colors.colmenaGreen} /> :
                <ScrollView>
                    <View style={styles.container}>

                        <View style={styles.loginText}>
                            <View style={styles.colmenaHeaderTextContainer}>
                                <Text style={styles.colmenaHeaderText}>Ingresar</Text>
                            </View>
                            <View style={styles.colmenaHeaderIconContainer}>
                                <Image style={styles.colmenaHeaderIcon} source={require('../../../assets/colmena/icon.png')} />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.input}>
                                <Input
                                    label={'Email'}
                                    style={styles.input}
                                    blurOnSubmit
                                    keyboardType={'email-address'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={inputs.email}
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
                                    onChangeText={value => handleInput('password', value)}
                                />
                            </View>
                        </View>

                        <View style={styles.additionalContainer}>
                            <View style={styles.button}>
                                {/* <Button color={colors.colmenaGreen} title={'Ingresar'} onPress={handleLogin} /> */}
                                <TouchableOpacity style={{ backgroundColor: colors.colmenaGreen, padding: 10, borderRadius: 5 }} onPress={handleLogin}>
                                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Nunito-SemiBold'}}>INGRESAR</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.text}>
                                <Text style={styles.underlinedColoredText} onPress={handleResetPassword}>No recuerdas tu contraseña?</Text>
                            </View>
                        </View>

                        <View style={styles.additionalContainer}>
                            <View style={styles.text}>
                                <Text style={styles.textCenter}>Si aún no tienes cuenta <Text style={styles.underlinedColoredText} onPress={handleRegisterLink}>Registrate ahora</Text></Text>
                                {/* <Text style={styles.textCenter}>O ingresa utilizando tu cuenta de:</Text> */}
                            </View>
                            {/* <View style={styles.socialIconsContainer}>
                                <TouchableOpacity style={styles.facebookLoginBtn} onPress={handleLoginWithFacebookExpo}>
                                    <MaterialCommunityIcons style={styles.facebookLoginTextIcon} name={'facebook'} color={'white'} size={24} />
                                    <Text style={styles.facebookLoginText}>Facebook</Text>
                                </TouchableOpacity>
                            </View> */}
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
        width: '100%',
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
    },
    additionalContainer: {
        alignItems: 'center',
        paddingTop: 50,
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
        marginTop: 10
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

export default LoginScreen;