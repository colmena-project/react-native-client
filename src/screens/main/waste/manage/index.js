import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView,FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../../../constants/profileStyles';
import AuthorizedScreen from '../../../../components/auth/AuthorizedScreen';
import ManageWasteCategory from '../../../../components/waste/ManageWasteCategory';
import colors from '../../../../constants/colors';
import UserService from '../../../../services/User';
import WasteService from '../../../../services/Waste';

const ManageWasteActionsScreen = props => {

    const user = useSelector(state => state.user.account);
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
        props.navigation.navigate('ManageWaste', { type });
    };

    return (
        <AuthorizedScreen>
            {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                <View style={{ ...styles.scrollViewWrapper, justifyContent: 'center'}} >
                    <View style={{ ...styles.scrollView_Wrapper, justifyContent: 'center'}} >
                        <Text style={{textAlign: 'center', fontFamily: 'Nunito-Regular', fontSize: 20, paddingHorizontal: 30, marginBottom: 20}}>
                            {/* <Text style={{ fontWeight: 'bold' }}>@{user.get('user').get('username')}</Text> elegí el residuo a modificar */}
                            <Text style={{ fontWeight: 'bold' }}>{user.get('user').get('firstName')}</Text> elegí el residuo a modificar
                        </Text>
                        
                        <ScrollView style={styles.wasteTab_Container} horizontal={true}>
                            {wasteTypes && wasteTypes.map(wasteType => {
                                return <ManageWasteCategory key={wasteType.id} onPress={handleManageProductPress} wasteType={wasteType} containers={containers} />
                            })
                            }
                        </ScrollView>
                    </View >
                </View>
                
            }
        </AuthorizedScreen>
    );
};

export default ManageWasteActionsScreen;