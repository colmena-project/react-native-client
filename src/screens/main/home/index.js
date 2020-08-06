import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Installation from "../../../services/Installation";
import { Parse } from "parse/react-native";
import colors from "../../../constants/colors";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostModal from "../../../components/posts/PostModal";
import FeedList from "../../../components/posts/FeedList";
import AuthorizedScreen from '../../../components/auth/AuthorizedScreen';

const TOP_NAVBAR_HEIGHT = 60;

const HomeScreen = props => {

    const POST_PER_LOAD_LIMIT = 20;
    const [isAddMode, setIsAddMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [posts, setPosts] = useState([]);
    const navigation = useNavigation();

    const loadPosts = async () => {
        try {
            setIsLoading(true);
            const fetchPosts = new Parse.Query("Post");
            fetchPosts.include('createdBy').descending("createdAt").limit(POST_PER_LOAD_LIMIT);
            const result = await fetchPosts.find();
            setPosts(result);
            setIsLoading(false);
        } catch (err) {
            console.log("Error!! " + err);
        }
    };

    const loadMorePosts = async () => {
        try {
            setIsLoadingMore(true);
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

    const handleOnEndReached = () => {
        loadMorePosts();
    };

    const handleOnSendButton = async (text, image = null, filename = '') => {
        try {

            setIsAddMode(false);
            const Post = Parse.Object.extend("Post");
            const post = new Post();
            post.set('text', text);
            if (image !== null && filename !== '') {
                const postImage = new Parse.File(filename, { base64: image });
                post.set('image', postImage);
            }
            await post.save();
            loadPosts();
        } catch (err) {
            console.log("Error!! " + err);
        }
    };

    const handleOnCancelPress = () => {
        setIsAddMode(false);
    };

    useEffect(() => {
        Installation.setInstallation();
        loadPosts();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadPosts();
        });
        return unsubscribe;
    }, [navigation]);

    const handleOthersProfile = (user) => {
        props.navigation.navigate("OthersProfile", { user });
    };

    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, TOP_NAVBAR_HEIGHT);
    const translateY = diffClamp.interpolate({
        inputRange: [0, TOP_NAVBAR_HEIGHT],
        outputRange: [0, -TOP_NAVBAR_HEIGHT - 1],
    });

    return (
        <AuthorizedScreen>
            <View style={styles.screen}>
                <Animated.View
                    style={{
                        transform: [{ translateY: translateY }],
                        zIndex: 999
                    }}>
                    <View style={styles.brand}>
                        <Image
                            resizeMode={'contain'}
                            style={{ width: '34%', height: 45 }}
                            source={require("../../../../assets/colmena_logo.png")}
                        />
                        <EvilIcons name={'cart'} size={30} color={'#cccccc'} />
                    </View>
                </Animated.View>
                <PostModal
                    onRequestClose={() => setIsAddMode(false)}
                    visible={isAddMode}
                    onCancelPress={handleOnCancelPress}
                    onSendPress={handleOnSendButton}
                />
                <View style={{ flex: 1 }}>

                    {isLoading ? (
                        <ActivityIndicator
                            style={{ marginTop: 100 }}
                            size={"large"}
                            color={colors.colmenaGreen}
                        />
                    ) : (
                            <FeedList paddingTop={TOP_NAVBAR_HEIGHT} onPress={handleOthersProfile} data={posts} onScroll={value => scrollY.setValue(value)} onEndReached={handleOnEndReached} />
                        )}
                    {isLoadingMore ?
                        <ActivityIndicator
                            size={"large"}
                            color={colors.colmenaGreen}
                        />
                        : <View></View>}
                </View>
                {/* <ScrollView style={styles.container} onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}>

                    <View style={{ paddingHorizontal: 15 }}>
                        <View style={styles.colmenaHeaderTextContainer}>
                            <Text style={styles.colmenaHeaderSubtitle}>Novedades</Text>
                        </View>

                        {isLoading ? (
                            <ActivityIndicator
                                style={{ marginTop: 10 }}
                                size={"large"}
                                color={colors.colmenaGreen}
                            />
                        ) : (
                                <FeedList onPress={handleOthersProfile} data={posts} onEndReached={handleOnEndReached} />
                            )}
                        {isLoadingMore ?
                            <ActivityIndicator
                                size={"large"}
                                color={colors.colmenaGreen}
                            />
                            : <View></View>}
                    </View>

                </ScrollView> */}
                <TouchableOpacity
                    style={styles.floatingIcon}
                    onPress={() => setIsAddMode(true)}
                >
                    <MaterialCommunityIcons style={styles.addPostIcon} name={'pencil'} size={26} color={'white'} />
                </TouchableOpacity>
            </View>
        </AuthorizedScreen>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        width: "100%",
        paddingTop: TOP_NAVBAR_HEIGHT,
    },
    brand: {
        height: TOP_NAVBAR_HEIGHT,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: 'white',
        elevation: 4,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0
    },
    topNavigator: {
        width: "100%",
        marginTop: 25,
    },
    bottomNavigator: {
        width: "100%",
    },
    colmenaHeaderTextContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    colmenaHeaderSubtitle: {
        width: "100%",
        textAlign: "left",
        fontSize: 20,
        fontFamily: 'Nunito-SemiBold',
        paddingLeft: 20,
        paddingBottom: 8,
        color: "#4c4c4c",
    },
    floatingIcon: {
        backgroundColor: colors.colmenaGreen,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        position: "absolute",
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        right: 10,
        bottom: 10,
    },
    addPostIcon: {
        textAlign: 'center',
        padding: 11,
        width: "100%",
        height: "100%",
    },
});

export default HomeScreen;