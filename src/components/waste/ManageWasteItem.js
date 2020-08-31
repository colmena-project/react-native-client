import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';

const ManageWasteItem = props => {

    const [isChecked, setIsChecked] = useState(false);
    const wasteContainer = props.wasteContainer;

    const toogleCheck = () => {
        props.isChecked(!isChecked);
        setIsChecked(!isChecked);
    };

    return (
        <View style={{ ...styles.container, borderWidth: isChecked ? 1 : 0 }}>
            <View style={styles.icon}>

            </View>
            <Text style={{ ...styles.text, color: isChecked ? colors.colmenaGreen : '#7c7c7c', }}>
                {wasteContainer.container.get('code')}
            </Text>
            <View style={styles.icon}>
                <TouchableOpacity onPress={toogleCheck}>
                    <MaterialIcons color={isChecked ? colors.colmenaGreen : '#cccccc'} size={32} name={isChecked ? 'check-box' : 'check-box-outline-blank'} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        height: 40,
        marginHorizontal: 20,
        shadowColor: "#000",
        borderColor: colors.colmenaGreen,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    icon: {
        width: 40,
        marginLeft: 20
    },
    text: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 18
    },

})

export default ManageWasteItem;