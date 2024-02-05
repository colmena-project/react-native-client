import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';

const ListItem = props => {

    return (
        <View onPress={props.onPress} style={{ ...styles.container, ...props.containerStyle }}>
            <View style={{ ...styles.infoContainer, ...props.infoContainer }}>
                <View style={styles.icon}>
                    {props.children}
                </View>
                <View>
                    <Text style={styles.title}>{props.subTitle}</Text>
                    <Text style={styles.subTitle}>{props.title}</Text>
                </View>
            </View>
            <View></View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderColor: 'gray'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        height: 45,
        padding: 7,
        borderWidth: 1,
        borderColor: colors.accentLaurelGreen,
        borderRadius: 50,
        marginRight: 10
    },
    title: {
        fontFamily: 'NunitoSans-Bold',
        fontSize: 18
    },
    subTitle: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: 14,
        color: 'gray'
    },
});

export default ListItem;