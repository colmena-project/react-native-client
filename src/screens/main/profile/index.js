import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, Button, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Parse } from 'parse/react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Animated from 'react-native-reanimated';

import EvilIcons from 'react-native-vector-icons/EvilIcons';

import colors from '../../../styles/colors';
import stylesCommon from '../../../styles/waste';
import FeedList from '../../../components/posts/FeedList';

const MyProfile = props => {

    const [userAccount, setUserAccount] = useState(null);
    const [stock, setStock] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const account = await Parse.Cloud.run("getMyAccount");
            setUserAccount(account);
            setStock(account.stock);

            const posts = new Parse.Query('Post');
            posts.descending("createdAt");
            const result = await posts.find();

            setData(result);
            setIsLoading(false);
        } catch (err) {
            console.log('Error!! ' + err);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    /******************************************************
     * TABS VIEW 
     *****************************************************/
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'posts', title: 'Posts (23)' },
        { key: 'metrics', title: 'Métricas' },
    ]);

    const postsTab = () => {
        return <FeedList onPress={handleOthersProfile} data={data} />
    };

    const metricsTab = () => {
        return <View style={{ ...styles.scene, backgroundColor: colors.colmenaGreyDisabled }} />
    };

    const initialLayout = {
        width: Dimensions.get('window').width
    };

    const renderScene = SceneMap({
        posts: postsTab,
        metrics: metricsTab,
    });

    const handleOthersProfile = () => {
        props.navigation.navigate('OthersProfile');
    };

    const handleEditProfile = () => {
        props.navigation.navigate('EditProfile');
    };

    const renderTabBar = props => {
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            style={{ ...styles.tabItem, borderBottomColor: index === i ? colors.colmenaGreen : '#ccc' }}
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
            {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                <View style={styles.scrollView}>
                    <View style={styles.container}>
                        <View style={styles.headerIcons}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ ...stylesCommon.brandText, fontSize: 24, paddingLeft: 10 }}>
                                    {userAccount.firstName} {userAccount.lastName}
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
                                    @{userAccount.createdBy.get('username')}
                                </Text>
                            </View>

                            <View style={{ ...styles.headerExtraInfo, flex: 2, paddingRight: 7 }}>
                                <View style={{ flex: 1, }}>
                                    <Text style={{ ...styles.headerExtraInfoText, fontWeight: 'bold' }}>Impacto</Text>
                                    <Text style={{ ...styles.headerExtraInfoText, fontSize: 14 }}>Redujiste 12kg la emisión de CO2</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        style={{ width: 40, height: 40, resizeMode: 'contain' }}
                                        source={require('../../../../assets/icons/icon-co2.png')}
                                    />
                                </View>
                            </View>

                            <View style={{ ...styles.headerExtraInfo, flex: 2, borderLeftWidth: 1, paddingLeft: 7, borderLeftColor: colors.colmenaGreen }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...styles.headerExtraInfoText, paddingRight: 10, fontWeight: 'bold' }}>Mis Residuos</Text>
                                    <Image
                                        style={{ width: 16, height: 16, resizeMode: 'contain' }}
                                        source={require('../../../../assets/icons/icon-pencil.png')}
                                    />
                                </View>

                                <View style={{ flex: 1, width: '100%' }}>
                                    {stock.map(item => {
                                        return (
                                            <View key={item.objectId} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ ...styles.headerExtraInfoText, fontSize: 12 }}>{item.wasteType.name}</Text>
                                                <Text style={{ ...styles.headerExtraInfoText, fontSize: 12 }}>
                                                    {item.ammount} {item.ammount > 1 ? item.wasteType.containerPlural : item.wasteType.container}
                                                </Text>
                                            </View>
                                        );
                                    })}
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
                            <Text style={styles.titleTexts}>{userAccount.city}, {userAccount.state}</Text>
                        </View>

                        <View style={styles.aboutMeInfo}>
                            <Text style={styles.aboutMeText}>
                                {userAccount.aboutMe}
                            </Text>
                        </View>
                        <View style={styles.editButton}>
                            <Button title={'Editar perfil'} color={colors.colmenaGreen} onPress={handleEditProfile} />
                        </View>
                    </View>

                    <View style={styles.tabBarContainer}>
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={initialLayout}
                            renderTabBar={renderTabBar}
                        />
                    </View>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        flex: 5,
    },
    scrollView: {
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
    tabBarContainer: {
        flex: 4,
    },
    tabBar: {
        flexDirection: 'row',
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
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