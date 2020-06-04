import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Feed from './Feed';

const FeedList = props => {

    const data = props.data;

    const handleOnPress = () => {
        props.onPress();
    };

    return (
        <View style={styles.feedList}>
            {data.map(item => {
                return (<View key={item.id} style={styles.feedContainer}>
                    <View style={styles.feedItem}>
                        <Feed onPress={handleOnPress} userName={'@' + item.get('createdBy').get('username')} feed={item.get("text")}
                            hashTags={item.createdAt.toString()} likes={'134'} image={''} />
                    </View>
                </View>);
            })}
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