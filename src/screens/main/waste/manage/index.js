import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../../../constants/profileStyles';
import AuthorizedScreen from '../../../../components/auth/AuthorizedScreen';
import ManageWasteCategory from '../../../../components/waste/ManageWasteCategory';
import colors from '../../../../constants/colors';
import UserService from '../../../../services/User';
import WasteService from '../../../../services/Waste';

const ManageWasteActionsScreen = props => {

    const user = useSelector(state => state.user.account);
    const [stockCategories, setStockCategories] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

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
                <View style={{ ...styles.scrollViewWrapper, justifyContent: 'center' }} >
                    <Text style={{ textAlign: 'center', fontFamily: 'Nunito-Regular', fontSize: 20, paddingHorizontal: 30, marginBottom: 20 }}>
                        <Text style={{ fontWeight: 'bold' }}>@{user.get('user').get('username')}</Text> elegí el residuo a modificar
                    </Text>
                    <View style={styles.wasteTabContainer}>
                        {stockCategories ? stockCategories.map(stockCategory => {
                            return <ManageWasteCategory key={stockCategory.id} onPress={handleManageProductPress} data={stockCategory} />
                        })
                            :
                            <View></View>
                        }
                    </View>
                </View >
            }
        </AuthorizedScreen>
    );
};

export default ManageWasteActionsScreen;