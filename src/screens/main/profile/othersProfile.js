import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Parse } from 'parse/react-native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';

import colors from '../../../constants/colors';
import FeedListU from '../../../components/posts/FeedListU';

const OthersProfile = props => {

    const [userAccount, setUserAccount] = useState(null);
    const POST_PER_LOAD_LIMIT = 20;
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postsQty, setPostsQty] = useState(0);

    const user = props.route.params.user;

    const handleOnEndReached = () => {
        loadMorePosts();
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            // FIXME: Get account of the user owner of the post.
            const parseAccount = await Parse.Cloud.run("getAccountOf", { userId: user.id });
            const account = await parseAccount.toJSON();
            setUserAccount(account);
            props.navigation.setOptions({ title: `${account.firstName} ${account.lastName}` })
            const fetchPosts = new Parse.Query("Post");
            fetchPosts.equalTo('createdBy', user);
            fetchPosts.descending("createdAt").limit(POST_PER_LOAD_LIMIT);
            const result = await fetchPosts.find();
            const fetchPostsQty = new Parse.Query("Post");
            fetchPostsQty.equalTo('createdBy', user);
            const qty = await fetchPostsQty.count();
            setPostsQty(qty);
            setPosts(result);
            setIsLoading(false);
        } catch (err) {
            console.log('Others Profile: ' + err);
        }
        setIsLoading(false);
    };

    const loadMorePosts = async () => {
        try {
            setIsLoadingMore(true);
            const fetchPosts = new Parse.Query("Post");
            fetchPosts.equalTo('createdBy', user.id);
            fetchPosts.descending("createdAt").limit(POST_PER_LOAD_LIMIT).skip(posts.length);
            const result = await fetchPosts.find();
            const updatedPosts = [...posts, ...result];
            setPosts(updatedPosts);
            setIsLoadingMore(false);
        } catch (err) {
            console.log('Others Profile: ' + err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    };

    const handleOnUsernamePress = (user) => {
        props.navigation.navigate("OthersProfile");
    };

    return (
        <View style={{ ...styles.scrollViewWrapper }}>
            {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                <ScrollView style={styles.scrollView} onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        handleOnEndReached();
                    }
                }}>
                    <View style={styles.container}>

                        {/* *********** PROFILE HEADER *********** */}
                        <View style={styles.profileHeader}>
                            <View style={styles.profilePicture}>
                                {userAccount && userAccount.avatar ?
                                    <Image
                                        style={styles.avatar}
                                        source={{ uri: userAccount.avatar.url }}
                                    />
                                    :
                                    <Image
                                        style={styles.avatar}
                                        source={require('../../../../assets/default_user_1.png')}
                                    />
                                }
                                <Text style={styles.name}>
                                    @{user.get('username')}
                                </Text>
                            </View>

                            <View style={{}}>
                                <View style={styles.locationInfo}>
                                    <EvilIcons name={'location'} size={25} color={'#4C4C4C'} />
                                    <Text style={styles.titleTexts}>Posadas, Misiones</Text>
                                    {/* <Text style={styles.titleTexts}>{userAccount.city}, {userAccount.state}</Text> */}
                                </View>

                                <View style={styles.aboutMeInfo}>
                                    <Text style={styles.aboutMeText}>
                                        {userAccount.aboutMe}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {/* *********** FIN PROFILE HEADER *********** */}

                        {/* *********** ACTIVIDAD (POSTS) *********** */}
                        <View style={styles.activityContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                                <Text style={styles.activityTitle}>Actividad</Text>
                                <Text style={styles.activityExtraInfo}>
                                    {postsQty} <Text style={styles.activityExtraInfoDetail}>{postsQty === 1 ? 'POST' : 'POSTS'}</Text>
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

                    </View>
                </ScrollView>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    scrollViewWrapper: {
        flex: 1,
        padding: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: colors.colmenaBackground,
    },
    scrollView: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 8,
        flex: 1,
    },
    brand: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    brandText: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 26,
        color: colors.colmenaGrey,
        marginLeft: 30,
    },
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    profileHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
        width: 75,
        height: 75,
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
    impactTitle: {
        color: colors.colmenaGreen,
        fontFamily: 'Nunito-Regular',
        fontSize: 20
    },
    impactImage: {
        width: 75,
        height: 75,
        resizeMode: 'contain'
    },
    impactDescription: {
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        color: '#4C4C4C',
    },
    activityContainer: {
        flex: 3,
    },
    activityTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 18,
        color: '#4C4C4C',
        paddingVertical: 10,
        marginTop: 15,
    },
    activityExtraInfo: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
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

export default OthersProfile;