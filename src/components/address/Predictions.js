import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Predictions = props => {

    const DEFAULT_QTY = 5;
    const qty = props.qty ? props.qty : DEFAULT_QTY;
    let data = props.data;

    if (data && data !== '') {
        data = data.slice(0, qty);
    } else {
        return null;
    }

    const handleEndPrediction = value => {
        props.onPress(value);
    };

    const handleOnCancel = () => {
        props.onCancel();
    };

    return (
        <View style={styles.container}>
            <MaterialIcons onPress={handleOnCancel} style={styles.icon} name={'cancel'} size={24} color={'#cbcbcb'} />
            {data.map((prediction, index) => {
                return (
                    <TouchableOpacity key={index.toString()} style={styles.touchable} onPress={() => handleEndPrediction(prediction.description)} >
                        <Text style={styles.text} >{prediction.description}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 888,
        top: 70,
        left: 20
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 999
    },
    touchable: {
        marginBottom: 10
    },
    text: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: 12,
        zIndex: 888,
    },
});

export default Predictions;