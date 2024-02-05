import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerWasteContainers } from '../../redux/waste/register/actions';
import colors from '../../constants/colors';

const RegisterwasteType = props => {

    const qtys = useSelector(state => state.registerWaste);
    const getQty = () => {
        const qty = qtys.filter(qty => qty.id === wasteType.id);
        return qty[0] ? qty[0].qty : 0;
    };
    let wasteType = props.wasteType;
    const [qty, setQty] = useState(getQty());
    const dispatch = useDispatch();

    const handleAddWaste = () => {
        setQty(qty + 1);
        dispatch(registerWasteContainers({ id: wasteType.id, qty: qty + 1, item: wasteType }));
    };

    const handleSubtractWaste = () => {
        if (qty != 0) {
            setQty(qty - 1);
            dispatch(registerWasteContainers({ id: wasteType.id, qty: qty - 1, name: wasteType }));
        }
    };

    return (
        <View style={styles.container}>
            <View style={{flex:30, alignItems:'center'}}>
                <View>
                    <Image style={styles.image} source={{ uri: wasteType.get('iconFile')._url }} />
                </View>
                <View>
                    <Text style={styles.wasteDesc}>{wasteType.get('name')} {wasteType.get('code')}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', flex:35, justifyContent:'center' }}>
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
            <View style={{flex:30, alignItems:'center'}}>
                <View>
                    <Text style={styles.retributionAmount}>{wasteType.get('unit') == "gr"? wasteType.get('qty')/1000 *10*qty : wasteType.get('qty')*qty} jyc</Text>
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