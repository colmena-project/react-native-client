import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import colors from '../../../styles/colors';
import stylesCommon from '../../../styles/login';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const wastesActionSelector = props => {

    const handleModify = () => {
        console.log('MODIFICAR');
    };

    const handleTransfer = () => {
        console.log('TRANSFERIR');
    };

    const handleTransport = () => {
        console.log('TRANSPORTAR');
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
                    <TouchableOpacity onPress={handleModify} style={styles.actionButton}>
                        <Image
                            style={styles.actionButtonIcon}
                            source={require('../../../../assets/icons/png/icon-registrar-gestionar.png')}
                        />
                        <Text style={styles.actionButtonText}>Modificar</Text>
                        <MaterialIcons name={'chevron-right'} size={36} color={'#e8e8e8'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleTransfer} style={styles.actionButton}>
                        <Image
                            style={styles.actionButtonIcon}
                            source={require('../../../../assets/icons/png/icon-transferir.png')}
                        />
                        <Text style={styles.actionButtonText}>Transferir</Text>
                        <View style={styles.actionButtonIcon}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleTransport} style={styles.actionButton}>
                        <Image
                            style={styles.actionButtonIcon}
                            source={require('../../../../assets/icons/png/icon-transportar.png')}
                        />
                        <Text style={styles.actionButtonText}>Transportar</Text>
                        <View style={styles.actionButtonIcon}></View>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>
                        Elija <Text style={styles.boldText}>Modificar</Text> si necesita agregar/eliminar sus residuos en el sistema.
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.boldText}>Transferir</Text> para entregar a un transportista.
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.boldText}>Transportar</Text> si quiere transportar usted mismo sus residuos a un centro de reciclaje.
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
        backgroundColor: '#e8e8e8',
    },
    actionButtonText: {
        fontSize: 18,
    },
    actionButtonIcon: {
        width: 36,
        height: 36,
        borderRadius: 50,
        overflow: 'hidden',
        resizeMode: 'contain',
    },
});

export default wastesActionSelector;