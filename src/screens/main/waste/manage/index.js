import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import styles from '../../../../constants/profileStyles';

const ManageWasteActionsScreen = props => {

    const user = useSelector(state => state.user.account);
    const stock = useSelector(state => state.user.stock);
    const recoveredContainers = useSelector(state => state.user.recoveredContainers);
    const getContainers = () => {
        const formatted = [];
        stock.forEach(item => {
            const type = item.wasteType.name;
            item.type = type;
            if (!(type in formatted))
                formatted[type] = [];
            formatted[type] = item;
        })
        return formatted;
    };
    const containers = getContainers();

    const handleManageProductPress = type => {
        const data = recoveredContainers.filter(item => item.get('type').get('name') == type);
        props.navigation.navigate('ManageWaste', { type, data })
    };

    return (
        <View style={{ ...styles.scrollViewWrapper, justifyContent: 'center' }} >
            <Text style={{ textAlign: 'center', fontFamily: 'Nunito-Regular', fontSize: 20, paddingHorizontal: 30, marginBottom: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>@{user.get('user').get('username')}</Text> elegí el residuo a modificar
            </Text>
            <View style={styles.wasteTabContainer}>
                {containers && containers['PET'] ?
                    <View style={styles.wasteItem}>
                        <Image style={styles.wasteImage} source={require('../../../../../assets/profile/profile_bottles.png')} />
                        <Text style={styles.wasteDescription}>
                            PET ({containers['PET'].ammount} {containers['PET'].ammount == 1 ? containers['PET'].wasteType.container : containers['PET'].wasteType.containerPlural})
                            </Text>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={() => handleManageProductPress(containers['PET'].type)} style={styles.editInfoBtn}>
                                <Text style={styles.editInfoBtnText}>Modificar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View></View>
                }
                {containers && containers['Tapitas'] ?
                    <View style={styles.wasteItem}>
                        <Image style={styles.wasteImage} source={require('../../../../../assets/profile/profile_caps.png')} />
                        <Text style={styles.wasteDescription}>
                            Tapitas ({containers['Tapitas'].ammount} {containers['Tapitas'].ammount == 1 ? containers['Tapitas'].wasteType.container : containers['Tapitas'].wasteType.containerPlural})
                            </Text>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={() => handleManageProductPress(containers['Tapitas'].type)} style={styles.editInfoBtn}>
                                <Text style={styles.editInfoBtnText}>Modificar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View></View>
                }
            </View>
        </View >
    );
};

export default ManageWasteActionsScreen;