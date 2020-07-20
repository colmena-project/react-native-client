import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import colors from '../../../../constants/colors';

const WasteActions = props => {


    return (
        <View style={styles.scrollViewWrapper} >


            <View>
                <Text style={{
                    textAlign: 'center',
                    paddingHorizontal: 40,
                    marginVertical: 25,
                    fontSize: 16,
                    fontFamily: 'Nunito-Regular',
                    color: '#7f7f7f'
                }}>
                    Puedes registrar tus residuos y ver la retribución estimada en JellyCoins <Text style={{ fontWeight: 'bold' }}>jyc</Text> ingresando botellas / tapitas.
                </Text>

                <View style={{ width: '100%', borderTopColor: '#EDEDED', borderTopWidth: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', borderBottomColor: '#EDEDED', borderBottomWidth: 1, paddingVertical: 10 }}>
                        <View style={{ width: 80 }}>
                            <View>
                                <Image style={{ width: 80, height: 80, resizeMode: 'contain' }} source={require('../../../../../assets/profile/profile_bottles.png')} />
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 13, color: '#7f7f7f', marginTop: 5, textAlign: 'center' }}>Plástico PET</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <TouchableOpacity style={{ alignItems: 'center', width: 30, height: 30, backgroundColor: '#7f7f7f', borderRadius: 50 }} onPress={() => console.log('Menos')}>
                                    <Text style={{ textAlign: 'center', fontFamily: 'Nunito-SemiBold', fontSize: 24, color: 'white', position: 'absolute', top: -11 }}>_</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                                <View>
                                    <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 24 }}>10</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 13, color: '#7f7f7f', marginTop: 5 }}>Bolsas</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity style={{ alignItems: 'center', width: 30, height: 30, backgroundColor: colors.colmenaGreen, borderRadius: 50 }} onPress={() => console.log('Más')}>
                                    <Text style={{ textAlign: 'center', fontFamily: 'Nunito-SemiBold', fontSize: 24, color: 'white', position: 'absolute', top: -4 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: 80 }}>
                            <View>
                                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 24, color: colors.colmenaGreen }}>100 jyc</Text>
                            </View>
                            <View>
                                <Text style={{ textAlign: 'center', fontFamily: 'Nunito-Regular', fontSize: 13, color: '#7f7f7f', marginTop: 5 }}>Estimado</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', borderBottomColor: '#EDEDED', borderBottomWidth: 1, paddingVertical: 10 }}>
                        <View style={{ width: 80 }}>
                            <View>
                                <Image style={{ width: 80, height: 80, resizeMode: 'contain' }} source={require('../../../../../assets/profile/profile_caps.png')} />
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 13, color: '#7f7f7f', marginTop: 5, textAlign: 'center' }}>Tapitas PP</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <TouchableOpacity style={{ alignItems: 'center', width: 30, height: 30, backgroundColor: '#7f7f7f', borderRadius: 50 }} onPress={() => console.log('Menos')}>
                                    <Text style={{ textAlign: 'center', fontFamily: 'Nunito-SemiBold', fontSize: 24, color: 'white', position: 'absolute', top: -11 }}>_</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                                <View>
                                    <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 24 }}>10</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 13, color: '#7f7f7f', marginTop: 5 }}>Bolsas</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity style={{ alignItems: 'center', width: 30, height: 30, backgroundColor: colors.colmenaGreen, borderRadius: 50 }} onPress={() => console.log('Más')}>
                                    <Text style={{ textAlign: 'center', fontFamily: 'Nunito-SemiBold', fontSize: 24, color: 'white', position: 'absolute', top: -4 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: 80 }}>
                            <View>
                                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 24, color: colors.colmenaGreen }}>100 jyc</Text>
                            </View>
                            <View>
                                <Text style={{ textAlign: 'center', fontFamily: 'Nunito-Regular', fontSize: 13, color: '#7f7f7f', marginTop: 5 }}>Estimado</Text>
                            </View>
                        </View>
                    </View>



                </View>
            </View>


            <View style={{ marginBottom: 20 }}>
                <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => { }} >
                    <Text style={{ textAlign: 'center', color: colors.colmenaGreen, fontFamily: 'Nunito-SemiBold', fontSize: 16 }}>
                        SIGUIENTE
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};



