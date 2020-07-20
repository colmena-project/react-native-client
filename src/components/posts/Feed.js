import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Feed = props => {

    const user = props.user;

    const handleOnPress = () => {
        props.onPress(user);
    };

    return (
        <View style={styles.feed}>
            <View style={styles.userName}>
                <View>
                    <Text onPress={handleOnPress} style={styles.userNameText}>
                        @{user.get('username')}
                    </Text>
                </View>
                <View style={styles.moreActions}>
                    <Icon name={'ios-more'} size={18} color={'#3d8cea'} />
                </View>
            </View>
            <Text style={styles.feedText}>
                {props.feed}
            </Text>
            {props.image ?
                <View style={{ width: '100%', height: 225, marginTop: 20, backgroundColor: '#272822'}}>
                    <Image
                        style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                        source={{ uri: props.image._url }}
                    />
                </View>
                :
                <View></View>}
        </View>
    );
};

const styles = StyleSheet.create({
    feed: {
        marginVertical: 7,
        borderTopWidth: 1,
        borderTopColor: '#EDEDED',
        paddingTop: 15,
    },
    userName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    userNameText: {
        fontSize: 16,
        fontFamily: 'Nunito-SemiBold',
        color: '#4c4c4c',
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
    },
    feedText: {
        fontFamily: 'Nunito-Regular',
        color: '#4c4c4c'
    }
});

export default Feed;