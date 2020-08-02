import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Parse } from 'parse/react-native';
import Input from '../../../components/form/Input';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MapPicker from '../../../components/address/MapPicker';
import Geolocation from 'react-native-geolocation-service';
import ImagePicker from 'expo-image-picker';

import colors from '../../../constants/colors';
import validate from '../../../services/Validate';

import Feather from 'react-native-vector-icons/Feather';

const EditProfile = props => {

    const fields = {
        firstName: '',
        lastName: '',
        nickname: '',
        email: '',
        aboutMe: '',
        address: '',
        street: '',
        city: '',
        state: '',
        country: '',
        addressDescription: '',
        coords: { latitude: -27.3715333, longitude: -55.9170078 }
    };

    const [inputs, setInputs] = useState(fields);
    const [errorMessages, setErrorMessages] = useState(fields);
    const [userAccount, setUserAccount] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sourceImage, setSourceImage] = useState(null);

    props.navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={handleSaveButton}>
                <Feather name={'save'} color={'white'} size={26} />
            </TouchableOpacity>
        )
    });

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const parseAddress = new Parse.Query('Address');
            parseAddress.equalTo('default', true);
            const userAddress = await parseAddress.first();
            const parseAccount = await userAddress.get('account').fetch();
            setUserAccount(parseAccount);
            setUserAddress(userAddress);
            setInputs({
                ...inputs,
                firstName: parseAccount.get('firstName'),
                lastName: parseAccount.get('lastName'),
                nickname: parseAccount.get('nickname'),
                email: parseAccount.get('user').get('email'),
                aboutMe: parseAccount.get('aboutMe'),
                street: userAddress.get('street'),
                city: userAddress.get('city'),
                state: userAddress.get('state'),
                country: userAddress.get('country'),
                addressDescription: userAddress.get('description'),
                address: `${userAddress.get('street')}, ${userAddress.get('city')}, ${userAddress.get('state')}`,
                coords: userAddress.get('latLng').toJSON()
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
        for (const [key, value] of Object.entries(errors)) {
            if (errors[key] !== null) {
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

    const handleChangeAddress = async () => {
        try {
            const result = await Parse.Cloud.run("geocodeAddress", { address: inputs.address });
            const newCoords = { latitude: result.geocode.lat, longitude: result.geocode.lng };
            handleField('coords', newCoords);
        } catch (err) {
            console.log(err);
        }
    };

    const getAddressFromLatLng = async (latLng) => {
        try {
            const { address_components, formatted_address } = await Parse.Cloud.run("getAddress", { lat: latLng.latitude, lng: latLng.longitude });
            let calcStreet = undefined;
            let calcCity = undefined;
            let calcState = undefined;
            let calcCountry = undefined;
            let calcStreetNumber = undefined;
            address_components.forEach(field => {
                if (field.types[0] == 'route') {
                    calcStreet = field.long_name;
                };
                if (field.types[0] == 'street_number') {
                    calcStreetNumber = field.long_name;
                };
                if (field.types[0] == 'administrative_area_level_2') {
                    calcCity = field.long_name;
                };
                if (field.types[0] == 'locality') {
                    calcCity = field.long_name;
                };
                if (field.types[0] == 'administrative_area_level_1') {
                    calcState = field.long_name;
                };
                if (field.types[0] == 'country') {
                    calcCountry = field.long_name;
                };
            });
            setInputs({
                ...inputs,
                street: `${calcStreet} ${calcStreetNumber}`,
                city: calcCity,
                state: calcState,
                country: calcCountry,
                address: formatted_address,
                coords: latLng,
            });
        } catch (err) {
            console.log(err);
        }
    };

    // const getCurrentPosition = async () => {
    //     try {
    //         Geolocation.getCurrentPosition(value => getAddressFromLatLng(value.coords), error => console.log(error), { enableHighAccuracy: true, timeout: 5000 });
    //     } catch (ex) {
    //         console.log(ex);
    //     }
    // };

    const handleSaveButton = async () => {
        try {
            let errors = { ...errorMessages };
            for (const [key, value] of Object.entries(inputs)) {
                errors[key] = validate(value, inputs[key]);
                setErrorMessages(errors);
            }
            if (hasErrors(errors)) {
                Alert.alert('', 'Revise los datos!');
            } else {
                userAccount.set('firstName', inputs.firstName);
                userAccount.set('lastName', inputs.lastName);
                userAccount.set('nickname', inputs.nickname);
                userAccount.set('aboutMe', inputs.aboutMe);
                userAddress.set('street', inputs.street);
                userAddress.set('city', inputs.city);
                userAddress.set('state', inputs.state);
                userAddress.set('country', inputs.country);
                userAddress.set('description', inputs.addressDescription);
                userAddress.set('latLng', new Parse.GeoPoint(inputs.coords));
                await Parse.Object.saveAll([userAccount, userAddress]);
                Alert.alert('', 'Datos guardados!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const options = {
        title: 'Nuevo avatar',
        takePhotoButtonTitle: 'Tomar foto',
        chooseFromLibraryButtonTitle: 'Seleccionar desde galería',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    // const showImagePicker = () => {
    //     ImagePicker.showImagePicker(options, async (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         } else {
    //             try {
    //                 const avatarImage = new Parse.File(response.fileName, { base64: response.data });
    //                 console.log(response.fileName);
    //                 userAccount.set('avatar', avatarImage);
    //                 await userAccount.save();
    //             } catch (ex) {
    //                 console.log(ex);
    //             }
    //         }
    //     });
    // };

    return (
        <View style={{ flex: 1, backgroundColor: colors.colmenaBackground }}>
            {isLoading ? <ActivityIndicator style={styles.activityIndicator} size={'large'} color={colors.colmenaGreen} /> :
                <ScrollView style={{
                    paddingHorizontal: 15,
                    paddingTop: 8,
                    flex: 1,
                }}>
                    <View style={styles.inputsContainer}>
                        <View style={styles.avatarContainer}>
                            {!(userAccount && userAccount.get('avatar')) ?
                                <Avatar
                                    size={120}
                                    rounded
                                    onPress={() => {}}
                                    activeOpacity={0.5}
                                    showEditButton
                                    source={require('../../../../assets/default_user_1.png')}
                                />
                                :
                                <Avatar
                                    size={120}
                                    rounded
                                    onPress={() => { }}
                                    activeOpacity={0.5}
                                    showEditButton
                                    source={{ uri: userAccount.get('avatar')._url }}
                                />
                            }
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
                            editable={false}
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
                            onEndEditing={handleChangeAddress}
                        />
                        <Input
                            label={'Info extra de tu ubicación'}
                            style={styles.input}
                            blurOnSubmit
                            keyboardType={'default'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            value={inputs.addressDescription}
                            error={errorMessages.addressDescription}
                            onChangeText={value => handleInput('addressDescription', value)}
                        />
                        <View>
                            <MapPicker coords={inputs.coords} getCoords={value => getAddressFromLatLng(value)} />
                            {/* <TouchableOpacity onPress={getCurrentPosition} style={styles.getCurrentPositionIcon}>
                                <Ionicons name={'md-locate'} size={36} color={colors.colmenaGreen} />
                            </TouchableOpacity> */}
                        </View>
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

export default EditProfile;