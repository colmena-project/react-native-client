import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import { Parse } from 'parse/react-native';
import Geolocation from 'react-native-geolocation-service';

import Input from '../../../components/form/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MapPicker from '../../../components/address/MapPicker';

import colors from '../../../styles/colors';
import stylesCommon from '../../../styles/waste';
import validate from '../../../utils/Validate';

const Location = (props) => {
    const fields = {
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

    const fetchData = async () => {
        try {
            setIsLoading(true);
            
            const parseAddress = new Parse.Query('Address');
            parseAddress.equalTo('default', true);
            const userAddress = await parseAddress.first();
            const parseAccount = await userAddress.get('account').fetch();

            setUserAccount(parseAccount);
            setUserAddress(userAddress);

            console.log('USER ADDRESS', userAddress);

            setInputs({
                ...inputs,
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

    useEffect(() => {
        console.log('USE EFFECT INPUTS', inputs);
    }, [inputs]);

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
            const result = await Parse.Cloud.run("getAddress", { lat: latLng.latitude, lng: latLng.longitude });
            let calcStreet = undefined;
            let calcCity = undefined;
            let calcState = undefined;
            let calcCountry = undefined;
            let calcStreetNumber = undefined;
           
            result.address_components.forEach(field => {
                if(field.types[0] == 'route'){
                    calcStreet = field.long_name;
                };
                if(field.types[0] == 'street_number'){
                    calcStreetNumber = field.long_name;
                };
                if(field.types[0] == 'administrative_area_level_2'){
                    calcCity = field.long_name;
                };
                if(field.types[0] == 'locality'){
                    calcCity = field.long_name;
                };
                if(field.types[0] == 'administrative_area_level_1'){
                    calcState = field.long_name;
                };
                if(field.types[0] == 'country'){
                    calcCountry = field.long_name;
                };
            });

            setInputs({
                ...inputs,
                street: `${calcStreet} ${calcStreetNumber}`,
                city: calcCity,
                state: calcState, 
                country: calcCountry,
                address: result.formatted_address,
                coords: latLng,
            });
        } catch (err) {
            console.log(err);
        }
    };

    const getCurrentPosition = async () => {
        try {
            Geolocation.getCurrentPosition(value => getAddressFromLatLng(value.coords), error => console.log(error), { enableHighAccuracy: true, timeout: 5000 });
        } catch (ex) {
            console.log(ex);
        }
    };

    const handleSaveButton = async () => {
        try {
            let errors = { ...errorMessages };
            for (const [key, value] of Object.entries(inputs)) {
                console.log('KEY: ', key, 'VALUE ', value)
                errors[key] = validate(value, inputs[key]);
                setErrorMessages(errors);
            }
            if (hasErrors(errors)) {
                Alert.alert('', 'Revise los datos!');
            } else {
                userAddress.set('street', inputs.street);
                userAddress.set('city', inputs.city);
                userAddress.set('state', inputs.state);
                userAddress.set('country', inputs.country);
                userAddress.set('description', inputs.addressDescription);
                userAddress.set('latLng',  new Parse.GeoPoint(inputs.coords));
                // await userAddress.save();
                await Parse.Object.saveAll([userAddress]);
                props.navigation.navigate('WasteCheckInfo');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <View style={{ flex: 1, backgroundColor: colors.colmenaBackground }}>
                {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                    <ScrollView style={stylesCommon.scrollView}>
                    <View style={{ marginBottom: 10, }}>

                        <Input
                            label={'Dirección'}
                            style={stylesCommon.input}
                            blurOnSubmit
                            keyboardType={'default'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            value={inputs.address}
                            error={errorMessages.address}
                            onChangeText={value => handleInput('address', value)}
                            onEndEditing={handleChangeAddress}
                        />
                        <View>
                            <MapPicker coords={inputs.coords} getCoords={value => getAddressFromLatLng(value)} />
                            <TouchableOpacity onPress={getCurrentPosition} style={{
                                position: 'absolute',
                                width: 50,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                right: 10,
                                bottom: 10,
                            }}>
                                <Ionicons name={'md-locate'} size={36} color={colors.colmenaGreen} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity
                            style={stylesCommon.btnSubmit}
                            onPress={handleSaveButton}>
                            <Text style={stylesCommon.submitText}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            }
            </View>
        </Fragment>
    );
}

export default Location;