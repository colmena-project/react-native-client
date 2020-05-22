import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, Picker } from 'react-native';

import { Caption } from 'react-native-paper';

import { Parse } from 'parse/react-native';
import Geolocation from 'react-native-geolocation-service';

import AsyncStorage from '@react-native-community/async-storage';

import Input from '../../../components/form/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RecyclingCenterIcon from '../../../../assets/icons/png/recycling-center-marker256b.png';

import MapView, { Marker } from 'react-native-maps';

import colors from '../../../styles/colors';
import stylesCommon from '../../../styles/waste';
// import validate from '../../../utils/Validate';

const Location = (props) => {
    /*
    const region = {
        latitude: -27.425292,
        longitude: -55.935824,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    };
    const [mapRegion, setMapRegion] = useState(region);
    */

    const fields = {
        address: '',
        street: '',
        city: '',
        state: '',
        country: '',
        addressDescription: '',
        coords: { latitude: -27.425292, longitude: -55.935824 }
    };

    const [inputs, setInputs] = useState(fields);
    // const [errorMessages, setErrorMessages] = useState(fields);
    const [userAccount, setUserAccount] = useState(null);
    const [destinationAddress, setDestinationAddress] = useState(null);
    const [centerAddress, setCenterAddress] = useState(null); // Centro de reciclado
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            
            const parseAddress = new Parse.Query('Address');
            parseAddress.equalTo('default', true);
            const destinationAddress = await parseAddress.first();
            const parseAccount = await destinationAddress.get('account').fetch();

            setUserAccount(parseAccount);
            setDestinationAddress(destinationAddress);

            setInputs({
                ...inputs,
                street: destinationAddress.get('street'),
                city: destinationAddress.get('city'),
                state: destinationAddress.get('state'),
                country: destinationAddress.get('country'),
                addressDescription: destinationAddress.get('description'),
                address: `${destinationAddress.get('street')}, ${destinationAddress.get('city')}, ${destinationAddress.get('state')}`,
                coords: destinationAddress.get('latLng').toJSON()
            });
            
            // Centro de Reciclado
            const parseRC = new Parse.Query('RecyclingCenter');
            const firstRCAddress = await parseRC.first();

            setCenterAddress(firstRCAddress);

            await AsyncStorage.setItem(
                'RecyclingCenter',
                JSON.stringify({
                    name: firstRCAddress.get('name'), 
                    description: firstRCAddress.get('description'),
                    latitude: firstRCAddress.get('latLng').latitude,
                    longitude: firstRCAddress.get('latLng').longitude,
                }),
            );

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

    /*
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
    */

    const handleBackButton = () => {
        props.navigation.goBack();
    };

    /*
    const handleChangeAddress = async () => {
        try {
            const result = await Parse.Cloud.run("geocodeAddress", { address: inputs.address });
            const newCoords = { latitude: result.geocode.lat, longitude: result.geocode.lng };
            handleField('coords', newCoords);
        } catch (err) {
            console.log(err);
        }
    };
    */

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
        /*
        try {
            let errors = { ...errorMessages };
            for (const [key, value] of Object.entries(inputs)) {
                errors[key] = validate(value, inputs[key]);
                setErrorMessages(errors);
            }
            if (hasErrors(errors)) {
                Alert.alert('', 'Revise los datos!');
            } else {
                destinationAddress.set('street', inputs.street);
                destinationAddress.set('city', inputs.city);
                destinationAddress.set('state', inputs.state);
                destinationAddress.set('country', inputs.country);
                destinationAddress.set('description', inputs.addressDescription);
                destinationAddress.set('latLng',  new Parse.GeoPoint(inputs.coords));
                // await destinationAddress.save();
                //await Parse.Object.saveAll([destinationAddress]);

                props.navigation.navigate('TransportCheckInfo');
                // Alert.alert('', 'Datos guardados!');
            }
        } catch (error) {
            console.log(error);
        }
        */
        props.navigation.navigate('TransportCheckInfo');
    };

    return (
        <Fragment>
            <View style={{ flex: 1, backgroundColor: colors.colmenaBackground }}>
                {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                    <ScrollView style={stylesCommon.scrollView}>
                    <View style={{ marginBottom: 5, }}>
                        {/* 
                        <Input
                            label={'Mi Dirección'}
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
                        */}
                        <Caption>Centro de Reciclado:</Caption>
                        <Picker
                            selectedValue={centerAddress.get('name')}
                            style={{ width: '100%' }}
                            >
                            <Picker.Item label={centerAddress.get('name')} value={centerAddress.get('name')} />
                        </Picker>   
                        <View>
                            <MapView
                                initialRegion={{
                                    latitude: centerAddress.get('latLng').latitude,
                                    longitude: centerAddress.get('latLng').longitude,
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.005
                                }}
                                style={styles.map}
                                >
                                <Marker
                                    image={RecyclingCenterIcon}
                                    coordinate={{ 
                                        latitude: centerAddress.get('latLng').latitude,
                                        longitude: centerAddress.get('latLng').longitude,
                                    }}
                                    title={centerAddress.get('name')}
                                    description={centerAddress.get('description')}
                                />
                            </MapView>

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

const styles = StyleSheet.create({
    map: {
        marginTop: 15,
        width: '100%',
        height: 300
    }
});

export default Location;