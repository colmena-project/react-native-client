import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import colors from '../../../constants/colors';
import styles from '../../../constants/profileStyles';
import Activity from '../../../components/pendants/Activity';
import Parse from 'parse/react-native';

const PendantsScreen = props => {

    const [transactions, setTransactions] = useState(null);
    const [userAccount, setUserAccount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const actualState = useSelector(state => state.user);
    const navigation = useNavigation();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            // const transportTransactions = actualState.transactions;
            const transportTransactions = actualState.transactions.filter(transaction => transaction.get('type') === 'TRANSPORT');
            setUserAccount(actualState.account);
            setTransactions(transportTransactions);
            setIsLoading(false);
        } catch (err) {
            console.log('Profile Index error: ' + err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={{ ...styles.scrollViewWrapper, paddingHorizontal: 20, paddingTop: 20 }}>
            {isLoading ? <ActivityIndicator style={{ flex: 1 }} size={'large'} color={colors.colmenaGreen} /> :
                transactions && transactions.length > 0 ?
                    <ScrollView style={{ flex: 1 }}>
                        {transactions.map((transaction, index) => {
                            return <Activity user={userAccount} transaction={transaction} key={index} />
                        })}
                    </ScrollView>
                    :
                    <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Image style={{ resizeMode: 'contain', width: '80%', height: '80%' }} source={require('../../../../assets/profile/empty_transactions.png')} />
                        <Text style={{ paddingHorizontal: 20, fontFamily: 'Nunito-Light', fontSize: 18, color: '#4B4B4B' }}>
                            No tenés actividades pendientes. Intenta con el menú de acciones.
                    </Text>
                    </View>
            }
        </View>
    );
};

export default PendantsScreen;