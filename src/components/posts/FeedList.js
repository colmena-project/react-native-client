import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import Feed from './Feed';
import { useEffect } from 'react';

const FeedList = props => {

    const [data, setData] = useState(null);

    const handleOnPress = (user) => {
        props.onPress(user);
    };

    const handleOnEndReached = () => {
        props.onEndReached();
    };

    const handleOnScroll = event => {
        props.onScroll(event.nativeEvent.contentOffset.y);
    };

    const fillFeedWithPosts = post => {
        const user = post.item.get('createdBy');
        return (
            <View style={styles.feedContainer}>
                <View style={styles.feedItem}>
                    <Feed
                        onPress={handleOnPress}
                        user={user}
                        feed={post.item.get("text")}
                        hashTags={post.item.createdAt.toString()}
                        likes={'1594'}
                        image={post.item.get("image")}
                    />
                </View>
            </View>
        );
    };

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <View style={styles.feedList}>
            <FlatList style={{ ...styles.mainFeed, paddingTop: props.paddingTop }}
                ListHeaderComponent={props.ListHeaderComponent}
                onScroll={handleOnScroll}
                nestedScrollEnabled={false}
                keyExtractor={(item, index) => item.id}
                data={data}
                renderItem={fillFeedWithPosts}
                onEndReached={handleOnEndReached}
                onEndReachedThreshold={0.1}
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
        width: '100%',
    },
});

export default FeedList;