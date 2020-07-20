import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';

import ManageWasteItem from '../../../../components/waste/ManageWasteItem';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import colors from '../../../../constants/colors';
import { ActivityIndicator } from 'react-native-paper';


const WasteActions = props => {

    const [wasteContainers, setWasteContainers] = useState(null);
    const [checkedContainers, setCheckedContainers] = useState(null);

    const fetchWasteData = async () => {
        try {
            // fetch data
            const data = getDummyData();
            const decoratedData = data.map(wasteContainer => {
                return { ...wasteContainer, isChecked: false };
            })
            setWasteContainers(decoratedData);
        } catch (error) {
            console.log(error);
        }
    };

    const getDummyData = () => {
        return [
            { id: 1234, name: 'PET' },
            { id: 1235, name: 'PET' },
            { id: 1236, name: 'PET' },
            { id: 1237, name: 'PET' },
            { id: 1238, name: 'PET' },
            { id: 1239, name: 'PET' },
            { id: 1240, name: 'PET' },
            { id: 1241, name: 'PET' },
            { id: 1242, name: 'PET' },
            { id: 1243, name: 'PET' },
            { id: 1244, name: 'PET' },
        ];
    };

    const handleOnToogleCheck = (status, id) => {
        const updatedWasteContainers = wasteContainers.map(wasteContainer => {
            if (wasteContainer.id === id) wasteContainer.isChecked = status;
            return wasteContainer;
        });
        setWasteContainers(updatedWasteContainers);
    };

    useEffect(() => {
        filterCheckedContainers();
    }, [wasteContainers]);

    useEffect(() => {
        fetchWasteData();
    }, []);

    const filterCheckedContainers = () => {
        if (wasteContainers && wasteContainers.length > 0) {
            const chkContainers = wasteContainers.filter(wasteContainer => wasteContainer.isChecked);
            setCheckedContainers(chkContainers);
        };
    };

    const handleDeleteCheckedContainers = () => {
        try {
            Alert.alert(
                'Borrar contenedores',
                '¿Desea continuar?',
                [
                    {
                        text: 'Cancelar',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'Sí, continuar',
                        onPress: Alert.alert('Contenedores borrados correctamente.')
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <View style={styles.scrollViewWrapper} >
            <View style={styles.wasteTabContainer}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ resizeMode: 'contain', width: 100, height: 100 }} source={require('../../../../../assets/profile/profile_bottles.png')} />
                    <Text style={styles.wasteDescription}>
                        Plástico PET ({wasteContainers && wasteContainers.length > 0 ? wasteContainers.length : ''})
                    </Text>
                    <View style={{ backgroundColor: colors.colmenaGreen, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 3, position: 'absolute', top: 40 }}>
                        <Text style={{ fontFamily: 'Nunito-SemiBold', color: 'white' }}>PET - XXX</Text>
                    </View>
                </View>

                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', paddingRight: 20 }}>
                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 16 }}>Selecciona a continuación los contenedores a eliminar o bien puedes agregar más a tu stock</Text>
                </View>
            </View>

            <ScrollView>
                {(wasteContainers && wasteContainers.length > 0) ?
                    wasteContainers.map(item => {
                        return <ManageWasteItem key={item.id} wasteContainer={item} isChecked={status => handleOnToogleCheck(status, item.id)} />
                    })
                    : <View></View>}
            </ScrollView>


            <View style={{ paddingTop: 10, paddingBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                {checkedContainers && checkedContainers.length > 0 ?
                    <View>
                        <TouchableOpacity onPress={handleDeleteCheckedContainers} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons style={{ textAlign: 'center', textAlignVertical: 'center', width: 45, height: 45, borderWidth: 1, borderColor: colors.colmenaGreen, padding: 10, borderRadius: 50 }} name={'md-trash'} size={26} color={colors.colmenaGreen} />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: 'Nunito-Regular', color: '#7f7f7f' }}>Eliminar ({checkedContainers.length})</Text>
                    </View>
                    :
                    <View>
                        <TouchableOpacity onPress={handleDeleteCheckedContainers} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <AntDesign name={'pluscircle'} size={42} color={colors.colmenaGreen} />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: 'Nunito-Regular', color: '#7f7f7f' }}>Agregar nuevo</Text>
                    </View>
                }
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
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'white'
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
        width: '100%',
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