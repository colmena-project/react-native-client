import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../../styles/colors';

const Activity = props => {

    const data = props.data;
    let type = 'En tránsito';

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={styles.actionButtonIcon}
                    source={require('../../../assets/default_user_2.png')}
                />
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.actionButtonText}>de Guillermo Colotti</Text>
                    <Text style={styles.actionButtonTextSecondary}>{type}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.actionButtonTextSecondary}>Ayer 5:39pm</Text>
                        <Image
                            style={styles.actionButtonSecondary}
                            source={require('../../../assets/default_user_2.png')}
                        />
                    </View>
                </View>
            </View>
            <Image
                style={styles.actionButtonIcon}
                source={require('../../../assets/icons/png/icon-transportar.png')}
            />
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
        fontSize: 16,
        fontWeight: 'bold'
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