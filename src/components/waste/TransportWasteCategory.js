import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import TransportWasteItem from './TransportWasteItem';
import styles from '../../constants/profileStyles';
import colors from '../../constants/colors';

const TransportWasteCategory = props => {

    const wasteType = props.wasteType;
    const containers = props.containers;
    const [filteredContainers, setFilteredContainers] = useState(null);

    const handleToogleCheck = (isChecked, container) => {
        props.handleToogleCheck(isChecked, container);
    };

    useEffect(() => {
        if (containers && wasteType) {
            const data = containers.filter(container => container.get('type').id == wasteType.id);
            setFilteredContainers(data);
        }
    }, [containers]);

    return (
        <View style={{ width: 150}}>
            {filteredContainers && wasteType ?
                <View style={{ alignItems: 'center', width: 200 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ resizeMode: 'contain', width: 100, height: 100 }} source={{ uri: wasteType.get('iconFile')._url }} />
                        <Text style={styles.wasteDescription}>
                            {wasteType.get('name')}
                        </Text>
                        <View style={{ backgroundColor: colors.colmenaGreen, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 3, position: 'absolute', top: 40 }}>
                            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 22, color: 'white' }}>{filteredContainers.length}</Text>
                        </View>
                    </View>
                    <ScrollView style={{ height: 200, marginTop: 10, width: '85%' }}>
                        {filteredContainers && filteredContainers.length > 0 ?
                            filteredContainers.map(container => {
                                return <TransportWasteItem key={container.id} toogleCheck={isChecked => handleToogleCheck(isChecked, container)} container={container} />
                            })
                            :
                            <View></View>
                        }
                    </ScrollView>
                </View>
                :
                <View></View>
            }
        </View>
    );
};

export default TransportWasteCategory;