const styles = StyleSheet.create({
    scrollViewWrapper: {
        flex: 1,
        padding: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: colors.colmenaBackground,
        justifyContent: 'space-between'
    },
    scrollView: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 8,
        flex: 1,
    },
    brand: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    brandText: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 26,
        color: colors.colmenaGrey,
        marginLeft: 30,
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileHeader: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED'
    },
    profilePicture: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        overflow: 'hidden',
    },
    name: {
        fontFamily: 'Nunito-Regular',
        fontSize: 12
    },
    locationInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    titleTexts: {
        color: '#4C4C4C',
        fontFamily: 'Nunito-Regular'
    },
    aboutMeInfo: {
        margin: 5,
    },
    aboutMeText: {
        textAlign: 'justify',
        fontFamily: 'Nunito-Light',
        color: '#4C4C4C',
    },
    btnContainer: {
        width: '100%',
        marginTop: 10,
    },
    editInfoBtn: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.colmenaGreen,
        borderRadius: 5,
        paddingVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    editInfoBtnText: {
        textAlign: 'center',
        color: colors.colmenaGreen,
        fontFamily: 'Nunito-Regular',
        fontSize: 16
    },
    activityContainer: {
        flex: 3,
        paddingHorizontal: 20
    },
    brandText: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
    },
    activityTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
        fontSize: 18,
        color: '#4C4C4C',
        paddingVertical: 10,
        marginLeft: 0,
        marginTop: 15
    },
    activityExtraInfo: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
        fontSize: 18,
        color: '#4C4C4C',
        paddingVertical: 10,
        marginLeft: 0,
        marginTop: 15
    },
    activityExtraInfoDetail: {
        fontSize: 12,
        fontFamily: 'Nunito-Light',
        marginLeft: 10,
    },
    tabBarContainer: {
        flex: 1,
    },
    tabBar: {  // Íconos de los tabs
        flexDirection: 'row',
        marginTop: 15,
    },
    tabItem: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 10,
        marginLeft: 0,
        borderBottomWidth: 3,
    },
    tabContent: {
        flex: 1,
        justifyContent: 'flex-start',
    },


    wasteTabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED'
    },
    locationTabContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED'
    },


    wasteInfoContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED'
    },
    wasteCardsContainer: {
        paddingVertical: 20,
        paddingLeft: 20,
    },
    wasteTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 18,
        color: '#4c4c4c',
        marginBottom: 10,
    },
    wasteCardTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 10,
        color: '#6E7989',
        backgroundColor: '#D8DAE0',
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 3,
        marginBottom: 5,
        textTransform: 'uppercase',
    },
    wasteDescription: {
        textAlign: 'left',
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        color: '#4C4C4C',
    },
    impactDescription: {
        textAlign: 'left',
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        color: '#4C4C4C',
    },
    wasteCard: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 115,
        height: 165,
        padding: 10,
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
    wasteItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 165,
        padding: 10,
        marginRight: 10,
    },
    impactTitle: {
        color: colors.colmenaGreen,
        fontFamily: 'Nunito-Regular',
        fontSize: 20
    },
    impactImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain'
    },
    wasteImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    impactDescription: {
        textAlign: 'center',
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        color: '#4C4C4C',
    },
    activityContainer: {
        flex: 3,
        paddingHorizontal: 20
    },
    activityTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
        fontSize: 18,
        color: '#4C4C4C',
        paddingVertical: 10,
        marginLeft: 0,
        marginTop: 15
    },
    activityExtraInfo: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
        fontSize: 18,
        color: '#4C4C4C',
        paddingVertical: 10,
        marginLeft: 0,
        marginTop: 15
    },
    activityExtraInfoDetail: {
        fontSize: 12,
        fontFamily: 'Nunito-Light',
        marginLeft: 10,
    },


});

export default WasteActions;