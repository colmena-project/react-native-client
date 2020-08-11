import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Parse } from 'parse/react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import AuthorizedScreen from '../../../components/auth/AuthorizedScreen';


import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import colors from '../../../constants/colors';


import UserTab from '../../../components/profile/UserTab';
import WasteTab from '../../../components/profile/WasteTab';
import PendantsTab from '../../../components/profile/PendantsTab';

const MyProfile = props => {

    const [transactions, setTransactions] = useState(null);
    const [userAccount, setUserAccount] = useState(null);
    const POST_PER_LOAD_LIMIT = 20;
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postsQty, setPostsQty] = useState(0);

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

    /******************************************************
    * TABS VIEW 
    *****************************************************/
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'user', title: (<Feather name={'user'} size={25} />) },
        { key: 'waste', title: (<FontAwesome5 name={'recycle'} size={25} />) },
        { key: 'pendants', title: (<Feather name={'clipboard'} size={25} />) },
    ]);

    const userTab = () => {
        return (
            <UserTab
                posts={posts}
                postsQty={postsQty}
                isLoadingMore={isLoadingMore}
                userAccount={userAccount}
                loadMorePosts={loadMorePosts}
            />
        );
    };

    const wasteTab = () => {
        return (
            <WasteTab />
        );
    };

    const pendantsTab = () => {
        return (
            <PendantsTab userAccount={userAccount} transactions={transactions} />
        );
    };

    const initialLayout = {
        width: Dimensions.get('window').width
    };

    const renderScene = SceneMap({
        user: userTab,
        waste: wasteTab,
        pendants: pendantsTab,
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