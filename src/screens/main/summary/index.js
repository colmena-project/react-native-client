import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import styles from '../../../constants/profileStyles';

const SummaryScreen = props => {

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
        <ScrollView style={{ ...styles.scrollViewWrapper, paddingTop: 30 }}>
            {/* *********** RESIDUOS *********** */}
            <View style={styles.wasteTabContainer}>

                {containers && containers['PET'] ?
                    <View style={styles.wasteItem}>
                        <Image style={styles.wasteImage} source={require('../../../../assets/profile/profile_bottles.png')} />
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
                        <Image style={styles.wasteImage} source={require('../../../../assets/profile/profile_caps.png')} />
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
            {/* *********** FIN RESIDUOS *********** */}

            {/* *********** DIRECCION *********** */}
            {/* <View style={styles.locationTabContainer}>
                <Image style={{ width: 24, height: 24, resizeMode: 'contain' }} source={require('../../../../assets/icons/location.png')} />
                <Text style={{ marginLeft: 10, fontFamily: 'Nunito-Light', fontSize: 16, color: '#4c4c4c' }}>{userAccount.city}, {userAccount.state}</Text>
            </View> */}
            {/* *********** FIN DIRECCION *********** */}

            {/* *********** IMPACTO *********** */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={styles.wasteCardsContainer}>
                    <Text style={styles.wasteTitle}>
                        Impacto
                    </Text>
                    <View style={styles.wasteCard}>
                        <Text style={styles.impactTitle}>12 kg</Text>
                        <Image style={styles.impactImage} source={require('../../../../assets/profile/profile_green_lungs.png')} />
                        <Text style={styles.impactDescription}>Reducción de CO<Text style={{ fontSize: 10 }}>2</Text></Text>
                    </View>
                </View>

                <View style={styles.wasteCardsContainer}>
                    <View style={{ alignItems: 'flex-end', paddingHorizontal: 20 }}>
                        <Image style={{ width: 130, height: 130, resizeMode: 'contain' }} source={require('../../../../assets/img/save_the_planet.png')} />
                        <Text style={{ ...styles.impactDescription, fontSize: 14 }}>Retribución estimada</Text>
                        <Text style={{ ...styles.impactTitle, fontSize: 40, letterSpacing: 2, fontFamily: 'Nunito-Bold' }}>400 jyc</Text>
                    </View>
                </View>

            </View>
            {/* *********** FIN IMPACTO *********** */}
        </ScrollView >
    );
};

export default SummaryScreen;