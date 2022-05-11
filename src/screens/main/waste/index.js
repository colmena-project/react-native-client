import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { resetTransport } from '../../../redux/waste/transport/actions';

import colors from '../../../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import styles from '../../../constants/profileStyles';

const WasteActions = props => {

    const transactions = useSelector(state => state.user.transactions);
    const [recovers, setRecovers] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            dispatch(resetTransport());
        });
        return unsubscribe;
    }, [props.navigation]);

    const handleStartRegisteringWaste = () => {
        props.navigation.navigate('RegisterWaste');
    };

    const handleTransportWaste = () => {
        props.navigation.navigate('PickWasteToTransport');
    };

    const handleManageWaste = () => {
        props.navigation.navigate('IndexManageWaste');
    };

    const handleRegisterInOtherMomment = () => {
        Alert.alert('En otro momento!');
    };

    useEffect(() => {
        setRecovers(transactions.filter(transaction => transaction.get('type') === 'RECOVER'));
    }, [transactions]);

    return (
        <>
            {recovers && recovers.length > 0 ?
                <ScrollView style={styles.scrollViewWrapper} >
                    <Text style={{
                        paddingHorizontal: 40,
                        marginVertical: 20,
                        textAlign: 'justify',
                        fontSize: 16,
                        fontFamily: 'Nunito-Regular',
                        color: '#7f7f7f'
                    }}>
                        Ya registraste tus residuos. Ahora podés <Text style={{ color: colors.colmenaGreen }}>transportarlos</Text> a un centro de reciclaje o bien <Text style={{ color: colors.colmenaGreen }}>gestionar</Text> la cantidad.
                    </Text>
                    <View style={{ width: '100%', alignItems: 'center', paddingBottom: 27, borderBottomWidth: 1, borderBottomColor: colors.separator }}>
                        <TouchableOpacity onPress={handleTransportWaste} style={{ width: '75%', }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <Image style={{ height: 150, resizeMode: 'contain' }} source={require('../../../../assets/img/waste_transport.png')} />
                            </View>
                            <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: colors.colmenaGreen, fontFamily: 'Nunito-SemiBold', fontSize: 16 }}>
                                TRANSPORTAR <AntDesign size={18} name={'arrowright'} />
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: 27 }}>
                        <TouchableOpacity onPress={handleManageWaste} style={{ width: '75%', }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <Image style={{ height: 150, resizeMode: 'contain' }} source={require('../../../../assets/img/waste_manage.png')} />
                            </View>
                            <Text style={{ marginTop: 5, textAlignVertical: 'center', textAlign: 'center', color: colors.colmenaGreen, fontFamily: 'Nunito-SemiBold', fontSize: 16 }}>
                                GESTIONAR RESIDUOS <AntDesign size={18} name={'arrowright'} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView >
                :
                <View style={styles.scrollViewWrapper} >
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Image style={{ width: 400, height: 300, resizeMode: 'contain' }} source={require('../../../../assets/img/1st_time_waste.png')} />
                    </View>
                    <Text style={{
                        paddingHorizontal: 40,
                        marginVertical: 25,
                        textAlign: 'justify',
                        fontSize: 16,
                        fontFamily: 'Nunito-Regular',
                        color: '#7f7f7f'
                    }}>
                        Registra tus residuos y recibe beneficios por tu reciclaje. La Comunidad Colmena comenzará a ver tus aportes.
                    </Text>
                    <View style={{ paddingHorizontal: 40 }}>
                        <TouchableOpacity onPress={handleStartRegisteringWaste} style={{ marginBottom: 5, height: 45, backgroundColor: colors.colmenaGreen, borderRadius: 5, justifyContent: 'center', }} >
                            <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Nunito-SemiBold', fontSize: 16 }}>
                                EMPEZAR A REGISTRAR
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View >}
        </>
    );
};

export default WasteActions;