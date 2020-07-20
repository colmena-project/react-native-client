import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../constants/styles';
import colors from '../../constants/colors';
import * as Location from 'expo-location';

const MapPicker = props => {

    const mapRegion = {
        latitude: props.coords.latitude,
        longitude: props.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    };

    const selectedLocationHandler = event => {
        props.getCoords(event.nativeEvent.coordinate);
    };

    const getCurrentPosition = async () => {
        try {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            }
            let { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });
            props.getCoords(coords);
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <View>
            <MapView region={{ ...mapRegion, ...props.coords }} style={{
                ...{
                    marginTop: 15,
                    width: '100%',
                    height: 300
                }, ...props.styles
            }}>
                <Marker
                    draggable
                    title={'Picked Location'}
                    coordinate={props.coords}
                    onDragEnd={selectedLocationHandler}
                ></Marker>
            </MapView>

            <TouchableOpacity onPress={getCurrentPosition} style={styles.getCurrentPositionIcon}>
                <Ionicons style={styles.getMyLocationIcon} name={'md-locate'} size={30} color={colors.primaryGunMetal} />
            </TouchableOpacity>
        </View>
    );
};

export default MapPicker;
