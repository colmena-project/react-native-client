import React from 'react';
import { View, Image } from 'react-native';

const TabIcon = props => {

    const iconFile = '';

    return (
        <View style={{ width: props.size, height: props.size }}>
            <Image
                style={{ width: props.size, height: props.size, resizeMode: 'contain' }}
                source={require('../../../assets/icons/png/icon-residuo-organico.png')}
            />
        </View>
    );
};

export default TabIcon;