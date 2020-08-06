import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Parse } from 'parse/react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import AuthorizedScreen from '../../../components/auth/AuthorizedScreen';

import { useDispatch } from 'react-redux';
import Auth from '../../../services/Auth';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import colors from '../../../constants/colors';
import FeedListU from '../../../components/posts/FeedListU';
import Activity from '../../../components/pendants/Activity';

const MyProfile = props => {

    const [transactions, setTransactions] = useState(null);
    const [userAccount, setUserAccount] = useState(null);
    const POST_PER_LOAD_LIMIT = 20;
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postsQty, setPostsQty] = useState(0);
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const account = await Parse.Cloud.run("getMyAccount");
            setUserAccount(account);
            props.navigation.setOptions({ title: `${account.firstName} ${account.lastName}` })
            const fetchPosts = new Parse.Query("Post");
            fetchPosts.descending("createdAt").limit(POST_PER_LOAD_LIMIT);
            const result = await fetchPosts.find();
            const transactions = new Parse.Query('Transaction');
            // transactions.equalTo('type', 'TRANSPORT');
            transactions.equalTo('expiredAt', undefined);
            const transactionsResult = await transactions.find();
            const fetchPostsQty = new Parse.Query("Post");
            const qty = await fetchPostsQty.count();
            setPostsQty(qty);
            setTransactions(transactionsResult);
            setPosts(result);
            setIsLoading(false);
        } catch (err) {
            console.log('Profile Index error: ' + err);
        }
        setIsLoading(false);
    };

    const loadMorePosts = async () => {
        try {
            setIsLoadingMore(true);
            console.log('Length', posts.length);
            const fetchPosts = new Parse.Query("Post");
            fetchPosts.descending("createdAt").limit(POST_PER_LOAD_LIMIT).skip(posts.length);
            const result = await fetchPosts.find();
            const updatedPosts = [...posts, ...result];

            setPosts(updatedPosts);
            setIsLoadingMore(false);
        } catch (err) {
            console.log("Error!! " + err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    };

    const handleOnEndReached = () => {
        loadMorePosts();
    };

    const handleLogout = () => {
        Auth.logOut(dispatch);
    };

    const handleEditProfile = () => {
        props.navigation.navigate('EditProfile');
    };

    const handleOnUsernamePress = (user) => {
        props.navigation.navigate("OthersProfile");
    };

    /******************************************************
    * TABS VIEW 
    *****************************************************/
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'user', title: (<Feather name={'user'} size={25} />) },
        { key: 'waste', title: (<FontAwesome5 name={'recycle'} size={25} />) },
        { key: 'pendantsList', title: (<Feather name={'clipboard'} size={25} />) },
    ]);

    /******************************************************
    * USER TAB
    *****************************************************/
    const userTab = () => {
        return (
            <ScrollView style={{ flex: 1, paddingLeft: 0, paddingRight: 0 }} onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    handleOnEndReached();
                }
            }}>
                {/* *********** PROFILE HEADER *********** */}
                <View style={styles.profileHeader}>

                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={styles.profilePicture}>
                            {(userAccount && userAccount.avatar) ?
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: userAccount.avatar._url }}
                                /> :
                                <Image
                                    style={styles.avatar}
                                    source={require('../../../../assets/default_user_1.png')}
                                />
                            }
                            <Text style={styles.name}>
                                @{userAccount.createdBy.get('username')}
                            </Text>
                        </View>

                        <View style={{}}>
                            <View style={styles.locationInfo}>
                                <EvilIcons name={'location'} size={25} color={'#4C4C4C'} />
                                <Text style={styles.titleTexts}>{userAccount.city}, {userAccount.state}</Text>
                            </View>

                            <View style={styles.aboutMeInfo}>
                                <Text style={styles.aboutMeText}>
                                    {userAccount.aboutMe}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ ...styles.btnContainer, paddingHorizontal: 30 }}>
                        <TouchableOpacity onPress={handleEditProfile} style={styles.editInfoBtn}>
                            <Text style={styles.editInfoBtnText}>Editar info pública</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ ...styles.btnContainer, paddingHorizontal: 30 }}>
                        <TouchableOpacity onPress={handleLogout} style={styles.editInfoBtn}>
                            <Text style={styles.editInfoBtnText}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {/* *********** FIN PROFILE HEADER *********** */}

                {/* *********** ACTIVIDAD (POSTS) *********** */}
                <View style={styles.activityContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.activityTitle}>Actividad</Text>
                        <Text style={styles.activityExtraInfo}>
                            {postsQty} <Text style={styles.activityExtraInfoDetail}>POSTS</Text>
                        </Text>
                    </View>

                    <FeedListU onPress={handleOnUsernamePress} data={posts} />
                    {isLoadingMore ?
                        <ActivityIndicator
                            size={"large"}
                            color={colors.colmenaGreen}
                        />
                        : <View></View>}
                </View>
                {/* *********** FIN ACTIVIDAD (POSTS) *********** */}
            </ScrollView>
        );
    };
    /******************************************************
    * USER TAB
    *****************************************************/

    /******************************************************
    * WASTE TAB
    *****************************************************/
    const wasteTab = () => {
        return (
            <ScrollView style={{}}>
                {/* *********** RESIDUOS *********** */}
                <View style={styles.wasteTabContainer}>

                    <View style={styles.wasteItem}>
                        <Image style={styles.wasteImage} source={require('../../../../assets/profile/profile_bottles.png')} />
                        <Text style={styles.wasteDescription}>PET (2 Bolsas)</Text>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={() => { }} style={styles.editInfoBtn}>
                                <Text style={styles.editInfoBtnText}>Modificar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.wasteItem}>
                        <Image style={styles.wasteImage} source={require('../../../../assets/profile/profile_caps.png')} />
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
                <View style={styles.locationTabContainer}>
                    <Image style={{ width: 24, height: 24, resizeMode: 'contain' }} source={require('../../../../assets/icons/location.png')} />
                    <Text style={{ marginLeft: 10, fontFamily: 'Nunito-Light', fontSize: 16, color: '#4c4c4c' }}>{userAccount.city}, {userAccount.state}</Text>
                </View>
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
    /******************************************************
    * WASTE TAB
    *****************************************************/

    /******************************************************
    * ACTIVITY TAB
    *****************************************************/
    const activiyTab = () => {
        return (
            <View style={{ paddingHorizontal: 20 }}>
                {transactions == null ? <ActivityIndicator style={{ flex: 1 }} size={'large'} color={colors.colmenaGreen} /> :
                    transactions.length > 0 ?
                        transactions.map((transaction, index) => {
                            return <Activity user={userAccount} transaction={transaction} key={index} />
                        })
                        :
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Image style={{ resizeMode: 'contain', width: '80%', height: '80%' }} source={require('../../../../assets/profile/empty_transactions.png')} />
                            <Text style={{ paddingHorizontal: 20, fontFamily: 'Nunito-Light', fontSize: 18, color: '#4B4B4B' }}>
                                No tenés actividades pendientes. Intenta con el menú de acciones.
                            </Text>
                        </View>
                }
            </View>
        );
    };
    /******************************************************
    * ACTIVITY TAB
    *****************************************************/

    const initialLayout = {
        width: Dimensions.get('window').width
    };

    const renderScene = SceneMap({
        user: userTab,
        waste: wasteTab,
        pendantsList: activiyTab,
    });

    const renderTabBar = props => {
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            style={{ ...styles.tabItem, borderBottomColor: index === i ? colors.colmenaGreen : '#ccc', alignItems: 'center' }}
                            onPress={() => setIndex(i)}>
                            <Text style={{ fontSize: 16, color: index === i ? colors.colmenaGrey : '#ccc' }}>{route.title}</Text>
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
        <AuthorizedScreen>
            <View style={{
                flex: 1,
                padding: 0,
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: colors.colmenaBackground,
            }}>
                {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                    <View style={styles.tabBarContainer}>
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={initialLayout}
                            renderTabBar={renderTabBar}
                        />
                    </View>
                }
            </View>
        </AuthorizedScreen>
    );
};

