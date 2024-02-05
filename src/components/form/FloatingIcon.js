import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';

const FloatingIcon = props => {

    return (
        <TouchableOpacity style={{ ...styles.floatingIcon, ...props.styles }} onPress={props.onPress}>
            <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    floatingIcon: {
        backgroundColor: colors.primaryOldMossGreen,
        borderRadius: 50,
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 10,
        right: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
});

export default FloatingIcon;