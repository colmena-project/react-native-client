import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Feed = props => {

    const user = props.user;

    const handleOnPress = () => {
        props.onPress(user);
    };

    const handleDifference = () =>{
        
    }
    const date1 = new Date(props.hashTags)
    const date2 = new Date();

    function getDifferenceInDays(date1, date2) {
        const diffInMs = Math.abs(date2 - date1);
        return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    }
      
    function getDifferenceInHours(date1, date2) {
        const diffInMs = Math.abs(date2 - date1);
        return Math.floor(diffInMs / (1000 * 60 * 60));
    }
      
    function getDifferenceInMinutes(date1, date2) {
        const diffInMs = Math.abs(date2 - date1);
        return Math.floor(diffInMs / (1000 * 60));
     }
    function getDifferenceInSeconds(date1, date2) {
        const diffInMs = Math.abs(date2 - date1);
        return Math.floor(diffInMs / 1000);
    }
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
                    {props.likes}
                </Text>
            </View>
            {/* <Text style={styles.hashTag}>
                {props.hashTags}
            </Text> */}
            <Text style={styles.feedText}>
                {props.feed}
            </Text>
            <Text style={{ ...styles.feedText, fontSize: 10 }}>
                Hace {getDifferenceInDays(date1, date2)>0? `${getDifferenceInDays(date1, date2)}d`: 
                    getDifferenceInHours(date1, date2)>0?`${getDifferenceInHours(date1, date2)}h`:
                    getDifferenceInMinutes(date1, date2)>0?`${getDifferenceInMinutes(date1, date2)}m`:
                    `${getDifferenceInSeconds(date1, date2)}s`}
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