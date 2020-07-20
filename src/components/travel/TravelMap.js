import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Ionicons, Entypo } from '@expo/vector-icons';
import NightStyle from '../travel/NightStyle.json';
import colors from '../../constants/colors';
import { styles } from '../../constants/styles';
import env from '../../../env';

const TravelMap = props => {

    let initialMapRegion = {
        latitude: -27.3715333,
        longitude: -55.9170078,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
    };
    const [showMeOnMap, setShowMeOnMap] = useState(false);
    const [mapView, setMapView] = useState(null);
    const [mapRegion, setMapRegion] = useState(initialMapRegion)
    const [dayTime, setDayTime] = useState('day');
    let timer = null;

    useEffect(() => {
        clearTimeout(timer);
        if (mapView != null) {
            const markers = ['initialMarker', 'endMarker'];
            const options = {
                edgePadding: {
                    top: 50,
                    right: 50,
                    bottom: 50,
                    left: 50
                },
            };
            timer = setTimeout(() => {
                mapView.fitToSuppliedMarkers(markers, options);
            }, 1000);
        }
    }, [props.data]);

    const getDayTime = () => {
        let curTime = new Date();
        curTime = parseInt(curTime.getHours() + "" + ("0" + curTime.getMinutes()).substr(-2) + "" + ("0" + curTime.getSeconds()).substr(-2));
        if (curTime > 63000 && curTime < 183000) {
            setDayTime('day');
        } else {
            setDayTime('night');
        }
    };

    const getstartPoint = event => {
        props.getstartPoint(event.nativeEvent.coordinate);
    };

    const getEndPoint = event => {
        props.getEndPoint(event.nativeEvent.coordinate);
    };

    const handleShowOnMap = () => {
        if (showMeOnMap === true) {
            setShowMeOnMap(false);
        } else {
            setShowMeOnMap(true);
        }
    };

    const getCurrentPosition = async () => {
        try {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            }
            let { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });
            const newMapRegion = {
                ...mapRegion,
                ...coords
            };
            setMapRegion(newMapRegion);
        } catch (ex) {
            console.log(ex);
        }
    };

    useEffect(() => {
        getDayTime();
        getCurrentPosition();
    }, []);

    return (
        <View>
            <MapView ref={ref => setMapView(ref)} region={mapRegion} showsUserLocation={showMeOnMap} style={{
                ...{
                    width: '100%',
                    height: 400
                }, ...props.styles
            }} customMapStyle={dayTime === 'night' ? NightStyle : []}>
                {props.data.startPoint == null ? <View></View> :
                    <Marker
                        identifier={'initialMarker'}
                        //draggable={props.draggable}
                        title={props.data.initialAddress}
                        coordinate={props.data.startPoint}
                        //onDragEnd={getstartPoint}
                        pinColor={'green'} />
                }
                {props.data.intermediatePoints && props.data.intermediatePoints.length > 0 ?
                    props.data.intermediatePoints.map((intermediatePoint, index) => {
                        return (
                            <Marker
                                key={index.toString()}
                                identifier={intermediatePoint.uuid}
                                //draggable={props.draggable}
                                title={intermediatePoint.address}
                                coordinate={intermediatePoint.point}
                                //onDragEnd={getEndPoint}
                                pinColor={colors.primaryGunMetal} />
                        );
                    })
                    : <View></View>}
                {props.data.endPoint == null ? <View></View> :
                    <Marker
                        identifier={'endMarker'}
                        //draggable={props.draggable}
                        title={props.data.endAddress}
                        coordinate={props.data.endPoint}
                        //onDragEnd={getEndPoint}
                        pinColor={'red'} />
                }
                {(props.data.startPoint && props.data.endPoint) ?
                    <MapViewDirections
                        origin={props.data.startPoint}
                        destination={props.data.endPoint}
                        apikey={env.GOOGLEMAPS_API_KEY}
                        strokeWidth={8}
                        strokeColor={'#669df6'}
                        resetOnChange={true}
                        mode={'DRIVING'}
                        precision={'high'}
                        waypoints={props.data.intermediatePoints.map(intermediatePoint => intermediatePoint.point)}
                        optimizeWaypoints={true}
                    />
                    : <View></View>}
            </MapView >
            <TouchableOpacity onPress={handleShowOnMap} style={styles.showMeOnMapContainer}>
                <Entypo style={styles.showMeOnMapIcon} name={showMeOnMap ? 'eye-with-line' : 'eye'} size={26} color={colors.primaryGunMetal} />
            </TouchableOpacity>
            <TouchableOpacity onPress={getCurrentPosition} style={styles.getCurrentPositionIcon}>
                <Ionicons style={styles.getMyLocationIcon} name={'md-locate'} size={30} color={colors.primaryGunMetal} />
            </TouchableOpacity>
        </View>
    );
};

export default TravelMap;
