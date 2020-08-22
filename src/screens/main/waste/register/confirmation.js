import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { resetWasteContainers } from '../../../../redux/waste/register/actions';
import Parse from 'parse/react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../../../constants/colors';

const CongratulationsScreen = props => {

    const wastesToRegister = useSelector(state => state.registerWaste);
    const account = useSelector(state => state.user.account);
    const address = useSelector(state => state.user.address);
    const dispatch = useDispatch();

    const handleRegisterButton = async () => {
        try {
            const containers = wastesToRegister.map(waste => { return { typeId: waste.id, qty: waste.qty } });
            const addressId = address.id;
            const params = {
                containers,
                addressId
            };
            const result = await Parse.Cloud.run('registerRecover', params);
            dispatch(resetWasteContainers(true))
            props.navigation.navigate('Congratulations', { data: result });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView style={styles.scrollViewWrapper} >

            <View style={{ width: '100%', height: 175, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: '50%', resizeMode: 'contain' }} source={require('../../../../../assets/img/save_the_planet.png')} />
            </View>

            <View>
                <Text style={{
                    textAlign: 'center',
                    paddingHorizontal: 40,
                    marginBottom: 20,
                    fontSize: 20,
                    fontFamily: 'Nunito-Regular',
                    color: '#5a5d6c'
                }}>
                    <Text style={{ fontWeight: 'bold' }}>@{account.get('user').get('username')}</Text>, verificá que la información sea correcta!
                </Text>
            </View>

            <View>
                <Text style={{
                    textAlign: 'center',
                    paddingHorizontal: 40,
                    marginBottom: 20,
                    fontSize: 16,
                    fontFamily: 'Nunito-Regular',
                    color: '#7f7f7f'
                }}>
                    Estás por registrar residuos, si toda la información está correcta, presioná <Text style={{ fontFamily: 'Nunito-Bold' }}>REGISTRAR</Text> para continuar
                </Text>
            </View>

            <View style={{ paddingHorizontal: 50, paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                <View>
                    {wastesToRegister ?
                        wastesToRegister.map(wasteType => {
                            return (
                                <View key={wasteType.id} style={{}}>
                                    <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 22, color: colors.greyText }}>
                                        {wasteType.item.get('name')}
                                        <Text style={{ fontSize: 14 }}>  {wasteType.qty} {wasteType.qty == 1 ? wasteType.item.get('container') : wasteType.item.get('containerPlural')}</Text>
                                    </Text>
                                </View>
                            )
                        })
                        : <View><Text>No registraste residuos</Text></View>
                    }
                </View>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: colors.separator,
                borderTopWidth: 1,
                borderTopColor: colors.separator,
                paddingVertical: 5,
                marginVertical: 20
            }}>
                <MaterialCommunityIcons name="map-marker-radius" color={'black'} size={30} />
                <Text style={{ maxWidth: '80%', padding: 15, marginHorizontal: 10, color: colors.greyText }}>
                    {address.get('street')} - {address.get('city')}, {address.get('state')}
                </Text>
            </View>

            <View style={{ paddingHorizontal: 40, marginBottom: 20, }}>
                <TouchableOpacity onPress={handleRegisterButton} style={{ marginBottom: 5, height: 45, backgroundColor: colors.colmenaGreen, borderRadius: 5, justifyContent: 'center', }} >
                    <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Nunito-SemiBold', fontSize: 16 }}>
                        REGISTRAR
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
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

export default CongratulationsScreen;