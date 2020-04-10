import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, ActivityIndicatorBase, WebView } from 'react-native';
import StyledText from './../components/StyledText';
import MapPreview from './../components/MapPreview';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Colors from '../constants/Colors';

const LocationPicker = props => {

    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert('Permisos insuficientes.', 'Se debe dar permiso al GPS para efectuar la operación.', [{ text: 'Ok' }]);
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000,

            });
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (error) {
            Alert.alert('No se pudo obtener la ubicación', 'Por favor intente de nuevo.', [{ text: 'Ok' }])
        };
        setIsFetching(false);
    };

    return (
        <View style={styles.locationPicker}>
            <MapPreview stype={styles.mapPreview} location={pickedLocation} zoom={12}>
                {isFetching ? <ActivityIndicator size={'large'} color={Colors.primary} /> : <StyledText>Ubicación no disponible</StyledText>}
            </MapPreview>
            <View style={styles.btnContainer}>
                <Button title={'Calcular mi ubicación'} color={Colors.primary} onPress={getLocationHandler}></Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        margin: 30,
    },
    mapPreview: {
        paddingBottom: 15,
        marginBottom: 15,
        width: '100%',
        height: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    btnContainer: {
        marginVertical: 15,
    }
});

export default LocationPicker;
