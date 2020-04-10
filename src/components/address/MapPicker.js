import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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

    return (
        <MapView region={{ ...mapRegion, ...props.coords }} style={styles.map}>
            <Marker
                draggable
                title={'Picked Location'}
                coordinate={props.coords}
                onDragEnd={selectedLocationHandler}
            ></Marker>
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        marginTop: 15,
        width: '100%',
        height: 300
    }
});

export default MapPicker;
