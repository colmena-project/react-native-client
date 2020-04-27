import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Parse } from 'parse/react-native';

import colors from '../posts/FeedList';
import Feed from './Feed';
import { useEffect } from 'react';

const FeedList = props => {

    const [data, setData] = useState(null);

    const handleOnPress = () => {
        props.onPress();
    };

    const fillFeedWithPosts = post => {

        const createdBy = post.item.get('createdBy');
        const username = createdBy.get('username');

        return (
            <View style={styles.feedContainer}>
                <View style={styles.feedItem}>
                    <Feed onPress={handleOnPress} userName={'@' + username} feed={post.item.get("text")}
                        hashTags={post.item.createdAt.toString()} likes={'134'} image={''} />
                </View>
            </View>
        );
    };

    useEffect(() => {
        setData(props.data);
    }, []);

    return (
        <View style={styles.feedList}>
            <FlatList style={styles.mainFeed}
                nestedScrollEnabled={false}
                keyExtractor={(item, index) => item.id}
                data={data}
                renderItem={fillFeedWithPosts}
            />
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