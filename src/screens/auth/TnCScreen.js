import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native'
import { useDispatch } from 'react-redux';
import Parse from 'parse/react-native';
import { styles, theme } from '../../constants/styles';
import colors from '../../constants/colors';
import HTML from 'react-native-render-html';

const TnCScreen = props => {

    const fields = {
        email: '',
        password: '',
    };

    const [htmlContent, setHtmlContent] = useState(null);
    const [isOnBottom, setIsOnBottom] = useState(false);

    const fetchData = async () => {
        try {
            const content = await new Parse.Query('HtmlContent').equalTo('type', 'terms_conditions').first();
            setHtmlContent(content.get('content'));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const [inputs, setInputs] = useState(fields);
    const [errorMessages, setErrorMessages] = useState(fields);
    const [isLoading, setIsloading] = useState(false);
    const dispatch = useDispatch();

    const handleAcceptTnC = () => {
        props.navigation.navigate('Register')
    };

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    };

    const showBtn = timeout => {
        setTimeout(() => {
            setIsOnBottom(true);
        }, timeout);
    };

    const tagStyles = {
        p: {
            color: colors.primaryGunMetal,
            fontFamily: 'NunitoSans-Regular',
        },
    };

    return (
        <View style={styles.screen}>
            {isLoading ? <ActivityIndicator style={styles.screen} size={'large'} color={colors.primaryOldMossGreen} /> :
                <View style={{ flex: 1, width: '100%' }}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Image style={{ ...styles.screenLogoLogin, marginTop: 10, marginBottom: 10 }} resizeMode="contain" source={require('../../../assets/colmena_brand.png')} />
                    </View>
                    {htmlContent ?
                        <ScrollView decelerationRate={0.99} onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                showBtn(150);
                            }
                        }} style={{ width: '100%', marginTop: 10, paddingLeft: 30, paddingRight: 30 }} >
                            <View>

                                <HTML tagsStyles={tagStyles} html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} />

                            </View>


                            <View style={{ width: '100%', marginTop: 20, marginBottom: 40 }}>
                                <TouchableOpacity disabled={!isOnBottom} style={isOnBottom ? styles.btnPrimary : styles.btnDisabled} onPress={handleAcceptTnC}>
                                    <Text style={{ ...styles.btnTextWhite, letterSpacing: 0 }}>
                                        ACEPTAR Y CONTINUAR
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                        : <View></View>}
                </View>
            }
        </View >
    )
};

export default TnCScreen;