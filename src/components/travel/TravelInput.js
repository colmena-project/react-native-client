import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Predictions from '../address/Predictions';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { theme } from '../../constants/styles';
import Parse from 'parse/react-native';

const TravelInput = props => {

    const [predictions, setPredictions] = useState(null);
    const [address, setAddress] = useState(props.address ? props.address : '');
    const [point, setPoint] = useState(props.point ? props.point : null);
    const iconTintColor = props.iconTintColor;

    useEffect(() => {
        setAddress(props.address);
        setPoint(props.point);
    }, [props.point, props.address]);

    const handleChangeAddress = async (value) => {
        setAddress(value)
        if (value && value !== '') {
            try {
                const result = await Parse.Cloud.run('getAddressList', { 'address': value });
                setPredictions(result.predictions);
            } catch (error) {
                console.log(error.message);
            }
        } else {
            setPredictions(null);
        }
    };

    const getCoordsFromAddress = async (address) => {
        if (address) {
            try {
                const result = await Parse.Cloud.run("geocodeAddress", { address: address });
                if (result) {
                    const newCoords = { latitude: result.geocode.lat, longitude: result.geocode.lng };
                    setPoint(newCoords);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    const resetInput = () => {
        setAddress('');
        setPoint(null);
        setPredictions(null);
    };

    const handleSelectedPrediction = prediction => {
        setAddress(prediction);
        getCoordsFromAddress(prediction);
        setPredictions(null);
    };

    const handleCancelPrediction = () => {
        setPredictions(null);
    };

    const submit = () => {
        props.onUpdate(address, point);
    };

    const handleFocus = () => {
        props.onFocus();
    };

    const handleOnDelete = () => {
        props.onDelete();
    };

    useEffect(() => {
        submit();
    }, [point]);

    return (
        <View style={{ position: 'relative' }}>
            <FontAwesome5 name={'map-marker-alt'} size={24} color={iconTintColor} style={styles.inputStartIcon} />
            <TextInput
                style={styles.inputsStyle}
                theme={theme}
                underlineColor={colors.primaryDavysGray}
                label={props.label}
                value={address}
                onChangeText={value => handleChangeAddress(value)}
                onFocus={handleFocus}
            />
            {props.type !== 'intermediate' ?
                address !== '' ?
                    <TouchableOpacity onPress={resetInput} style={styles.inputEndIcon}>
                        <MaterialIcons name={'cancel'} size={24} color={'#cbcbcb'} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={submit} style={styles.inputEndIcon}>
                        <MaterialIcons name={'send'} size={24} color={colors.accentLaurelGreen} />
                    </TouchableOpacity>
                :
                <TouchableOpacity onPress={handleOnDelete} style={styles.inputEndIcon}>
                    <FontAwesome5 name={'trash'} size={18} color={colors.accentRed} style={{textAlign: 'center'}}/>
                </TouchableOpacity>
            }
            <Predictions qty={5} data={predictions} onPress={handleSelectedPrediction} onCancel={handleCancelPrediction} />
        </View>
    );
};

const styles = StyleSheet.create({
    inputsStyle: {
        backgroundColor: 'white',
        marginLeft: 30,
        marginBottom: 25,
        fontSize: 18,
        zIndex: 100,
    },
    inputStartIcon: {
        position: 'absolute',
        left: 0,
        top: 30,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        zIndex: 100,
        borderRadius: 50,
        width: 30,
        height: 30,
        textAlign: 'center',
    },
    inputEndIcon: {
        position: 'absolute',
        right: 0,
        top: 30,
        paddingLeft: 5,
        width: 30,
        textAlign: 'center',
        backgroundColor: 'white',
        zIndex: 100,
    }
});

export default TravelInput;