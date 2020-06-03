import React, { useState, useEffect } from 'react';
import { Text, Button, View, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Parse } from 'parse/react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../../styles/colors';
import stylesCommon from '../../../styles/waste';
import FeedList from '../../../components/posts/FeedListU';
import Activity from '../../../components/pendants/Activity';

import CustomSvgIcon from '../../../components/icons/CustomSvgIcon';

const MyProfile = props => {

    const [userAccount, setUserAccount] = useState(null);
    const [stock, setStock] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [transactions, setTransactions] = useState(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const account = await Parse.Cloud.run("getMyAccount");
            setUserAccount(account);
            setStock(account.stock);

            const posts = new Parse.Query('Post');
            posts.descending("createdAt");
            const postsResult = await posts.find();

            const transactions = new Parse.Query('Transaction');
            transactions.equalTo('type', 'TRANSPORT');
            const transactionsResult = await transactions.find();

            setTransactions(transactionsResult);
            setData(postsResult);
            setIsLoading(false);
        } catch (err) {
            console.log('Error!! ' + err);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleOthersProfile = () => {
        props.navigation.navigate('OthersProfile');
    };

    const handleEditProfile = () => {
        props.navigation.navigate('EditProfile');
    };

    /******************************************************
    * TABS VIEW 
    *****************************************************/
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'user', title: (<Feather name={'user'} size={25} />) },
        { key: 'waste', title: (<MaterialCommunityIcons name={'recycle'} size={25} />) },
        { key: 'pendantsList', title: (<Feather name={'clipboard'} size={25} />) },
    ]);

    const userTab = () => {
        return (
            <View style={styles.tabContent}>
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

                    <View>
                        <View style={styles.locationInfo}>
                            <EvilIcons name={'location'} size={25} color={colors.colmenaGrey} />
                            <Text style={styles.titleTexts}>{userAccount.city}, {userAccount.state}</Text>
                        </View>

                        <View style={styles.aboutMeInfo}>
                            <Text style={styles.aboutMeText}>
                                {userAccount.aboutMe}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.editButton}>
                    <Button title={'Editar info pública'} color={colors.colmenaGreen} onPress={handleEditProfile} />
                </View>

                <View style={{ flexDirection: 'row' }}>

                    <View style={{ ...styles.headerExtraInfo, flex: 1, paddingRight: 7 }}>
                        <View>
                            <Text style={{ ...styles.headerExtraInfoText, fontWeight: 'bold' }}>Retribución total</Text>
                            <Text style={{ ...styles.headerExtraInfoText, fontSize: 14 }}>1000JC</Text>
                            <Text style={{ ...styles.headerExtraInfoText, fontSize: 14 }}>por</Text>
                            <Text style={{ ...styles.headerExtraInfoText, fontSize: 14 }}>30 actividades</Text>
                        </View>
                    </View>

                    <View style={{ ...styles.headerExtraInfo, flex: 1, borderLeftWidth: 1, borderLeftColor: colors.colmenaGreen, justifyContent: 'space-between' }}>
                        <View style={{ margin: 0, padding: 0, paddingLeft: 10, alignItems: 'stretch' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.headerExtraInfoText, paddingRight: 10, fontWeight: 'bold' }}>Mis Residuos</Text>
                            </View>

                            <View style={{ width: '100%' }}>
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
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{
                        fontSize: 16,
                        color: colors.colmenaGrey,
                        width: '100%',
                        borderBottomWidth: 1,
                        borderBottomColor: '#cccccc',
                        marginBottom: 10,
                        paddingBottom: 10
                    }}>
                        Posts
                    </Text>
                    {data == null ? <ActivityIndicator style={{ flex: 1 }} size={'large'} color={colors.colmenaGreen} /> :
                        <FeedList onPress={handleOthersProfile} data={data} />
                    }
                </View>
            </View>
        );
    };


    const wasteTab = () => {
        return <View style={{ flex: 1, backgroundColor: 'red' }} />
    };

    const listTab = () => {
        return (
            <View>
                {data == null ? <ActivityIndicator style={{ flex: 1 }} size={'large'} color={colors.colmenaGreen} /> :
                    transactions.map((transaction, index) => {
                        return <Activity data={transaction} key={index} />
                    })
                }
            </View>
        );
    };

    const initialLayout = {
        width: Dimensions.get('window').width
    };

    const renderScene = SceneMap({
        user: userTab,
        waste: wasteTab,
        pendantsList: listTab,
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
        <View style={stylesCommon.scrollViewWrapper}>
            {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                <ScrollView style={stylesCommon.scrollView}>
                    <View style={styles.headerIcons}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...stylesCommon.brandText, fontSize: 24, paddingLeft: 10 }}>
                                {userAccount.firstName} {userAccount.lastName}
                            </Text>
                        </View>
                        <EvilIcons name={'bell'} size={30} color={colors.colmenaGrey} />
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
                </ScrollView>
            }
        </View>
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
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10
    },
    profilePicture: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden',
        resizeMode: 'contain',
    },
    headerExtraInfo: {
        flex: 1,
        alignItems: 'center',
        marginTop: 35,
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
        marginTop: 20,
    },
    titleTexts: {
        color: colors.colmenaGrey,
    },
    aboutMeInfo: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
    },
    aboutMeText: {
        textAlign: 'justify',
        color: colors.colmenaGrey
    },
    tabBarContainer: {
        flex: 1,
    },
    tabBar: {  // Íconos de los tabs
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
    tabContent: {
        flex: 1,
        justifyContent: 'flex-start',
    },
});

export default MyProfile;