import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
            <View>
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

                <View style={{ width: '100%', borderTopColor: '#EDEDED', borderTopWidth: 1 }}>
                    {wasteTypes != null && wasteTypes.length > 0 ?
                        wasteTypes.map(wasteType => {
                            return <RegisterWasteItem key={wasteType.id} wasteType={wasteType} />
                        })
                        :
                        <View></View>
                    }
                </View>
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