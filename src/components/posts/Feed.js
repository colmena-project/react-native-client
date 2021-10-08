import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
                {/* <View style={styles.moreActions}>
                    <Ionicons name={'ios-more'} size={18} color={'#3d8cea'} />
                </View> */}
            </View>
            {props.image ?
                <View style={{ width: '100%', height: 410, marginTop: 10, marginBottom: 5, backgroundColor: '#272822' }}>
                    <Image
                        style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                        source={{ uri: props.image._url }}/>
                </View>
                :
                <View></View>}
            <View style={styles.likesContainer}>
                <Ionicons name={props.likes > 0 ? 'ios-heart' : 'ios-heart-empty'} size={18} color={props.likes > 0 ?'#fe87a5' : '#4c4c4c'} />
                <Text style={styles.likesText}>
                    {props.likes} Me gusta
                </Text>
            </View>
            {/* <Text style={styles.hashTag}>
                {props.hashTags}
            </Text> */}
            <Text style={styles.feedText}>
                {props.feed}
            </Text>
            <Text style={{ ...styles.feedText, fontSize: 10 }}>
                Hace 2d
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    feed: {
        marginVertical: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED',
        paddingBottom: 15,
    },
    userName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    userNameText: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Nunito-SemiBold',
        color: '#4c4c4c',
    },
    likesContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    likesText: {
        color: '#4c4c4c',
        paddingHorizontal: 5,
        textAlignVertical: 'center',
        fontSize: 12
    },
    hashTag: {
        paddingHorizontal: 10,
        color: '#3d8cea',
        fontSize: 10,
    },
    moreActions: {
        transform: [{ rotate: '90deg' }],
    },
    feedText: {
        marginTop: 5,
        fontFamily: 'Nunito-Regular',
        color: '#4c4c4c',
        paddingHorizontal: 10
    }
});

export default Feed;