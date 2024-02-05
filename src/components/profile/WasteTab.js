import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';
import styles from '../../constants/profileStyles';


const WasteTab = () => {
    return (
        <ScrollView style={{}}>
            {/* *********** RESIDUOS *********** */}
            <View style={styles.wasteTabContainer}>

                <View style={styles.wasteItem}>
                    <Image style={styles.wasteImage} source={require('../../../assets/profile/profile_bottles.png')} />
                    <Text style={styles.wasteDescription}>PET (2 Bolsas)</Text>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => { }} style={styles.editInfoBtn}>
                            <Text style={styles.editInfoBtnText}>Modificar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.wasteItem}>
                    <Image style={styles.wasteImage} source={require('../../../assets/profile/profile_caps.png')} />
                    <Text style={styles.wasteDescription}>Tapitas (2 bolsas)</Text>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => { }} style={styles.editInfoBtn}>
                            <Text style={styles.editInfoBtnText}>Modificar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* {stock.map(item => {
                            return (
                                <View key={item.objectId} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ ...styles.headerExtraInfoText, fontSize: 12 }}>{item.wasteType.name}</Text>
                                    <Text style={{ ...styles.headerExtraInfoText, fontSize: 12 }}>
                                        {item.ammount} {item.ammount > 1 ? item.wasteType.containerPlural : item.wasteType.container}
                                    </Text>
                                </View>
                            );
                        })} */}

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
                        <Image style={styles.impactImage} source={require('../../../assets/profile/profile_green_lungs.png')} />
                        <Text style={styles.impactDescription}>Reducción de CO<Text style={{ fontSize: 10 }}>2</Text></Text>
                    </View>
                </View>

                <View style={styles.wasteCardsContainer}>
                    <View style={{ alignItems: 'flex-end', paddingHorizontal: 20 }}>
                        <Image style={{ width: 130, height: 130, resizeMode: 'contain' }} source={require('../../../assets/img/save_the_planet.png')} />
                        <Text style={{ ...styles.impactDescription, fontSize: 14 }}>Retribución estimada</Text>
                        <Text style={{ ...styles.impactTitle, fontSize: 40, letterSpacing: 2, fontFamily: 'Nunito-Bold' }}>400 jyc</Text>
                    </View>
                </View>

            </View>
            {/* *********** FIN IMPACTO *********** */}
        </ScrollView >
    );
};

export default WasteTab;