import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerWasteContainers } from '../../redux/waste/register/actions';
import colors from '../../constants/colors';

const RegisterwasteType = props => {

    let wasteType = props.wasteType;
    const [qty, setQty] = useState(0);
    const dispatch = useDispatch();
    const actualState = useSelector(state => state.registerWaste);

    console.log(actualState);

    const handleAddWaste = () => {
        setQty(qty + 1);
        dispatch(registerWasteContainers({ id: wasteType.id, qty: qty + 1 }));
    };

    const handleSubtractWaste = () => {
        if (qty != 0) {
            setQty(qty - 1);
            dispatch(registerWasteContainers({ id: wasteType.id, qty: qty - 1 }));
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <Image style={styles.image} source={{ uri: wasteType.get('iconFile')._url }} />
                </View>
                <View>
                    <Text style={styles.wasteDesc}>{wasteType.get('name')} {wasteType.get('code')}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <TouchableOpacity style={{ ...styles.operationBnt, backgroundColor: qty == 0 ? '#7f7f7f' : colors.colmenaGreen, }}
                        onPress={handleSubtractWaste}>
                        <Text style={{ ...styles.operationText, top: -12 }}>_</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: 50, alignItems: 'center', marginHorizontal: 10 }}>
                    <View>
                        <Text style={styles.qtyText}>{qty}</Text>
                    </View>
                    <View>
                        <Text style={styles.containerDescriptionText}>{qty == 1 ? wasteType.get('container') : wasteType.get('containerPlural')}</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.operationBnt} onPress={handleAddWaste}>
                        <Text style={{ ...styles.operationText, top: -4 }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View >
                <View>
                    <Text style={styles.retributionAmount}>100 jyc</Text>
                </View>
                <View>
                    <Text style={styles.retributionDesc}>Estimado</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        borderBottomColor: '#EDEDED',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    wasteDesc: {
        fontFamily: 'Nunito-Regular',
        fontSize: 13,
        color: '#7f7f7f',
        marginTop: 5,
        textAlign: 'center'
    },
    operationBnt: {
        alignItems: 'center',
        width: 30, height: 30,
        borderRadius: 50,
        backgroundColor: colors.colmenaGreen
    },
    operationText: {
        textAlign: 'center',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 24,
        color: 'white',
        position: 'absolute'
    },
    qtyText: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 24
    },
    containerDescriptionText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 13,
        color: '#7f7f7f',
        marginTop: 5
    },
    retributionAmount: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 24,
        color: colors.colmenaGreen
    },
    retributionDesc: {
        textAlign: 'center',
        fontFamily: 'Nunito-Regular',
        fontSize: 13,
        color: '#7f7f7f',
        marginTop: 5
    },
})

export default RegisterwasteType;