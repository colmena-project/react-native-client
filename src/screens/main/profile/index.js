
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import colors from '../../../constants/colors';
import styles from '../../../constants/profileStyles';
import FeedListU from '../../../components/posts/FeedListU';

import { useDispatch } from 'react-redux';
import Auth from '../../../services/Auth';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AuthorizedScreen from '../../../components/auth/AuthorizedScreen';
import Parse from 'parse/react-native';


const UserProfile = props => {

    const [userAccount, setUserAccount] = useState(null);
    const POST_PER_LOAD_LIMIT = 20;
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postsQty, setPostsQty] = useState(0);
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const account = await Parse.Cloud.run("getMyAccount");
            setUserAccount(account);
            props.navigation.setOptions({ title: `${account.firstName} ${account.lastName}` });
            const fetchPosts = new Parse.Query("Post");
            fetchPosts.equalTo('createdBy', account.user).descending('createdAt').limit(POST_PER_LOAD_LIMIT);
            const result = await fetchPosts.find();
            setPostsQty(result.length);
            setPosts(result);
            setIsLoading(false);
        } catch (err) {
            console.log('fetchData - User Profile' + err);
        }
        setIsLoading(false);
    };

    const loadMorePosts = async () => {
        try {
            setIsLoadingMore(true);
            const fetchPosts = new Parse.Query("Post");
            fetchPosts.equalTo('createdBy', userAccount.user).descending("createdAt").limit(POST_PER_LOAD_LIMIT).skip(posts.length);
            const result = await fetchPosts.find();
            const updatedPosts = [...posts, ...result];
            setPostsQty(updatedPosts.length);
            setPosts(updatedPosts);
            setIsLoadingMore(false);
        } catch (err) {
            console.log("loadMorePosts - User Profile" + err);
        }
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            fetchData();
        });
        return unsubscribe;
    }, [props.navigation]);

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

    return (
        <AuthorizedScreen>
            {isLoading || !userAccount ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                <ScrollView style={{ ...styles.scrollViewWrapper }} onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        handleOnEndReached();
                    }
                }}>
                    {/* *********** PROFILE HEADER *********** */}
                    <View style={{ ...styles.profileHeader }}>

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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
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
            }
        </AuthorizedScreen>
    );
};

export default UserProfile;