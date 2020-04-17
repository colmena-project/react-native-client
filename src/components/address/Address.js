import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import MapPicker from './MapPicker';
import Input from '../form/Input';

import Geolocation from 'react-native-geolocation-service';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Parse } from 'parse/react-native';

const Address = () => {

    const [regionCoords, setRegionCoords] = useState({ latitude: -27.3715333, longitude: -55.9170078 });
    const [address, setAddress] = useState(null);

    let timeout = null;

    const handleChangeAddress = newAddress => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            getCoordsFromAddress(newAddress)
        }, 1000);;
    };

    const getAddressFromLatLng = async (latLng) => {
        try {
            const result = await Parse.Cloud.run("getAddress", { lat: latLng.latitude, lng: latLng.longitude });
            props.pickedAddress(result.formatted_address);
            setAddress(result.formatted_address);
        } catch (err) {
            console.log(err);
        }
    };

    const getCoordsFromAddress = async (newAddress) => {
        if (newAddress != '') {
            try {
                const result = await Parse.Cloud.run("geocodeAddress", { address: newAddress });
                setRegionCoords(result.geocode);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const getAddress = () => {
        const address = `${config.googleApiUrl}${inputs.street}+${inputs.streetNumber}+${inputs.city}+${inputs.neighbourhood}+Misiones+Argentina${config.googleApiKey}`;
        console.log(address);
        fetch(address)
            .then(response => response.json())
            .then(response => {
                handleField('coords', { latitude: response.results[0].geometry.location.lat, longitude: response.results[0].geometry.location.lng });
            })
            .catch(error => console.log(error));
    };

    const handleNewLocation = newCoords => {
        if ('latitude' in newCoords && 'longitude' in newCoords) {
            try {
                setRegionCoords({ latitude: newCoords.latitude, longitude: newCoords.longitude });
                getAddressFromLatLng(newCoords);
            } catch (ex) {
                console.log(ex);
            }
        }
    };

    const getCurrentPosition = async () => {
        Geolocation.getCurrentPosition(value => handleNewLocation(value.coords), error => console.log(error), { enableHighAccuracy: true, timeout: 5000 });
    };

    return (
        <View style={{ flex: 1 }}>
            <Input
                label={'Dirección'}
                style={styles.input}
                blurOnSubmit
                keyboardType={'default'}
                autoCapitalize={'none'}
                autoCorrect={false}
                value={address}
                error={''}
                onChangeText={newAddress => setAddress(newAddress)}
                onEndEditing={handleChangeAddress}
            />
            <View>
                <MapPicker coords={regionCoords} getCoords={coords => handleNewLocation(coords)} />
                <TouchableOpacity onPress={getCurrentPosition} style={{
                    position: 'absolute',
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    right: 10,
                    bottom: 10,
                }}>
                    <Ionicons name={'md-locate'} size={36} color={'blue'} />
                </TouchableOpacity>
            </View>
            {/* <Text>
                Latitude: {regionCoords.latitude}
            </Text>
            <Text>
                Longitude: {regionCoords.longitude}
            </Text>
            <Text>
                Address: {address}
            </Text> */}
        </View>
    );
}

const styles = StyleSheet.create({

    input: {
        flex: 1,
        textAlign: 'center',
    },
});

export default Address;