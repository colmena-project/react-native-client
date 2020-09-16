import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../constants/profileStyles';
import AuthorizedScreen from '../../../components/auth/AuthorizedScreen';
import ManageWasteCategory from '../../../components/waste/ManageWasteCategory';
import colors from '../../../constants/colors';
import UserService from '../../../services/User';
import WasteService from '../../../services/Waste';

const SummaryScreen = props => {

    const [containers, setContainers] = useState(null);
    const [wasteTypes, setWasteTypes] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const fetchedWasteTypes = await WasteService.fetchWasteTypes(dispatch);
            const fetchedContainers = await UserService.fetchRecoveredContainers(dispatch);
            setWasteTypes(fetchedWasteTypes);
            setContainers(fetchedContainers);
        } catch (error) {
            console.log('PickWasteForTransport - fetchData error: ', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            fetchData();
        });
        return unsubscribe;
    }, [props.navigation]);

    const handleManageProductPress = type => {
        console.log(type);
        props.navigation.navigate('ManageWaste', { type });
    };

    return (
        <AuthorizedScreen>
            {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                <View style={styles.scrollViewWrapper}>
                    {containers && containers.length > 0 ?
                        <ScrollView style={{ paddingTop: 30 }}>
                            <View style={styles.wasteTabContainer}>
                                {wasteTypes ? wasteTypes.map(wasteType => {
                                    return <ManageWasteCategory key={wasteType.id} onPress={handleManageProductPress} wasteType={wasteType} containers={containers} />
                                })
                                    :
                                    <View></View>
                                }
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={styles.wasteCardsContainer}>
                                    <Text style={styles.wasteTitle}>
                                        Impacto
                            </Text>
                                    <View style={styles.wasteCard}>
                                        <Text style={styles.impactTitle}>12 kg</Text>
                                        <Image style={styles.impactImage} source={require('../../../../assets/profile/profile_green_lungs.png')} />
                                        <Text style={styles.impactDescription}>Reducción de CO<Text style={{ fontSize: 10 }}>2</Text></Text>
                                    </View>
                                </View>
                                <View style={styles.wasteCardsContainer}>
                                    <View style={{ alignItems: 'flex-end', paddingHorizontal: 20 }}>
                                        <Image style={{ width: 130, height: 130, resizeMode: 'contain' }} source={require('../../../../assets/img/save_the_planet.png')} />
                                        <Text style={{ ...styles.impactDescription, fontSize: 14 }}>Retribución estimada</Text>
                                        <Text style={{ ...styles.impactTitle, fontSize: 40, letterSpacing: 2, fontFamily: 'Nunito-Bold' }}>400 jyc</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView >
                        :
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 }}>
                            <Image style={{ resizeMode: 'contain', width: '70%', height: '70%' }} source={require('../../../../assets/profile/empty_transactions.png')} />
                            <Text style={{ paddingHorizontal: 20, textAlign: 'center', fontFamily: 'Nunito-Light', fontSize: 18, color: '#4B4B4B' }}>
                                No tenés actividades pendientes. Intenta con el menú de acciones.
                            </Text>
                        </View>
                    }
                </View>
            }
        </AuthorizedScreen>
    );
};

export default SummaryScreen;