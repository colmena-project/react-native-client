import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import colors from '../../../styles/colors';
import stylesCommon from '../../../styles/login';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ActionSelector = props => {

    const [isEnabled, setIsEnabled] = useState(false);

    const handleRegisterWaste = () => {
        console.log('REGISTER WASTE');
    };

    const handleTransport = () => {
        console.log('TRANSPORTAR DE OTROS');
    };

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.brand}>
                    <Image
                        style={stylesCommon.colmenaLogo}
                        source={require('../../../../assets/colmena-app-ico.png')}
                    />
                    <Text style={{ ...stylesCommon.brandText, color: colors.colmenaGreen }}>Colmena</Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.colmenaHeaderSubtitle}>¿Qué quieres hacer?</Text>
                </View>

                <View stype={{ backgroundColor: 'green' }}>
                    <TouchableOpacity onPress={handleRegisterWaste} style={styles.actionButton}>
                        <Image
                            style={styles.actionButtonIcon}
                            source={require('../../../../assets/icons/png/icon-registrar-gestionar.png')}
                        />
                        <Text style={styles.actionButtonText}>Registrar mis residuos</Text>
                        <View style={styles.actionButtonIcon}></View>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!isEnabled} onPress={handleTransport} style={styles.actionButton}>
                        <Image
                            style={styles.actionButtonIcon}
                            source={require('../../../../assets/icons/png/icon-transportar.png')}
                        />
                        <Text style={isEnabled ? styles.actionButtonText : styles.actionButtonTextInactive}>Transportar de otros</Text>
                        <View style={styles.actionButtonIcon}></View>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>
                        Si tiene residuos para registar, elija <Text style={styles.boldText}>Registrar</Text>.
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.boldText}>Transportar</Text> si quiere recolectar residuos de otras personas.
                    </Text>
                </View>
            </View>
        </View>
    )
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
        fontSize: 18,
    },
    actionButtonTextInactive: {
        fontSize: 18,
        color: '#d8d8d8',
    },
    actionButtonIcon: {
        width: 36,
        height: 36,
        borderRadius: 50,
        overflow: 'hidden',
        resizeMode: 'contain',
    },
});

export default ActionSelector;