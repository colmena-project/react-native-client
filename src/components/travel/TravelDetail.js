import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import colors from '../../constants/colors';

const TravelDetail = props => {

    const IconProvider = props.iconProvider ? props.iconProvider : FontAwesome5;
    const IconName = props.iconName ? props.iconName : 'map-marker-alt';
    const IconTintColor = props.iconTintColor ? props.iconTintColor : colors.primaryDavysGray;


    return (
        <View style={styles.container}>
            {props.icon ?
                <IconProvider name={IconName} size={24} color={IconTintColor} style={styles.markerIcon} />
                :
                <View></View>
            }
            {props.childen}
            <View style={{ flex: 1 }}>
                <Text style={styles.detailTitle}>{props.label}</Text>
                <Text style={styles.detailText}>{props.text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    markerIcon: {
        paddingRight: 10,
    },
    detailTitle: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: 13,
        color: colors.primaryDavysGray
    },
    detaiText: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: 13,
        marginTop: 10,
        color: colors.primaryDavysGray
    },
});

export default TravelDetail;