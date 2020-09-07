import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTransportRetribution, resetTransport } from '../../../../redux/waste/transport/actions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Parse from 'parse/react-native';
import UserService from '../../../../services/User';
import styles from '../../../../constants/profileStyles';
import colors from '../../../../constants/colors';

const VerifyInfo = props => {

    const PPId = 'GIw8hv4Dle';
    const PETId = 'WTMdIFLUFV';
    const recyclingCenter = useSelector(state => state.transportInfo.to);
    const containersToTransport = useSelector(state => state.transportInfo.containers);
    const petContainers = containersToTransport.filter(container => container.get('type').id === PETId);
    const ppContainers = containersToTransport.filter(container => container.get('type').id === PPId);
    const userAddress = useSelector(state => state.user.address);
    const materialRetribution = useSelector(state => state.transportInfo.materialRetribution);
    const [isLoading, setIsLoading] = useState(false);
    const [estimatedRetribution, setEstimatedRetribution] = useState(0);
    const dispatch = useDispatch();

    const calculateTransportRetribution = async () => {
        try {
            if (recyclingCenter && userAddress) {
                const elements = [
                    { latitude: userAddress.get('latLng')._latitude, longitude: userAddress.get('latLng')._longitude },
                    { latitude: recyclingCenter.get('latLng')._latitude, longitude: recyclingCenter.get('latLng')._longitude },
                ];
                const data = {
                    type: 'transport',
                    elements
                };
                const transportRetribution = await Parse.Cloud.run('estimateRetribution', data);
                setEstimatedRetribution(transportRetribution.transport.total);
                dispatch(setTransportRetribution(transportRetribution.transport.total));
            }
        } catch (error) {
            console.log('TransportIndex - Retribuction calc error', error);
        }
    };

    useEffect(() => {
        calculateTransportRetribution();
    }, []);

    const handleTransportButton = async () => {
        try {
            setIsLoading(true);
            const params = {
                containers: containersToTransport.map(container => container.id),
                to: recyclingCenter.id
            };
            const result = await Parse.Cloud.run('registerTransport', params);
            UserService.fetchData(dispatch);
            setIsLoading(false);
            props.navigation.navigate('TransportInEvaluation');
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                <View style={styles.scrollViewWrapper} >

                    <Text style={componentStyle.headerText}>
                        <Text style={{ fontWeight: 'bold' }}>@colmenapp</Text> verifica si la información del transporte es correcta.
                    </Text>

                    <View style={componentStyle.wasteCategoriesContainer}>
                        <View>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: colors.separator }}>
                                <Text style={componentStyle.wasteTypeTitle}>PET <Text style={{ fontSize: 14 }}></Text></Text>
                            </View>
                            <ScrollView>
                                {petContainers && petContainers.length > 0 ?
                                    petContainers.map(container => {
                                        return <Text key={container.id} style={componentStyle.wasteContainer}>{container.get('code')}</Text>
                                    })
                                    :
                                    <View></View>
                                }
                            </ScrollView>
                        </View>
                        <View>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: colors.separator }}>
                                <Text style={componentStyle.wasteTypeTitle}>Tapitas <Text style={{ fontSize: 14 }}></Text></Text>
                            </View>
                            <ScrollView>
                                {ppContainers && ppContainers.length > 0 ?
                                    ppContainers.map(container => {
                                        return <Text key={container.id} style={componentStyle.wasteContainer}>{container.get('code')}</Text>
                                    })
                                    :
                                    <View></View>
                                }
                            </ScrollView>
                        </View>
                    </View>

                    <View style={componentStyle.addressContainer}>
                        <View style={{ paddingRight: 10, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', marginHorizontal: 10, color: colors.greyText }}>
                                Destino:
                            </Text>
                            <Text style={{ marginHorizontal: 10, color: colors.greyText }}>
                                {recyclingCenter && recyclingCenter.get('description') ? recyclingCenter.get('description') : ''}
                            </Text>
                        </View>
                        {/* <MaterialCommunityIcons name="pencil" color={colors.colmenaGreen} size={30} /> */}
                    </View>

                    <View style={componentStyle.retributionContainer}>
                        {/* <View style={{ width: '100%', alignItems: 'flex-end', paddingVertical: 5 }}>
                            <Text style={componentStyle.smallGreyText}>Por acopiar aprox</Text>
                            <Text style={componentStyle.normalGrayText}>300 JYC</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 5 }}>
                            <View>
                                <Text style={componentStyle.smallGreyText}>Distancia <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 18, color: colors.colmenaGreen }}>30km</Text></Text>
                                <Text style={componentStyle.smallGreyText}>x Km <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 18, color: colors.colmenaGreen }}>1 JYC / bolsa</Text></Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', paddingLeft: 30 }}>
                                <Text style={componentStyle.smallGreyText}>Por transportar aprox</Text>
                                <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 26, color: colors.colmenaGreen }}>90 JYC</Text>
                            </View>
                        </View> */}
                        <View style={componentStyle.estimatedContainer}>
                            <Text style={componentStyle.estimatedText}>
                                Estimado:
                            </Text>
                            <Text style={componentStyle.estimatedAmmount}>{(materialRetribution + estimatedRetribution).toFixed(2)} JYC</Text>
                        </View>
                    </View>

                    <View style={componentStyle.btnContainer}>
                        <TouchableOpacity onPress={handleTransportButton} style={componentStyle.btn} >
                            <Text style={componentStyle.btnText}>
                                TRANSPORTAR
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View >
            }
        </View>
    );
};

const componentStyle = StyleSheet.create({
    headerText: {
        textAlign: 'center',
        paddingHorizontal: 30,
        marginVertical: 20,
        fontSize: 20,
        fontFamily: 'Nunito-Regular',
        color: '#5a5d6c'
    },
    wasteCategoriesContainer: {
        paddingHorizontal: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    wasteTypeTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 22,
        color: colors.primaryGunMetal
    },
    wasteContainer: {
        fontFamily: 'Nunito-Regular',
        fontSize: 20,
        color: colors.greyText
    },
    addressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.separator,
        borderTopWidth: 1,
        borderTopColor: colors.separator,
        paddingVertical: 5,
        marginTop: 20,
        paddingHorizontal: 30,
    },
    smallGreyText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 12,
        color: colors.greyText
    },
    normalGrayText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 26,
        color: colors.primaryGunMetal
    },
    retributionContainer: {
        paddingHorizontal: 40,
        flex: 1,
        justifyContent: 'center'
    },
    estimatedContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 25
    },
    estimatedText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 20,
        color: colors.greyText
    },
    estimatedAmmount: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 45,
        color: colors.primaryGunMetal
    },
    btnContainer: {
        paddingHorizontal: 40,
        marginBottom: 20,
        flex: 1,
        justifyContent: 'flex-end'
    },
    btn: {
        marginBottom: 5,
        height: 45,
        backgroundColor: colors.colmenaGreen,
        borderRadius: 5,
        justifyContent: 'center',
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 16
    },
});

export default VerifyInfo;