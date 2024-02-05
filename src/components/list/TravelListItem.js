import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, Fontisto } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { Badge } from 'react-native-paper';
import { styles as globalStyles } from '../../constants/styles';

const TravelListItem = props => {

    const { travel } = props;
    const truck = travel.get('truck');
    const status = travel.get('status');
    const date = `${travel.get('createdAt').getDate()}/${travel.get('createdAt').getMonth() + 1}/${travel.get('createdAt').getFullYear()}`;
    let badgeStyle = null;
    let statusTranslation = null;

    switch (status) {
        case 'CREATED':
            badgeStyle = globalStyles.antTagGold;
            statusTranslation = 'CREADO';
            break;
        case 'ONGOING':
            badgeStyle = globalStyles.antTagGreen;
            statusTranslation = 'EN PROGRESO';
            break;
        case 'FINISHED':
            badgeStyle = globalStyles.antTagRed;
            statusTranslation = 'FINALIZADO';
            break;
    };

    return (
        <TouchableOpacity onPress={props.onPress} style={{ ...styles.container, ...props.containerStyle }}>
            <View style={{ ...styles.infoContainer, ...props.infoContainer, flex: 1 }}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ ...styles.title, marginLeft: 2 }}>{truck.get('licensePlate')} <Text style={styles.subTitle}>- {date}</Text></Text>
                        <View style={{ justifyContent: 'center' }}>
                            <Badge style={{ marginLeft: 10, justifyContent: 'center', ...badgeStyle }}>{statusTranslation}</Badge>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ ...styles.subIcon, borderColor: 'white' }}>
                            <MaterialCommunityIcons name={'ray-start'} size={14} color={'green'} />
                        </View>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={{ ...styles.subTitle, width: '95%'}}>{travel.get('startFullAddress')}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 2, flex: 1 }}>
                        <View style={{ ...styles.subIcon, borderColor: 'white' }}>
                            <MaterialCommunityIcons name={'ray-end'} size={14} color={'red'} />
                        </View>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={{ ...styles.subTitle, width: '95%'}}>{travel.get('endFullAddress')}</Text>                    
                    </View>
                </View>
            </View>
            <MaterialIcons name={'chevron-right'} size={36} color={colors.primaryOldMossGreen} />
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderColor: 'gray'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        height: 45,
        padding: 7,
        borderWidth: 1,
        borderColor: colors.accentLaurelGreen,
        borderRadius: 50,
        marginRight: 5
    },
    subIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        padding: 2,
        borderWidth: 1,
        borderColor: colors.accentLaurelGreen,
        borderRadius: 50,
        marginRight: 5
    },
    title: {
        fontFamily: 'NunitoSans-Bold',
        fontSize: 18
    },
    subTitle: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: 14,
        color: 'gray'
    },
});

export default TravelListItem;