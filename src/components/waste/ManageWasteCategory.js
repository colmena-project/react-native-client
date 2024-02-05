import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import styles from '../../constants/profileStyles';
import colors from '../../constants/colors';
import UserService from '../../services/User';

const ManageWasteCategory = props => {

    const wasteType = props.wasteType;
    const containers = props.containers;
    const [qty, setQty] = useState(null);

    useEffect(() => {
        if (containers && wasteType) {
            const result = containers.filter(container => container.get('type').id == wasteType.id);
            setQty(result.length);
        }
    }, [containers]);

    const handleManageProductPress = () => {
        props.onPress(wasteType);
    };

    return (
        <View style={styles.wasteItem}>
            <Image style={styles.wasteImage} source={{ uri: wasteType.get('iconFile')._url }} />
            <Text style={styles.wasteDescription}>
                {wasteType.get('name')} ({qty} {qty == 1 ? wasteType.get('container') : wasteType.get('containerPlural')})
                    </Text>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleManageProductPress} style={styles.editInfoBtn}>
                    <Text style={styles.editInfoBtnText}>Modificar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ManageWasteCategory;