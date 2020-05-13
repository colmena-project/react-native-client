import React, { Fragment } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import Address from '../../../components/address/Address';
import Address from '../profile/editAddress';

import styles from '../../../styles/waste';

const Location = (props) => {
    const continuar = () => {
        
        props.navigation.navigate('WasteCheckInfo');
    };

    return (
        <Fragment>
            <Address />
            <TouchableOpacity
                style={styles.btnSubmit}
                onPress={continuar}>
                <Text style={styles.submitText}>Continuar</Text>
            </TouchableOpacity>
        </Fragment>
    );
}

export default Location;