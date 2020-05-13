import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import styles from '../../../styles/waste';

export default function success(props) {
  /*
  static navigationOptions = ({navigation}) => ({
    header: null,
  });
  */
  const submit = () => {
    // props.navigation.navigate('WasteCheckInfo');
    Alert.alert('Peticiones pendientes...');
  };

  return (
    <View style={styles.scrollViewWrapper}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerMsg}>
          <Image
            style={styles.colmenaLogo}
            source={require('../../../../assets/icons/png/icon-transportar.png')}
          />
          {/*
          <Text style={styles.headerTitle}>
            Residuos registrados correctamente!
          </Text>
          */}
        </View>
        <View>
          <Text style={styles.headerSubtitle}>
            Tu petición de transporte está siendo evaluada. Se te enviará un mensaje con los avances
          </Text>
        </View>

        <View style={{marginTop: 5}}>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={this.submit}>
            <Text style={styles.submitText}>VER PETICIONES PENDIENTES</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}