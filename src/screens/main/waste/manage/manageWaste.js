import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';

import ManageWasteItem from '../../../../components/waste/ManageWasteItem';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import colors from '../../../../constants/colors';
import styles from '../../../../constants/profileStyles';


const ManageWasteScreen = props => {

    const [wasteContainers, setWasteContainers] = useState(null);
    const [checkedContainers, setCheckedContainers] = useState(null);

    const fetchWasteData = async () => {
        try {
            // fetch data
            const data = getDummyData();
            const decoratedData = data.map(wasteContainer => {
                return { ...wasteContainer, isChecked: false, isDeleted: false };
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
        ];
    };

    const handleAddContainer = () => {
        const newId = wasteContainers[wasteContainers.length - 1].id + 1;
        const newContainer = { id: newId, name: 'PET' };
        const updatedWasteContainers = [...wasteContainers, newContainer]
        setWasteContainers(updatedWasteContainers);
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

    const deleteContainers = () => {
        if (wasteContainers && wasteContainers.length > 0) {
            const updatedContainers = wasteContainers.map(wasteContainer => {
                if (wasteContainer.isChecked) {
                    wasteContainer.isDeleted = true;
                    wasteContainer.isChecked = false;
                }
                return wasteContainer;
            });
            setWasteContainers(updatedContainers);
        };
        // Alert.alert('Contenedores borrados correctamente!');
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
        <View style={styles.scrollViewWrapper} >
            <View style={styles.wasteTabContainer}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ resizeMode: 'contain', width: 100, height: 100 }} source={require('../../../../../assets/profile/profile_bottles.png')} />
                    <Text style={styles.wasteDescription}>
                        Plástico PET ({wasteContainers && wasteContainers.length > 0 ? wasteContainers.filter(item => !item.isDeleted).length : ''})
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
    );
};

export default ManageWasteScreen;