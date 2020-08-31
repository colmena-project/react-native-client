import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ManageWasteItem from '../../../../components/waste/ManageWasteItem';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Parse from 'parse/react-native';
import colors from '../../../../constants/colors';
import styles from '../../../../constants/profileStyles';

import UserService from '../../../../services/User';
import WasteService from '../../../../services/Waste';


const ManageWasteScreen = props => {

    const type = props.route.params.type;
    const PPId = 'GIw8hv4Dle';
    const PETId = 'WTMdIFLUFV';
    const image = type == 'PET' ? require('../../../../../assets/profile/profile_bottles.png') : require('../../../../../assets/profile/profile_caps.png');
    const typeId = type == 'PET' ? PETId : PPId;
    const data = useSelector(state => state.user.recoveredContainers.filter(item => item.get('type').get('name') == type));;
    const address = useSelector(state => state.user.address);
    const [wasteContainers, setWasteContainers] = useState(null);
    const [checkedContainers, setCheckedContainers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchWasteData = async () => {
        try {
            const decoratedData = data.map(wasteContainer => {
                return { id: wasteContainer.id, container: wasteContainer, isChecked: false, isDeleted: false };
            })
            setWasteContainers(decoratedData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddContainer = async () => {
        try {
            setIsLoading(true);
            const params = {
                containers: [{ typeId: typeId, qty: 1 }],
                addressId: address.id
            };
            const result = await Parse.Cloud.run('registerRecover', params);
            UserService.fetchData(dispatch);
            fetchWasteData();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
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

    const deleteContainers = async () => {
        try {
            setIsLoading(true);
            if (wasteContainers && wasteContainers.length > 0) {
                const containersInput = [];
                wasteContainers.map(wasteContainer => {
                    if (wasteContainer.isChecked) {
                        containersInput.push(wasteContainer.container.id);
                    }
                });
                const result = await Parse.Cloud.run('deleteContainers', { containers: containersInput } );
                UserService.fetchData(dispatch);
                fetchWasteData();
            };
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log('Delete container error: ', error);
        }
    };

    const handleConfirmDeleteCheckedContainers = () => {
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
                        onPress: deleteContainers
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                <View style={styles.scrollViewWrapper} >
                    <View style={styles.wasteTabContainer}>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ resizeMode: 'contain', width: 100, height: 100 }} source={image} />
                            <Text style={styles.wasteDescription}>
                                {type} ({wasteContainers && wasteContainers.length > 0 ? wasteContainers.filter(item => !item.isDeleted).length : ''})
                    </Text>
                        </View>

                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', paddingRight: 20 }}>
                            <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 16 }}>Selecciona a continuación los contenedores a eliminar o bien puedes agregar más a tu stock</Text>
                        </View>
                    </View>

                    <ScrollView style={{ paddingTop: 10 }}>
                        {(wasteContainers && wasteContainers.length > 0) ?
                            wasteContainers.map(item => {
                                if (!item.isDeleted)
                                    return <ManageWasteItem key={item.id} wasteContainer={item} isChecked={status => handleOnToogleCheck(status, item.id)} />
                            })
                            : <View></View>}
                    </ScrollView>


                    <View style={{ paddingTop: 10, paddingBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                        {checkedContainers && checkedContainers.length > 0 ?
                            <View>
                                <TouchableOpacity onPress={handleConfirmDeleteCheckedContainers} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons style={{ textAlign: 'center', textAlignVertical: 'center', width: 45, height: 45, borderWidth: 1, borderColor: colors.colmenaGreen, padding: 10, borderRadius: 50 }} name={'md-trash'} size={26} color={colors.colmenaGreen} />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'Nunito-Regular', color: '#7f7f7f' }}>Eliminar ({checkedContainers.length})</Text>
                            </View>
                            :
                            <View>
                                <TouchableOpacity onPress={handleAddContainer} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <AntDesign name={'pluscircle'} size={42} color={colors.colmenaGreen} />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'Nunito-Regular', color: '#7f7f7f' }}>Agregar nuevo</Text>
                            </View>
                        }
                    </View>
                </View >
            }
        </View>
    );
};

export default ManageWasteScreen;