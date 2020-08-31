import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { addContainerToTransport, removeContainerToTransport } from '../../redux/waste/transport/actions';
import { useDispatch } from 'react-redux';

import colors from '../../constants/colors';

const TransportWasteItem = props => {

    const [isChecked, setIsChecked] = useState(false);
    const container = props.container;

    const toogleCheck = () => {
        props.toogleCheck(!isChecked);
        setIsChecked(!isChecked);
    };

    return (
        <TouchableOpacity onPress={toogleCheck} style={{ ...styles.container, backgroundColor: isChecked ? colors.colmenaGreen : '#f9f9f9' }}>
            <Text style={{ ...styles.text, color: isChecked ? 'white' : '#7c7c7c', }}>
                {container.get('code')}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        height: 40,
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
        fontSize: 16,
        textAlign: 'center'
    },

})

export default TransportWasteItem;