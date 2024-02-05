import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Alert, ScrollView } from 'react-native'
import Parse from 'parse/react-native';
import { TextInput } from 'react-native-paper';
import { styles, theme } from '../../constants/styles';
import colors from '../../constants/colors';

const ForgotPasswordScreen = props => {

    const [email, setEmail] = useState(null);

    const handleRecoverPassword = async () => {
        try {
            const result = await Parse.User.requestPasswordReset(email);
        } catch (error) {
            console.log(error.message);
        }
        Alert.alert('Se envió un correo para resetear su password');
        props.navigation.navigate('Login');
    };

    return (
        <View style={styles.screen}>
            <ScrollView style={styles.container}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Image style={styles.screenLogoLogin} resizeMode="contain" source={require('../../../assets/colmena_brand.png')} />
                </View>
                <View style={{ width: '100%' }}>
                    <View style={{ fontFamily: 'NunitoSans-Regular', textAlign: 'justify' }}>
                        <Text style={{ marginBottom: 20 }}>A continuación, ingrese su email y le enviaremos un correo para recuperar su contraseña.</Text>
                        <Text style={{ marginBottom: 20 }}>Tenga en cuenta que el email debe ser válido y debe estar asociado a una cuenta.</Text>
                    </View>
                    <TextInput
                        style={styles.inputsStyle}
                        theme={theme}
                        underlineColor={colors.primaryDavysGray}
                        keyboardType={"email-address"}
                        label={'Email'}
                        value={email}
                        onChangeText={value => setEmail(value)}
                    />
                    <View style={{ width: '100%', marginTop: 40 }}>
                        <TouchableOpacity style={styles.btnPrimary} onPress={handleRecoverPassword}>
                            <Text style={styles.btnTextWhite}>
                                ENVIAR
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View >
    )
};

export default ForgotPasswordScreen;