import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ManageWasteItem from '../../../../components/waste/ManageWasteItem';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Parse from 'parse/react-native';
import colors from '../../../../constants/colors';
import styles from '../../../../constants/profileStyles';
import UserService from '../../../../services/User';

const ManageWasteScreen = props => {

    const wasteType = props.route.params.type;
    const address = useSelector(state => state.user.address);
    const [wasteContainers, setWasteContainers] = useState(null);
    const [checkedContainers, setCheckedContainers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchWasteData = async () => {
        setIsLoading(true);
        try {
            await UserService.fetchTransactions(dispatch);
            const fetchedContainers = await UserService.fetchRecoveredContainers(dispatch);
            const filteredContainers = fetchedContainers.filter(container => container.get('type').id == wasteType.id);
            const decoratedData = filteredContainers.map(container => {
                return { id: container.id, container: container, isChecked: false, isDeleted: false };
            });
            setWasteContainers(decoratedData);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const handleAddContainer = async () => {
        try {
            setIsLoading(true);
            const params = {
                containers: [{ typeId: wasteType.id, qty: 1 }],
                addressId: address.id
            };
            const result = await Parse.Cloud.run('registerRecover', params);
            await fetchWasteData();
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
                const result = await Parse.Cloud.run('deleteContainers', { containers: containersInput });
                await UserService.fetchRecoveredContainers(dispatch);
                await UserService.fetchTransactions(dispatch);
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
                        <View style={componentStyles.imageContainer}>
                            <Image style={componentStyles.image} source={{ uri: wasteType.image._url }} />
                            <Text style={styles.wasteDescription}>
                                {wasteType.name} ({wasteContainers && wasteContainers.length > 0 ? wasteContainers.filter(item => !item.isDeleted).length : '0'} {wasteContainers && wasteContainers.length == 1 ? wasteType.container : wasteType.containerPlural})
                            </Text>
                        </View>

                        <View style={componentStyles.textContainer}>
                            <Text style={componentStyles.text}>Selecciona a continuación los contenedores a eliminar o bien puedes agregar más a tu stock</Text>
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


                    <View style={componentStyles.dataContainer}>
                        {checkedContainers && checkedContainers.length > 0 ?
                            <View>
                                <TouchableOpacity onPress={handleConfirmDeleteCheckedContainers} style={componentStyles.btn}>
                                    <Ionicons style={componentStyles.btnIcon} name={'md-trash'} size={26} color={colors.colmenaGreen} />
                                </TouchableOpacity>
                                <Text style={componentStyles.btnText}>Eliminar ({checkedContainers.length})</Text>
                            </View>
                            :
                            <View>
                                <TouchableOpacity onPress={handleAddContainer} style={componentStyles.btn}>
                                    <AntDesign name={'pluscircle'} size={42} color={colors.colmenaGreen} />
                                </TouchableOpacity>
                                <Text style={componentStyles.btnText}>Agregar nuevo</Text>
                            </View>
                        }
                    </View>
                </View >
            }
        </View>
    );
};

const componentStyles = StyleSheet.create({
    imageContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        resizeMode: 'contain',
        width: 100,
        height: 100
    },
    textContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 20
    },
    text: {
        fontFamily: 'Nunito-Regular',
        fontSize: 16
    },
    dataContainer: {
        paddingTop: 10,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnIcon: {
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: colors.colmenaGreen,
        padding: 10,
        borderRadius: 50
    },
    btnText: {
        fontFamily: 'Nunito-Regular',
        color: '#7f7f7f'
    },
});

export default ManageWasteScreen;