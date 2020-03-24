import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Parse } from 'parse/react-native';

import colors from '../posts/FeedList';
import Feed from './Feed';

const FeedList = props => {

    const [data, setData] = useState(null);

    const loadData = async () => {
        try {
            const posts = new Parse.Query('Post');
            posts.descending("createdAt");
            const result = await posts.find();

            setData(result);
        } catch (err) {
            console.log('Error!! ' + err);
        }
    };

    if (data === null) {
        loadData();
    }

    const fillFeedWithPosts = post => {

        const createdBy = post.item.get('createdBy');
        const username = createdBy.get('username');

        return (
            <View style={styles.feedContainer}>
                <View style={styles.feedItem}>
                    <Feed userName={'@' + username} feed={post.item.get("text")}
                        hashTags={post.item.createdAt.toString()} likes={'134'} image={''} />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.feedList}>
            {data === null ? <ActivityIndicator style={{marginTop: 50}}size={'large'} color={colors.colmenaGreen} /> :
                <FlatList style={styles.mainFeed}
                    nestedScrollEnabled={true}
                    keyExtractor={(item, index) => item.id}
                    data={data}
                    renderItem={fillFeedWithPosts} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    feedList: {
        flex: 1,
        width: '100%',
    },
    mainFeed: {
        width: '100%',
        flex: 1,
    },
    feedContainer: {
        width: '100%',
        alignItems: 'center'
    },
    feedItem: {
        width: '90%',
    },
});

export default FeedList;