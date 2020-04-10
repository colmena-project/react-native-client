import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import MapPicker from '../../../components/address/MapPicker';
import Geolocation from '@react-native-community/geolocation';

const Address = () => {

    const [regionCoords, setRegionCoords] = useState({ latitude: -27.3715333, longitude: -55.9170078 });
    const [address, setAddress] = useState(null);

    const handleNewLocation = newCoords => {
        try {
            setRegionCoords({ latitude: newCoords.coords.latitude, longitude: newCoords.coords.longitude });
        } catch (ex) {
            console.log(ex);
        }
    };

    const getCurrentPosition = async () => {
        Geolocation.getCurrentPosition(value => handleNewLocation(value), error => console.log(error), { enableHighAccuracy: true, timeout: 5000 });
    };

    return (
        <>
            <Button title={'Get current position'} onPress={getCurrentPosition} />
            <MapPicker coords={regionCoords} getCoords={value => console.log(value)} />
            <Text>
                Latitude: {regionCoords.latitude}
            </Text>
            <Text>
                Longitude: {regionCoords.longitude}
            </Text>
            <Text>
                Address: {address}
            </Text>
        </>
    );
}

const styles = StyleSheet.create({

});

export default Address;