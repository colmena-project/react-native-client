import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from '../../../../constants/profileStyles';

const ManageWasteActionsScreen = props => {

    const handleManageProductPress = product => {
        props.navigation.navigate('ManageWaste')
    };

    return (
        <View style={{ ...styles.scrollViewWrapper, justifyContent: 'center' }} >
            <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, paddingHorizontal: 50, marginBottom: 20, textAlign: 'left' }}><Text style={{ fontWeight: 'bold' }}>@wara</Text> elegí el residuo a modificar</Text>
            <View style={styles.wasteTabContainer}>
                <View style={styles.wasteItem}>
                    <Image style={styles.wasteImage} source={require('../../../../../assets/profile/profile_bottles.png')} />
                    <Text style={styles.wasteDescription}>PET (2 Bolsas)</Text>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={handleManageProductPress} style={styles.editInfoBtn}>
                            <Text style={styles.editInfoBtnText}>Modificar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style
                    ={styles.wasteItem}>
                    <Image style={styles.wasteImage} source={require('../../../../../assets/profile/profile_caps.png')} />
                    <Text style={styles.wasteDescription}>Tapitas (2 bolsas)</Text>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={handleManageProductPress} style={styles.editInfoBtn}>
                            <Text style={styles.editInfoBtnText}>Modificar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    );
};

export default ManageWasteActionsScreen;