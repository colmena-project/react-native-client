import React from 'react';
import { View } from 'react-native';

import colors from '../../styles/colors';
import SvgUri from 'react-native-svg-uri';

const CustomSvgIcon = (image, focused = true, iconSize = 20, iconResize = 20) => {
    const size = focused ? iconResize : iconSize;
    const color = focused ? colors.colmenaGreen : colors.colmenaGrey;
    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <SvgUri
                width={size - 5}
                height={size - 5}
                source={image}
                fill={color}
            />
        </View>
    );
};

export default CustomSvgIcon;