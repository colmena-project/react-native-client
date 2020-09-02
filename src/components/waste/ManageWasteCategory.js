import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import styles from '../../constants/profileStyles';
import colors from '../../constants/colors';
import UserService from '../../services/User';

const ManageWasteCategory = props => {

    const data = props.data;

    const handleManageProductPress = () => {
        props.onPress(data);
    };

    return (
        <View style={styles.wasteItem}>
            <Image style={styles.wasteImage} source={{ uri: data.image._url }} />
            <Text style={styles.wasteDescription}>
                {data.name} ({data.ammount} {data.ammount == 1 ? data.container : data.containerPlural})
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