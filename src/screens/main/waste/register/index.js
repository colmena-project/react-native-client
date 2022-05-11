import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import RegisterWasteItem from '../../../../components/waste/RegisterWasteItem';
import colors from '../../../../constants/colors';
import styles from '../../../../constants/profileStyles';

const RegisterWasteScreen = props => {

    const wasteTypes = useSelector(state => state.wasteTypes);

    const handleNextButton = () => {
        props.navigation.navigate('PickSourceAddress');
    };

    return (
        <View style={{ ...styles.scrollViewWrapper, justifyContent: 'space-between' }} >
            <View style={{ ...styles.scrollViewWrapper, justifyContent: 'space-between' }}>
                <Text style={{
                    textAlign: 'center',
                    paddingHorizontal: 40,
                    marginVertical: 25,
                    fontSize: 16,
                    fontFamily: 'Nunito-Regular',
                    color: '#7f7f7f'
                }}>
                    Puedes registrar tus residuos y ver la retribución estimada en JellyCoins <Text style={{ fontWeight: 'bold' }}>jyc</Text> ingresando botellas / tapitas.
                </Text>

                <ScrollView style={{ borderTopColor: '#EDEDED', borderTopWidth: 1, height:200}}>
                    {wasteTypes != null && wasteTypes.length > 0 ?
                        wasteTypes.map(wasteType => {
                            return <RegisterWasteItem key={wasteType.id} wasteType={wasteType} />
                        })
                        :
                        <View></View>
                    }
                </ScrollView>
            </View>
            <View style={{ marginBottom: 20 }}>
                <TouchableOpacity style={{ marginVertical: 10 }} onPress={handleNextButton} >
                    <Text style={{ textAlign: 'center', color: colors.colmenaGreen, fontFamily: 'Nunito-SemiBold', fontSize: 16 }}>
                        SIGUIENTE
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

export default RegisterWasteScreen;