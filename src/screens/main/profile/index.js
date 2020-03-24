import React, { useState } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, Button, Dimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Animated from 'react-native-reanimated';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../../styles/colors';
import stylesCommon from '../../../styles/waste';
import FeedList from '../../../components/posts/FeedList';

const MyProfile = props => {



    
    /******************************************************
     * TABS VIEW 
     *****************************************************/
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'posts', title: 'Posts (23)' },
        { key: 'metrics', title: 'Métricas' },
    ]);
    
    const postsTab = () => {
        return <FeedList />
    };

    const metricsTab = () => {
        return <View style={{ ...styles.scene, backgroundColor: colors.colmenaGreenDisabled }} />
    };

    const initialLayout = {
        width: Dimensions.get('window').width
    };

    const renderScene = SceneMap({
        posts: postsTab,
        metrics: metricsTab,
    });
    
    //PREGUNTAR SI ESTA BIEN LA LISTA DE POSTS
    console.disableYellowBox = true;
    
    const renderTabBar = props => {
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    return (
                        <TouchableOpacity
                            style={{ ...styles.tabItem, borderBottomColor: index === i ? colors.colmenaGreen : '#ccc'}}
                            onPress={() => setIndex(i)}>
                            <Animated.Text style={{ fontSize: 16, color: index === i ? colors.colmenaGrey : '#ccc' }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };
    /******************************************************
     * END TABS VIEW 
     *****************************************************/

    return (
        <View style={stylesCommon.scrollViewWrapper}>
            <ScrollView style={stylesCommon.scrollView}>

                <View style={styles.container}>
                    <View style={styles.headerIcons}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...stylesCommon.brandText, fontSize: 24, paddingLeft: 10 }}>
                                Guille Colotti
                            </Text>
                        </View>
                        <EvilIcons name={'cart'} size={30} color={colors.colmenaGrey} />
                    </View>
                    <View style={styles.profileHeader}>

                        <View style={styles.profilePicture}>
                            <Image
                                style={styles.avatar}
                                source={require('../../../../assets/default_user_2.png')}
                            />
                            <Text style={styles.name}>
                                @gcolotti
                            </Text>
                        </View>

                        <View style={{ ...styles.headerExtraInfo, flex: 2, paddingRight: 7 }}>
                            <View style={{ flex: 1, }}>
                                <Text style={{ ...styles.headerExtraInfoText, fontWeight: 'bold' }}>Impacto</Text>
                                <Text style={{ ...styles.headerExtraInfoText, fontSize: 14 }}>Redujiste 12kg la emisión de CO2</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Image
                                    style={{ width: 40, height: 40, resizeMode: 'contain' }}
                                    source={require('../../../../assets/icons/icon-co2.png')}
                                />
                            </View>
                        </View>

                        <View style={{ ...styles.headerExtraInfo, flex: 3, borderLeftWidth: 1, borderLeftColor: colors.colmenaGreen }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.headerExtraInfoText, paddingRight: 10, fontWeight: 'bold' }}>Mis Residuos</Text>
                                <Image
                                    style={{ width: 16, height: 16, resizeMode: 'contain' }}
                                    source={require('../../../../assets/icons/icon-pencil.png')}
                                />
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 7 }}>
                                <View style={{ flex: 1, alignItems: 'flex-start', }}>
                                    <Text style={{ ...styles.headerExtraInfoText, fontSize: 12 }}>PET</Text>
                                    <Text style={{ ...styles.headerExtraInfoText, fontSize: 12 }}>Orgánico</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end', }}>
                                    <Text style={{ ...styles.headerExtraInfoText, fontSize: 12 }}>200 bolsas</Text>
                                    <Text style={{ ...styles.headerExtraInfoText, fontSize: 12 }}>100 bolsas</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', }}>
                                <Image
                                    style={{ width: 40, height: 40, resizeMode: 'contain' }}
                                    source={require('../../../../assets/icons/icon-residuo-pet.png')}
                                />
                                <Image
                                    style={{ width: 40, height: 40, resizeMode: 'contain' }}
                                    source={require('../../../../assets/icons/icon-residuo-organico.png')}
                                />
                            </View>

                        </View>

                    </View>

                    <View style={styles.locationInfo}>
                        <EvilIcons name={'location'} size={25} color={colors.colmenaGrey} />
                        <Text style={styles.titleTexts}>Oberá, Misiones</Text>
                    </View>

                    <View style={styles.aboutMeInfo}>
                        <Text style={styles.aboutMeText}>
                            I'm a 24 years old Embedded Systems Engineer.... currently working as a Frelance designer. I love pizza and to recycle waste! Viva colmena!!
                        </Text>
                    </View>
                    <View style={styles.editButton}>
                        <Button title={'Editar perfil'} color={colors.colmenaGreen} onPress={() => console.log('Editar perfil')} />
                    </View>
                </View>

                <View style={styles.container}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={initialLayout}
                        renderTabBar={renderTabBar}
                    />
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileHeader: {
        flex: 1,
        width: '100%',
        height: 125,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 30,
    },
    profilePicture: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 10,
    },
    avatar: {
        width: 75,
        height: 75,
        borderRadius: 50,
        overflow: 'hidden',
        resizeMode: 'contain',
    },
    headerExtraInfo: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        marginTop: 35,
    },
    headerExtraInfoTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.colmenaGrey,
        fontFamily: 'Montserrat-Medium',
    },
    headerExtraInfoText: {
        fontSize: 16,
        color: colors.colmenaGrey,
        fontFamily: 'Montserrat-Medium',
        textAlign: 'center',
    },
    locationInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    titleTexts: {
        color: colors.colmenaGrey,
    },
    aboutMeInfo: {
        marginTop: 5,
        marginBottom: 5
    },
    aboutMeText: {
        textAlign: 'justify',
        color: colors.colmenaGrey
    },
    editButton: {
        marginTop: 20,
        marginBottom: 10,
    },
    scene: {
        flex: 1,
        height: 200,
    },
    tabBar: {
        flexDirection: 'row',
        marginTop: 20,
    },
    tabItem: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 10,
        marginLeft: 0,
        borderBottomWidth: 3,
    },
});

export default MyProfile;