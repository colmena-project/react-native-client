
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import colors from '../../constants/colors';
import styles from '../../constants/profileStyles';
import FeedListU from '../posts/FeedListU';

import { useDispatch } from 'react-redux';
import Auth from '../../services/Auth';

import EvilIcons from 'react-native-vector-icons/EvilIcons';


const UserTab = props => {


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
            fetchPosts.descending('createdAt').limit(POST_PER_LOAD_LIMIT);
            const result = await fetchPosts.find();
            const transactions = new Parse.Query('Transaction');
            transactions.equalTo('type', 'TRANSPORT');
            transactions.descending('createdAt').equalTo('expiredAt', undefined);
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

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    };

    const handleOnEndReached = () => {
        props.loadMorePosts();
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
        <ScrollView style={{ flex: 1 }} onScroll={({ nativeEvent }) => {
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
                                source={require('../../../assets/default_user_1.png')}
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
    );
};

export default UserTab;