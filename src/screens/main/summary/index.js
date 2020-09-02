import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import styles from '../../../constants/profileStyles';
import AuthorizedScreen from '../../../components/auth/AuthorizedScreen';
import ManageWasteCategory from '../../../components/waste/ManageWasteCategory';
import colors from '../../../constants/colors';
import UserService from '../../../services/User';
import WasteService from '../../../services/Waste';

const SummaryScreen = props => {
    
    const [stockCategories, setStockCategories] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const __formattedStock__ = (wasteTypes, fetchedStock) => {
        const formatted = [];
        if (fetchedStock && fetchedStock.length > 0) {
            fetchedStock.forEach(item => {
                const type = item.wasteType.name;
                item.type = type;
                if (!(type in formatted))
                    formatted[type] = [];
                formatted[type] = item;
            })
            return formatted;
        }
        return null;
    };

    const formattedStock = (wasteTypes, fetchedStock) => {
        const categories = wasteTypes.map(wasteType => {
            let ammount = 0;
            fetchedStock.forEach(stockType => {
                if (stockType.wasteType.objectId == wasteType.id) {
                    ammount = stockType.ammount;
                }
            });
            const category = {
                ...wasteType,
                code: wasteType.get('code'),
                name: wasteType.get('name'),
                container: wasteType.get('container'),
                containerPlural: wasteType.get('containerPlural'),
                image: wasteType.get('iconFile'),
                ammount
            };
            return category;
        });
        return categories;
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const wasteTypes = await WasteService.fetchWasteTypes(dispatch);
            const fetchedStock = await UserService.fetchStock(dispatch);
            setStockCategories(formattedStock(wasteTypes, fetchedStock));
        } catch (error) {
            console.log('My Activity - error: ', error);
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
        props.navigation.navigate('ManageWaste', { type });
    };

    return (
        <AuthorizedScreen>
            {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                <ScrollView style={{ ...styles.scrollViewWrapper, paddingTop: 30 }}>
                    <View style={styles.wasteTabContainer}>
                        {stockCategories ? stockCategories.map(stockCategory => {
                            return <ManageWasteCategory key={stockCategory.id} onPress={handleManageProductPress} data={stockCategory} />
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
            }
        </AuthorizedScreen>
    );
};

export default SummaryScreen;