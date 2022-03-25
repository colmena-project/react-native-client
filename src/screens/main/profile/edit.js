import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, Switch} from 'react-native';
import { Avatar } from 'react-native-elements';
import { Parse } from 'parse/react-native';
import Input from '../../../components/form/Input';
import ImagerPicker from '../../../components/form/ImagePicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapPicker from '../../../components/address/MapPicker';
import colors from '../../../constants/colors';
import validate from '../../../services/Validate';
import { Feather } from '@expo/vector-icons';


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
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [userProfilePhoto, setUserProfilePhoto] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);

    props.navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={handleSaveButton}>
                <View style={{flexDirection:'row', alignItems:'center', padding:10, backgroundColor:"#19a15e", borderRadius:6}}>
                    <Text style={{ color: 'white', fontSize: 16}}> Guardar </Text>
                    <Feather name={'save'} color={'white'} size={20} />
                </View>
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
            if (parseAccount.get('avatar')) {
                setUserProfilePhoto(parseAccount.get('avatar')._url);
            }
            setUserAccount(parseAccount);
            console.log(parseAccount);
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

    const handleTerms = () =>{
        props.navigation.navigate('About');
    }

    const handleField = (field, value) => {
        const updateData = { ...inputs };
        updateData[field] = value;
        setInputs(updateData);
    };

    const handleInput = (field, value) => {
        handleError(field, value);
        handleField(field, value);
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

    const handleShowImagePicker = show => {
        setShowImagePicker(show)
    };

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleTakenImage = async (image, filename) => {
        try {
            setUserProfilePhoto(`data:image/jpeg;base64,${image}`);
            const dateInMillis = new Date().getTime();
            const fileName = `${dateInMillis}_${inputs.firstName}_${inputs.lastName}.jpg`;
            const profilePhoto = new Parse.File(fileName.toLowerCase(), { base64: image });
            userAccount.set('avatar', profilePhoto);
            // setUserAccount(userAccount);
            await userAccount.save();
        } catch (ex) {
            console.log(ex);
        }
    };

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
                            <ImagerPicker
                                aspect={[1, 1]}
                                onRequestClose={() => setShowImagePicker(false)}
                                show={handleShowImagePicker}
                                visible={showImagePicker}
                                takenImage={handleTakenImage}
                            />
                            {!userProfilePhoto ?
                                <Avatar
                                    size={120}
                                    rounded
                                    onPress={() => handleShowImagePicker(true)}
                                    activeOpacity={0.5}
                                    showEditButton
                                    source={require('../../../../assets/default_user_1.png')}
                                />
                                :
                                <Avatar
                                    size={120}
                                    rounded
                                    onPress={() => handleShowImagePicker(true)}
                                    activeOpacity={0.5}
                                    showEditButton
                                    source={{ uri: userProfilePhoto }}
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
                        <View style={{flexDirection:'row', alignItems:'center', margin:5}}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#59f1ae" }}
                                thumbColor={isEnabled ? "#21BDA3" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                            <Text>Soy recolector</Text>
                        </View>
                        
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
                        <TouchableOpacity onPress={handleTerms} style={styles.changePassword}>
                            <Text>Acerca de Colmena APP</Text>
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

export default EditProfile;