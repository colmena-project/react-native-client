import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, Switch, Linking} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../constants/colors';


const AboutJellyCoin = props => {
    return (
        <View style={{ flex: 1, backgroundColor: colors.colmenaBackground }}>            
            <ScrollView style={{
                paddingHorizontal: 15,
                paddingTop: 8,
                flex: 1,
            }}>
                <View style={styles.inputsContainer}>
                    <Text style={styles.aboutText}>Uno de los principales costos para la industria recicladora es la clasificación de los materiales reciclables, promocionar la clasificación adecuada de los residuos en origen permite reducir estos costos, adquiriendo las criptomonedas jellycoin, parte de este beneficio obtenido se transfiere a la billetera de los usuarios por la separación y el transporte.</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <Text style={styles.aboutText}>De esta manera, los jellycoin  serán acreditados desde los lugares de recepción de los materiales reciclables, sean por procesos manuales o automáticos. Podrán utilizarse para pagar los servicios de socios y patrocinadores oficiales del ecosistema Colmena.  También podrán intercambiarse en los comercios adheridos por otros activos digitales.</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <Text style={styles.aboutText}>El documento oficial (Whitepaper de jelly...</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 8,
        flex: 1,
    },
    changePassword: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        padding: 5,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#e8e8e8',
    },
    inputsContainer: {
        marginBottom: 30,
    },
    aboutText: {
        color: colors.colmenaGrey,
        fontFamily: 'Nunito-Regular',
        fontSize: 20
    },
});

export default AboutJellyCoin;