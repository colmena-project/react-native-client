import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';

const ListItem = props => {

    return (
        <TouchableOpacity onPress={props.onPress} style={{ ...styles.container, ...props.containerStyle }}>
            <View style={{ ...styles.infoContainer, ...props.infoContainer }}>
                <View style={styles.icon}>
                    {props.children}
                </View>
                <View>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.subTitle}>{props.subTitle}</Text>
                </View>
            </View>
            <MaterialIcons name={'chevron-right'} size={36} color={colors.primaryOldMossGreen} />
        </TouchableOpacity >
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
        // width: 45,
        // height: 45,
        paddingRight: 10,
        // borderWidth: 1,
        // borderColor: 'white',
        // borderRadius: 50,
        // marginRight: 10
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