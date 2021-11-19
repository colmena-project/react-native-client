import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, Switch, Linking} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../constants/colors';


const About = props => {
    const handleTerms = () =>{
        Linking.openURL("https://google.com");
    }
    const handleJellyCoin = () =>{
        props.navigation.navigate('AboutJellyCoin');
    }


    return (
        <View style={{ flex: 1, backgroundColor: colors.colmenaBackground }}>            
            <ScrollView style={{
                paddingHorizontal: 15,
                paddingTop: 8,
                flex: 1,
            }}>
                <View style={styles.inputsContainer}>
                    <Text style={styles.aboutText}>En Colmena APP Promovemos una economía colaborativa, circular, sustentable y eficiente, redefiniendo las posibilidades de reutilización y reciclado. Contribuí a una comunidad más limpia y amigable con el medio ambiente. Reducí tu huella de carbono y obtené beneficios con la criptomoneda JellyCoin.</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <TouchableOpacity onPress={handleJellyCoin} style={styles.changePassword}>
                        <Text>Criptomoneda jellyCoin</Text>
                        <MaterialIcons name={'chevron-right'} size={36} color={colors.colmenaGreen} />
                    </TouchableOpacity>                       
                    <TouchableOpacity onPress={handleTerms} style={styles.changePassword}>
                        <Text>Términos y condiciones</Text>
                        <MaterialIcons name={'chevron-right'} size={36} color={colors.colmenaGreen} />
                    </TouchableOpacity>
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

export default About;