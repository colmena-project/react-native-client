import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import colors from '../../constants/colors';

const RegisterWasteItem = props => {

    let wasteItem = props.wasteItem;

    const handleAddWaste = () => {
        // Apply some logic related to wastes
        wasteItem.qty += 1;
        props.updateWasteItem(wasteItem);
    };

    const handleSubtractWaste = () => {
        // Apply some logic related to wastes
        if (wasteItem.qty != 0) wasteItem.qty -= 1;
        props.updateWasteItem(wasteItem);
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', borderBottomColor: '#EDEDED', borderBottomWidth: 1, paddingVertical: 10 }}>
            <View>
                <View>
                    <Image style={{ width: 80, height: 80, resizeMode: 'contain' }} source={wasteItem.img} />
                </View>
                <View>
                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 13, color: '#7f7f7f', marginTop: 5, textAlign: 'center' }}>{props.text}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        width: 30, height: 30,
                        backgroundColor: wasteItem.qty == 0 ? '#7f7f7f' : colors.colmenaGreen,
                        borderRadius: 50
                    }}
                        onPress={handleSubtractWaste}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Nunito-SemiBold', fontSize: 24, color: 'white', position: 'absolute', top: -12 }}>_</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                    <View>
                        <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 24 }}>{wasteItem.qty}</Text>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 13, color: '#7f7f7f', marginTop: 5 }}>Bolsas</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={{ alignItems: 'center', width: 30, height: 30, backgroundColor: colors.colmenaGreen, borderRadius: 50 }} onPress={handleAddWaste}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Nunito-SemiBold', fontSize: 24, color: 'white', position: 'absolute', top: -4 }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View >
                <View>
                    <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 24, color: colors.colmenaGreen }}>100 jyc</Text>
                </View>
                <View>
                    <Text style={{ textAlign: 'center', fontFamily: 'Nunito-Regular', fontSize: 13, color: '#7f7f7f', marginTop: 5 }}>Estimado</Text>
                </View>
            </View>
        </View>
    );
};

export default RegisterWasteItem;