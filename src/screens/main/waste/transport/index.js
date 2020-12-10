import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addContainerToTransport, removeContainerToTransport, setMaterialRetribution } from '../../../../redux/waste/transport/actions';
import TransportWasteCategory from '../../../../components/waste/TransportWasteCategory';
import Parse from 'parse/react-native';
import UserService from '../../../../services/User';
import WasteService from '../../../../services/Waste';
import styles from '../../../../constants/profileStyles';
import colors from '../../../../constants/colors';

const PickWasteForTransport = props => {

    const [containers, setContainers] = useState(null);
    const [wasteTypes, setWasteTypes] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [estimatedRetribution, setEstimatedRetribution] = useState(0);
    const [calculatingRetribution, setCalculatingRetribution] = useState(false);
    const [qtyToTransport, setQtyToTransport] = useState(0);
    const transportData = useSelector(state => state.transportInfo.containersPerType);
    const dispatch = useDispatch();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const fetchedWasteTypes = await WasteService.fetchWasteTypes(dispatch);
            const fetchedContainers = await UserService.fetchRecoveredContainers(dispatch);
            setWasteTypes(fetchedWasteTypes);
            setContainers(fetchedContainers);
        } catch (error) {
            console.log('PickWasteForTransport - fetchData error: ', error);
        }
        setIsLoading(false);
    };

    const calculateRetribution = async () => {
        setCalculatingRetribution(true);
        try {
            const elements = transportData.map(data => {
                return { wasteType: data.wasteType, qty: data.qty * data.weight, unit: data.unit }
            })
            const data = {
                type: 'material',
                elements
            };
            const matRetribution = await Parse.Cloud.run('estimateRetribution', data);
            setEstimatedRetribution(matRetribution.material.total);
            dispatch(setMaterialRetribution(matRetribution.material.total));
        } catch (error) {
            console.log('TransportIndex - Retribuction calc error', error);
        }
        setCalculatingRetribution(false);
    };

    const handleToogleCheck = (isChecked, container) => {
        if (isChecked) {
            setQtyToTransport(qtyToTransport + 1);
            dispatch(addContainerToTransport(container));
        } else {
            setQtyToTransport(qtyToTransport - 1);
            dispatch(removeContainerToTransport(container));
        }
        calculateRetribution();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleNextButton = () => {
        props.navigation.navigate('PickTransportDestiny');
    };

    return (
        <View style={styles.scrollViewWrapper} >
            <Text style={componentStyle.headerText}>
                Elija las bolsas / cajas / botellas que desea transportar, viendo su código de identificación.
            </Text>
            <View style={{ ...styles.wasteTabContainer, flex: 1 }}>
                {wasteTypes ? wasteTypes.map(wasteType => {
                    return <TransportWasteCategory key={wasteType.id} wasteType={wasteType} containers={containers} handleToogleCheck={handleToogleCheck} />
                })
                    :
                    <ActivityIndicator style={{ height: 200, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} />
                }
            </View>
            <View style={componentStyle.footerContainer}>
                <Text style={componentStyle.footerText}>
                    Estimado:
                    {calculatingRetribution ?
                        <Text style={{ color: 'black', fontSize: 20 }}> calculando...</Text>
                        :
                        <Text style={{ color: 'black', fontSize: 20 }}> {estimatedRetribution} JYC</Text>
                    }
                </Text>
                <TouchableOpacity
                    disabled={!qtyToTransport}
                    style={{ marginVertical: 15 }}
                    onPress={handleNextButton} >
                    <Text style={{
                        textAlign: 'center',
                        color: qtyToTransport ? colors.colmenaGreen : colors.colmenaLightGrey,
                        fontFamily: 'Nunito-SemiBold',
                        fontSize: 16
                    }}>
                        SIGUIENTE
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const componentStyle = StyleSheet.create({
    headerText: {
        paddingHorizontal: 40,
        marginTop: 25,
        textAlign: 'justify',
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
        color: '#7f7f7f'
    },
    footerContainer: {
        // backgroundColor: 'white',
        height: 100,
        paddingTop: 10,
        paddingHorizontal: 40
    },
    footerText: {
        textAlign: 'center',
        color: colors.greyText,
        fontFamily: 'Nunito-SemiBold',
        fontSize: 16
    },
});

export default PickWasteForTransport;