import React, { useState, useReducer } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { Parse } from 'parse/react-native';

import colors from '../../../styles/colors';
import stylesCommon from '../../../styles/login';

import PostModal from '../../../components/posts/PostModal';
import FeedList from '../../../components/posts/FeedList';
import { useEffect } from 'react';

const HomeFeed = props => {

    const [isAddMode, setIsAddMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    const loadData = async () => {
        try {
            setIsLoading(true);
            const posts = new Parse.Query('Post');
            posts.descending("createdAt");
            const result = await posts.find();

            setData(result);
            setIsLoading(false);
        } catch (err) {
            console.log('Error!! ' + err);
        }
    };

    const getToken = async () => {
        const FCMToken = await AsyncStorage.getItem('FCMToken');
        if (!FCMToken) throw new Error('No tiene token.');

        return FCMToken;
    };

    const getInstallation = async () => {
        try {
            const FCMToken = await getToken();
            const session = await Parse.Session.current();
            const installationId = session.get('installationId');

            //FIXME: Add dynamic data
            const newInstallation = new Parse.Installation();
            newInstallation.set('deviceType', 'android');
            newInstallation.set('installationId', installationId);
            newInstallation.set('channels', ["All"]);
            newInstallation.set('pushType', 'gcm');
            newInstallation.set('timeZone', 'America/Argentina/Buenos_Aires');
            newInstallation.set('appName', 'ColmenaApp');
            newInstallation.set('appIdentifier', 'com.colmena.colmenapp');
            newInstallation.set('deviceToken', FCMToken);

            await newInstallation.save();
        } catch (err) {
            console.log('Error!! ' + err);
        }
    };

    const handleOnSendButton = async (text) => {
        try {
            setIsAddMode(false);
            const Post = Parse.Object.extend('Post');
            const post = new Post();

            post.set("text", text);
            await post.save();
            loadData();
        } catch (err) {
            console.log('Error!! ' + err);
        };
    };

    const handleOnCameraButton = async () => {
        console.log('OPEN CAMERA!!')
    };

    useEffect(() => {
        loadData();
        getInstallation();
    }, []);

    const handleOthersProfile = () => {
        props.navigation.navigate('OthersProfile');
    };

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <PostModal
                    onRequestClose={() => setIsAddMode(false)}
                    visible={isAddMode}
                    onSendPress={handleOnSendButton}
                    onCameraPress={handleOnCameraButton}
                />

                <View style={styles.brand}>
                    <Text style={{ ...stylesCommon.brandText, color: colors.colmenaGreen }}>Colmena</Text>
                    <Image
                        style={stylesCommon.colmenaLogo}
                        source={require('../../../../assets/colmena-app-ico.png')}
                    />
                </View>

                <View style={styles.colmenaHeaderTextContainer}>
                    <Text style={styles.colmenaHeaderSubtitle}>Novedades</Text>
                </View>

                {isLoading ? <ActivityIndicator style={{ flex: 1 }} size={'large'} color={colors.colmenaGreen} /> :
                    <FeedList onPress={handleOthersProfile} data={data} />
                }

                <TouchableOpacity style={styles.floatingIcon} onPress={() => setIsAddMode(true)}>
                    <Image
                        style={styles.addPostIcon}
                        source={require('../../../../assets/new-post-icon.png')}
                    />
                </TouchableOpacity>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    brand: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
        paddingTop: 20,
    },
    topNavigator: {
        width: '100%',
        marginTop: 25,
    },
    bottomNavigator: {
        width: '100%',
    },
    colmenaHeaderTextContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    colmenaHeaderSubtitle: {
        width: '100%',
        textAlign: 'left',
        fontSize: 24,
        marginLeft: 65,
        paddingBottom: 10,
        color: '#686868',
    },
    floatingIcon: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 10,
    },
    addPostIcon: {
        width: '100%',
        height: '100%'
    },
});

export default HomeFeed;