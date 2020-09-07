import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Activity = props => {

    const navigation = useNavigation();
    const user = props.user;
    const transaction = props.transaction;
    const date = `${transaction.get('createdAt').getDate()}/${transaction.get('createdAt').getMonth() + 1}/${transaction.get('createdAt').getFullYear()}`;
    const hour = `${transaction.get('createdAt').getHours()}:${transaction.get('createdAt').getMinutes()}`;
    const type = 'En tránsito';
    const defaultUserImg = require('../../../assets/default_user_1.png');

    const handleAskReason = () => {
        navigation.navigate('Cancel Transport', { transaction });
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={styles.actionButtonIcon}
                    source={user && user.get('avatar') ? { uri: user.get('avatar')._url } : require('../../../assets/default_user_1.png')}
                />
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.actionButtonText}>{transaction.get('from') ? '@' + transaction.get('from').get('username') : ''}</Text>
                    <Text style={styles.actionButtonTextSecondary}>{type}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.actionButtonTextSecondary}>{date} - {hour}</Text>
                        <Image
                            style={styles.actionButtonSecondary}
                            source={require('../../../assets/icons/svg/arrow-out.svg')}
                        />
                    </View>
                </View>
            </View>
            <Image
                style={styles.actionButtonIcon}
                source={require('../../../assets/icons/red_arrow.png')}
            />
            <TouchableOpacity onPress={handleAskReason}>
                <FontAwesome name={'trash'} size={24} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.colmenaBackground,
    },
    container: {
        width: '100%',
        padding: 25,
    },
    brand: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        paddingBottom: 35,
        paddingTop: 35,
    },
    colmenaHeaderSubtitle: {
        width: '100%',
        textAlign: 'center',
        fontSize: 24,
        color: '#686868',
    },
    text: {
        width: '100%',
        textAlign: 'justify',
    },
    boldText: {
        fontWeight: 'bold',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 55,
        marginTop: 20,
        padding: 5,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#eeeeee',
    },
    actionButtonText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
    },
    actionButtonTextSecondary: {
        fontSize: 12,
    },
    actionButtonIcon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden',
        resizeMode: 'contain',
    },
    actionButtonSecondary: {
        alignItems: 'center',
        marginLeft: 10,
        width: 18,
        height: 18,
        borderRadius: 50,
        overflow: 'hidden',
        resizeMode: 'contain',
    },
});

export default Activity;