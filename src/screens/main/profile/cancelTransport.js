import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Parse } from 'parse/react-native';
import AuthorizedScreen from '../../../components/auth/AuthorizedScreen';
import colors from '../../../constants/colors';

const TransportCancel = props => {

    const [reason, setReason] = useState('');
    const transaction = props.route.params.transaction;
    const [isLoading, setIsLoading] = useState(false);

    const handleShowConfirmationAlert = () => {
        try {
            if (reason == '') {
                throw new Error('Ingrese un motivo.');
            }
            Alert.alert(
                'Cancelar transporte',
                '¿Está seguro/a que desea cancelar el transporte?',
                [
                    {
                        text: 'Cancelar',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'Sí, continuar',
                        onPress: handleRegisterTransportCancel
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const handleRegisterTransportCancel = async () => {
        setIsLoading(true);
        try {
            await Parse.Cloud.run('registerTransportCancel', { transactionId: transaction.id });
            transaction.set('reason', 'Motivo');
            transaction.save();
            Alert.alert('Transacción cancelada', 'La transacción fue correctamente cancelada.');
            props.navigation.navigate('Pendants');
        } catch (error) {
            Alert.alert(error.message);
        }
        setIsLoading(false);
    };

    const handleUpdateReason = value => {
        setReason(value);
    };

    return (
        <AuthorizedScreen style={{ flex: 1 }}>
            {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.text}>Estás por cancelar el transporte</Text>
                        </View>

                        <View style={styles.reasonInputContainer}>
                            <Text style={styles.text}>Explica el motivo</Text>
                            <View style={{ width: '100%', height: 200 }}>
                                <TextInput
                                    style={styles.textInput}
                                    autoFocus={true}
                                    multiline={true}
                                    numberOfLines={18}
                                    value={reason}
                                    onChangeText={handleUpdateReason}
                                />
                            </View>
                        </View>

                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={handleShowConfirmationAlert}>
                                <Text style={styles.btnSubmitText}>ENVIAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            }
        </AuthorizedScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    reasonInputContainer: {
        marginVertical: 40,
        width: '100%',
    },
    text: {
        fontSize: 22,
        fontFamily: 'Nunito-Regular',
    },
    textInput: {
        textAlignVertical: 'top',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        marginTop: 10,
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    btnContainer: {
        width: '100%',
    },
    btn: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: colors.colmenaGreen,
        borderRadius: 5,
    },
    btnSubmitText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontFamily: 'Nunito-Bold'
    }
});

export default TransportCancel;
