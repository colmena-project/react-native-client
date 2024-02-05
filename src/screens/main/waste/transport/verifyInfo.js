import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTransportRetribution } from '../../../../redux/waste/transport/actions';
import Parse from 'parse/react-native';
import UserService from '../../../../services/User';
import styles from '../../../../constants/profileStyles';
import colors from '../../../../constants/colors';

const VerifyInfo = props => {

    const PPId = 'GIw8hv4Dle';
    const PETId = 'WTMdIFLUFV';
    const VIDRIOId = 'ruWYuai4wM';
    const ALUMINIOId = 'hcU1lilR5G';
    const PAPELId = 'QgczEeCOLS';
    
    const recyclingCenter = useSelector(state => state.transportInfo.to);
    const containersToTransport = useSelector(state => state.transportInfo.containers);
    const petContainers = containersToTransport.filter(container => container.get('type').id === PETId);
    const ppContainers = containersToTransport.filter(container => container.get('type').id === PPId);
    const vidrioContainers = containersToTransport.filter(container => container.get('type').id === VIDRIOId);
    const AluminioContainers = containersToTransport.filter(container => container.get('type').id === ALUMINIOId);
    const PapelContainers = containersToTransport.filter(container => container.get('type').id === PAPELId);
    const user = useSelector(state => state.user);
    const materialRetribution = useSelector(state => state.transportInfo.materialRetribution);
    const [isLoading, setIsLoading] = useState(false);
    const [calculatingRetribution, setCalculatingRetribution] = useState(false);
    const [estimatedRetribution, setEstimatedRetribution] = useState(0);
    const dispatch = useDispatch();

    console.log("------------------", containersToTransport)

    const calculateTransportRetribution = async () => {
        setCalculatingRetribution(true);
        try {
            if (recyclingCenter && user.address) {
                const elements = [
                    { latitude: user.address.get('latLng')._latitude, longitude: user.address.get('latLng')._longitude },
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
        setCalculatingRetribution(false);
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
            console.log(params);
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
                        <Text style={{ fontWeight: 'bold' }}>{user.account.get('user').get('firstName')}</Text> verifica si la información del transporte es correcta.
                    </Text>

                    <ScrollView horizontal={true}>
                        <View style={{padding:5}}>
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
                        <View style={{padding:5}}>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: colors.separator }}>
                                <Text style={componentStyle.wasteTypeTitle}>Vidrio <Text style={{ fontSize: 14 }}></Text></Text>
                            </View>
                            <ScrollView>
                                {vidrioContainers && vidrioContainers.length > 0 ?
                                    vidrioContainers.map(container => {
                                        return <Text key={container.id} style={componentStyle.wasteContainer}>{container.get('code')}</Text>
                                    })
                                    :
                                    <View></View>
                                }
                            </ScrollView>
                        </View>
                        <View style={{padding:5}}>
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
                        <View style={{padding:5}}>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: colors.separator }}>
                                <Text style={componentStyle.wasteTypeTitle}>Aluminio <Text style={{ fontSize: 14 }}></Text></Text>
                            </View>
                            <ScrollView>
                                {AluminioContainers && AluminioContainers.length > 0 ?
                                    AluminioContainers.map(container => {
                                        return <Text key={container.id} style={componentStyle.wasteContainer}>{container.get('code')}</Text>
                                    })
                                    :
                                    <View></View>
                                }
                            </ScrollView>
                        </View>
                        <View style={{padding:5}}>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: colors.separator }}>
                                <Text style={componentStyle.wasteTypeTitle}>Papel <Text style={{ fontSize: 14 }}></Text></Text>
                            </View>
                            <ScrollView>
                                {PapelContainers && PapelContainers.length > 0 ?
                                    PapelContainers.map(container => {
                                        return <Text key={container.id} style={componentStyle.wasteContainer}>{container.get('code')}</Text>
                                    })
                                    :
                                    <View></View>
                                }
                            </ScrollView>
                        </View>                       
                    </ScrollView>
                        

                    <View style={componentStyle.addressContainer}>
                        <View style={{ paddingRight: 10, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', marginHorizontal: 10, color: colors.greyText }}>
                                Destino:
                            </Text>
                            <Text style={{ marginHorizontal: 10, color: colors.greyText }}>
                                {recyclingCenter && recyclingCenter.get('description') ? recyclingCenter.get('description') : ''}
                            </Text>
                        </View>
                    </View>

                    <View style={componentStyle.retributionContainer}>
                        <View style={componentStyle.estimatedContainer}>
                            <Text style={componentStyle.estimatedText}>
                            Retribución estimada:
                            </Text>
                            {calculatingRetribution ?
                                <Text style={componentStyle.estimatedAmmount}>calculando...</Text>
                                :
                                <Text style={componentStyle.estimatedAmmount}>{(materialRetribution + estimatedRetribution).toFixed(2)} JYC</Text>
                            }
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