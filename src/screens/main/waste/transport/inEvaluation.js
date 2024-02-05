import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import styles from '../../../../constants/profileStyles';
import colors from '../../../../constants/colors';

const TransportInEvaluationScreen = props => {

    const materialRetribution = useSelector(state => state.transportInfo.materialRetribution);
    const transportRetribution = useSelector(state => state.transportInfo.transportRetribution);

    const handleSeePendingRequests = () => {
        props.navigation.navigate('Pendants');
    };

    return (
        <View style={{ ...styles.scrollViewWrapper, paddingTop: 60 }} >
            <View style={componentStyle.imageContainer}>
                <View style={componentStyle.imageWrapper}>
                    <Image style={componentStyle.image} source={require('../../../../../assets/img/waste_transport.png')} />
                </View>
            </View>
            <Text style={componentStyle.descriptionText}>
                Felicidades! Ya podés llevar tus residuos al Centro de Reciclaje elegido!
            </Text>
            <View style={componentStyle.retributionContainer}>
                {/* <View style={{ width: '100%', alignItems: 'flex-end', paddingVertical: 5 }}>
                            <Text style={componentStyle.smallGreyText}>Por acopiar aprox</Text>
                            <Text style={componentStyle.normalGrayText}>300 JYC</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 5 }}>
                            <View>
                                <Text style={componentStyle.smallGreyText}>Distancia <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 18, color: colors.colmenaGreen }}>30km</Text></Text>
                                <Text style={componentStyle.smallGreyText}>x Km <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 18, color: colors.colmenaGreen }}>1 JYC / bolsa</Text></Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', paddingLeft: 30 }}>
                                <Text style={componentStyle.smallGreyText}>Por transportar aprox</Text>
                                <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 26, color: colors.colmenaGreen }}>90 JYC</Text>
                            </View>
                        </View> */}
                <View style={componentStyle.estimatedContainer}>
                    <Text style={componentStyle.estimatedText}>
                        Retribución estimada:
                            </Text>
                    <Text style={componentStyle.estimatedAmmount}>{(materialRetribution + transportRetribution).toFixed(2)} JYC</Text>
                </View>
            </View>
            <TouchableOpacity onPress={handleSeePendingRequests}>
                <Text style={componentStyle.btn}>
                    VER ACTIVIDADES PENDIENTES
                </Text>
            </TouchableOpacity>
        </View >
    );
};

const componentStyle = StyleSheet.create({
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 15,
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    image: {
        height: 175,
        resizeMode: 'contain'
    },
    descriptionText: {
        paddingHorizontal: 40,
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Nunito-Regular',
        color: '#7f7f7f'
    },
    retributionContainer: {
        paddingHorizontal: 40,
        justifyContent: 'center'
    },
    estimatedContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 25
    },
    estimatedText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 20,
        color: colors.greyText
    },
    estimatedAmmount: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 45,
        color: colors.primaryGunMetal
    },
    btn: {
        textAlignVertical: 'center',
        textAlign: 'center',
        color: colors.colmenaGreen,
        fontFamily: 'Nunito-SemiBold',
        fontSize: 16
    },
});

export default TransportInEvaluationScreen;