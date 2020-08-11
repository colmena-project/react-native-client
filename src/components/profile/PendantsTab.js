import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import colors from '../../constants/colors';
import Activity from '../pendants/Activity';


const PendantsTab = props => {

    const userAccount = props.userAccount;
    const transactions = props.transactions;

    return (
        <ScrollView style={{ flex: 1 }}>
            {transactions == null ? <ActivityIndicator style={{ flex: 1 }} size={'large'} color={colors.colmenaGreen} /> :
                transactions.length > 0 ?
                    transactions.map((transaction, index) => {
                        return <Activity user={userAccount} transaction={transaction} key={index} />
                    })
                    :
                    <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Image style={{ resizeMode: 'contain', width: '80%', height: '80%' }} source={require('../../../assets/profile/empty_transactions.png')} />
                        <Text style={{ paddingHorizontal: 20, fontFamily: 'Nunito-Light', fontSize: 18, color: '#4B4B4B' }}>
                            No tenés actividades pendientes. Intenta con el menú de acciones.
                    </Text>
                    </View>
            }
        </ScrollView>
    );
};

export default PendantsTab;