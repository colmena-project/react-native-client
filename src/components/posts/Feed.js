import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Feed = props => {
    return (
        <View style={styles.feed}>
            <View style={styles.userName}>
                <View>
                    <Text style={styles.userNameText}>
                        {props.userName}
                    </Text>
                </View>
                <View style={styles.moreActions}>
                    <Icon name={'ios-more'} size={18} color={'#3d8cea'} />
                </View>
            </View>
            <Text>
                {props.feed}
            </Text>
            <Text style={styles.actionButtons}>
                <Icon name={'ios-heart'} size={18} color={'#fe87a5'} />  {props.likes} Me gusta
            </Text>
            <Text style={styles.hashTag}>
                {props.hashTags}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    feed: {
        marginVertical: 15,
    },
    userName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    userNameText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    actionButtons: {
        height: 40,
        textAlignVertical: 'center',
    },
    hashTag: {
        color: '#3d8cea',
    },
    moreActions: {
        transform: [{ rotate: '90deg' }],
    }
});

export default Feed;