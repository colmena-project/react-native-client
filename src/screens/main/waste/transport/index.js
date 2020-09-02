import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TransportWasteItem from '../../../../components/waste/TransportWasteItem';
import { addContainerToTransport, removeContainerToTransport } from '../../../../redux/waste/transport/actions';
import colors from '../../../../constants/colors';

const PickWasteForTransport = props => {

    const containers = useSelector(state => state.user.recoveredContainers);
    const PPId = 'GIw8hv4Dle';
    const PETId = 'WTMdIFLUFV';
    const dispatch = useDispatch();
    const [qtyToTransport, setQtyToTransport] = useState(0);

    const handleToogleCheck = (isChecked, container) => {
        if (isChecked) {
            setQtyToTransport(qtyToTransport + 1);
            dispatch(addContainerToTransport(container));
        } else {
            setQtyToTransport(qtyToTransport - 1);
            dispatch(removeContainerToTransport(container));
        }
    };

    const handleNextButton = () => {
        props.navigation.navigate('PickTransportDestiny');
    };

    return (
        <View style={styles.scrollViewWrapper} >

            <Text style={{
                paddingHorizontal: 40,
                marginTop: 25,
                textAlign: 'justify',
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
                color: '#7f7f7f'
            }}>
                Elija las bolsas / cajas / botellas que desea transportar, viendo su código de identificación.
            </Text>

            <View style={styles.wasteTabContainer}>
                <View style={{ alignItems: 'center', width: 200 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ resizeMode: 'contain', width: 100, height: 100 }} source={require('../../../../../assets/profile/profile_bottles.png')} />
                        <Text style={styles.wasteDescription}>
                            Plástico PET
                        </Text>
                        <View style={{ backgroundColor: colors.colmenaGreen, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 3, position: 'absolute', top: 40 }}>
                            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 22, color: 'white' }}>38</Text>
                        </View>
                    </View>
                    <ScrollView style={{ marginTop: 10, width: '80%' }}>
                        <View>
                            {containers && containers.length > 0 ?
                                containers.map(container => {
                                    if (container.get('type').id == PETId) {
                                        return <TransportWasteItem key={container.id} toogleCheck={isChecked => handleToogleCheck(isChecked, container)} container={container} />
                                    }
                                    return <View key={container.id}></View>
                                })
                                :
                                <View></View>
                            }
                        </View>
                    </ScrollView>
                </View>

                <View style={{ alignItems: 'center', width: 200 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ resizeMode: 'contain', width: 100, height: 100 }} source={require('../../../../../assets/profile/profile_caps.png')} />
                        <Text style={styles.wasteDescription}>
                            Tapitas PP
                        </Text>
                        <View style={{ backgroundColor: colors.colmenaGreen, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 3, position: 'absolute', top: 40 }}>
                            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 22, color: 'white' }}>27</Text>
                        </View>
                    </View>
                    <ScrollView style={{ marginTop: 10, width: '80%' }}>
                        <View>
                            {containers && containers.length > 0 ?
                                containers.map(container => {
                                    if (container.get('type').id == PPId) {
                                        return <TransportWasteItem key={container.id} toogleCheck={isChecked => handleToogleCheck(isChecked, container)} container={container} />
                                    }
                                    return <View key={container.id}></View>
                                })
                                :
                                <View></View>
                            }
                        </View>
                    </ScrollView>
                </View>

            </View>

            <View style={{ height: 100, paddingTop: 10, paddingHorizontal: 40 }}>
                <Text style={{ textAlign: 'center', color: colors.greyText, fontFamily: 'Nunito-SemiBold', fontSize: 16 }}>
                    Estimado: <Text style={{ color: 'black', fontSize: 20 }}>300 jyc</Text>
                </Text>
                <TouchableOpacity
                    disabled={!qtyToTransport}
                    style={{ marginVertical: 15 }}
                    onPress={handleNextButton} >
                    <Text
                        style={{ textAlign: 'center', color: qtyToTransport ? colors.colmenaGreen : colors.colmenaLightGrey, fontFamily: 'Nunito-SemiBold', fontSize: 16 }}>
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.separator
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

export default PickWasteForTransport;