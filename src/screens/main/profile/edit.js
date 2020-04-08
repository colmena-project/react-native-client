import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Parse } from 'parse/react-native';
import Input from '../../../components/form/Input';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../../../styles/colors';
import stylesCommon from '../../../styles/waste';
import validate from '../../../utils/Validate';

const EditProfile = props => {

    const fields = {
        firstName: '',
        lastName: '',
        nickname: '',
        email: '',
        aboutMe: '',
        address: ''
    };

    const [inputs, setInputs] = useState(fields);
    const [errorMessages, setErrorMessages] = useState(fields);
    const [userAccount, setUserAccount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const account = await Parse.Cloud.run("getMyAccount");
            setUserAccount(account);
            setInputs({
                firstName: account.firstName,
                lastName: account.lastName,
                nickname: account.nickname,
                email: account.createdBy.get('email'),
                aboutMe: account.aboutMe,
            });
            setIsLoading(false);
        } catch (err) {
            console.log('Error!! ' + err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const hasErrors = errors => {
        for (item in errors) {
            if (errors[item] !== null) {
                console.log(item + ' => ' + errors[item]);
                return true;
            }
        }
        return false;
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

    const handleBackButton = () => {
        props.navigation.goBack();
    };

    const handleChangePassword = () => {
        Parse.User.requestPasswordReset(inputs.email)
            .then(() => {
                setIsLoading(false);
                Alert.alert('Cambio de contraseña.', 'Se envió un link a su correo, con las instrucciones para cambiar su contraseña.');
            }).catch((error) => {
                setIsLoading(false);
                alert("Error: " + error.code + " " + error.message);
            });
    };

    const handleSaveButton = async () => {
        try {
            let errors = { ...errorMessages };
            for (asd in inputs) {
                errors[asd] = validate(asd, inputs[asd]);
                setErrorMessages(errors);
            }
            if (hasErrors(errors)) {
                Alert.alert('', 'Revise los datos!');
            } else {
                const parseAccount = await new Parse.Query('Account').get(userAccount.objectId);
                parseAccount.set('firstName', inputs.firstName);
                parseAccount.set('lastName', inputs.lastName);
                parseAccount.set('nickname', inputs.nickname);
                parseAccount.set('aboutMe', inputs.aboutMe);
                await parseAccount.save();
                Alert.alert('', 'Datos guardados!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.colmenaBackground }}>
            {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                <ScrollView style={stylesCommon.scrollView}>
                    <View style={styles.headerIcons}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons onPress={handleBackButton} name={'md-arrow-back'} size={22} color={colors.colmenaGrey} />
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ ...stylesCommon.brandText, fontSize: 24, paddingLeft: 10 }}>
                                    Editar perfil
                                </Text>
                            </View>
                        </View>
                        <View style={styles.saveIcon}>
                            <Ionicons onPress={handleSaveButton} name={'md-checkmark'} size={26} color={colors.colmenaGreen} />
                        </View>
                    </View>
                    <View style={{ marginBottom: 120, }}>
                        <View style={{ alignItems: 'center', marginTop: 40, }}>
                            <Avatar
                                size={120}
                                rounded
                                icon={{ name: 'user', type: 'font-awesome' }}
                                onPress={() => console.log('Subir foto...')}
                                activeOpacity={0.5}
                                showEditButton
                            />
                        </View>
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
                        <Input
                            label={'Apellidos/s'}
                            style={styles.input}
                            blurOnSubmit
                            keyboardType={'default'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            value={inputs.lastName}
                            error={errorMessages.lastName}
                            onChangeText={value => handleInput('lastName', value)}
                        />
                        <Input
                            label={'Usuario'}
                            style={styles.input}
                            blurOnSubmit
                            keyboardType={'default'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            value={inputs.nickname}
                            error={errorMessages.nickname}
                            onChangeText={value => handleInput('nickname', value)}
                        />
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
                        <Input
                            label={'Bio'}
                            style={styles.input}
                            blurOnSubmit
                            keyboardType={'default'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            value={inputs.aboutMe}
                            error={errorMessages.aboutMe}
                            onChangeText={value => handleInput('aboutMe', value)}
                        />
                        <Input
                            label={'Dirección'}
                            style={styles.input}
                            blurOnSubmit
                            keyboardType={'default'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            value={inputs.address}
                            error={errorMessages.address}
                            onChangeText={value => handleInput('address', value)}
                        />
                        <TouchableOpacity onPress={handleChangePassword} style={styles.changePassword}>
                            <Text>Cambiar contraseña</Text>
                            <MaterialIcons name={'chevron-right'} size={36} color={colors.colmenaGreen} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        flex: 2,
    },
    scrollView: {
        flex: 1,
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        textAlign: 'center',
    },
    saveIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 34,
        height: 34,
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
    }
});

export default EditProfile;