const styles = StyleSheet.create({
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileHeader: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED'
    },
    profilePicture: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        overflow: 'hidden',
    },
    name: {
        fontFamily: 'Nunito-Regular',
        fontSize: 12
    },
    locationInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    titleTexts: {
        color: '#4C4C4C',
        fontFamily: 'Nunito-Regular'
    },
    aboutMeInfo: {
        margin: 5,
    },
    aboutMeText: {
        textAlign: 'justify',
        fontFamily: 'Nunito-Light',
        color: '#4C4C4C',
    },
    btnContainer: {
        width: '100%',
        marginTop: 10,
    },
    editInfoBtn: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.colmenaGreen,
        borderRadius: 5,
        paddingVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    editInfoBtnText: {
        textAlign: 'center',
        color: colors.colmenaGreen,
        fontFamily: 'Nunito-Regular',
        fontSize: 16
    },
    activityContainer: {
        flex: 3,
        paddingHorizontal: 20
    },
    brandText: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
    },
    activityTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
        fontSize: 18,
        color: '#4C4C4C',
        paddingVertical: 10,
        marginLeft: 0,
        marginTop: 15
    },
    activityExtraInfo: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
        fontSize: 18,
        color: '#4C4C4C',
        paddingVertical: 10,
        marginLeft: 0,
        marginTop: 15
    },
    activityExtraInfoDetail: {
        fontSize: 12,
        fontFamily: 'Nunito-Light',
        marginLeft: 10,
    },
    tabBarContainer: {
        flex: 1,
    },
    tabBar: {  // Íconos de los tabs
        flexDirection: 'row',
        marginTop: 15,
    },
    tabItem: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 10,
        marginLeft: 0,
        borderBottomWidth: 3,
    },
    tabContent: {
        flex: 1,
        justifyContent: 'flex-start',
    },


    wasteTabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED'
    },
    locationTabContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED'
    },


    wasteInfoContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED'
    },
    wasteCardsContainer: {
        paddingVertical: 20,
        paddingLeft: 20,
    },
    wasteTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 18,
        color: '#4c4c4c',
        marginBottom: 10,
    },
    wasteCardTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 10,
        color: '#6E7989',
        backgroundColor: '#D8DAE0',
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 3,
        marginBottom: 5,
        textTransform: 'uppercase',
    },
    wasteDescription: {
        textAlign: 'left',
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        color: '#4C4C4C',
    },
    impactDescription: {
        textAlign: 'left',
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        color: '#4C4C4C',
    },
    wasteCard: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 115,
        height: 165,
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    wasteItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 165,
        padding: 10,
        marginRight: 10,
    },
    impactTitle: {
        color: colors.colmenaGreen,
        fontFamily: 'Nunito-Regular',
        fontSize: 20
    },
    impactImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain'
    },
    wasteImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    impactDescription: {
        textAlign: 'center',
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        color: '#4C4C4C',
    },
    activityContainer: {
        flex: 3,
        paddingHorizontal: 20
    },
    activityTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
        fontSize: 18,
        color: '#4C4C4C',
        paddingVertical: 10,
        marginLeft: 0,
        marginTop: 15
    },
    activityExtraInfo: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
        fontSize: 18,
        color: '#4C4C4C',
        paddingVertical: 10,
        marginLeft: 0,
        marginTop: 15
    },
    activityExtraInfoDetail: {
        fontSize: 12,
        fontFamily: 'Nunito-Light',
        marginLeft: 10,
    },


});

export default MyProfile;