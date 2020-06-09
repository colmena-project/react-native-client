import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlightBase,
  Button,
  Alert,
} from 'react-native';

import colors from '../../../styles/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../../redux/actions';

import styles from '../../../styles/waste';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containers: [],
    };
  }

  stockList() {
    const {myAccountStatus, navigation} = this.props;
    const accountData = myAccountStatus.data;
    return accountData.stock.map((wasteType, index) => {
      let img = Object.values(wasteType.wasteType.iconFile)[3];
      return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('WastesEdit', { type: wasteType.wasteType.objectId });
      }}>
        <View key={index.toString()} style={styles.box}>
          <View style={styles.tableItem}>
            <Image style={styles.boxImage} source={{uri: img}} />
            <Text style={{textAlign: 'center'}}>
              {wasteType.wasteType.name}
            </Text>
          </View>
          <View style={styles.tableItem}>
              <Text>{wasteType.ammount}</Text>
              <Text style={{alignItems: 'center' }}>
              {wasteType.ammount > 1 ? wasteType.wasteType.containerPlural : wasteType.wasteType.container }
              </Text>
          </View>
          <Ionicons name={'md-settings'} size={30} color={colors.colmenaLightGrey} />
        </View>
      </TouchableOpacity>
      );
    });
  }

  componentDidMount() {
    this.props.wasteTypes();
    this.props.myAccount();
  }

  render() {
    return (
      <View style={styles.scrollViewWrapper}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.brand}>
            <Text style={styles.brandText}>Gestionar residuos</Text>
          </View>

          <View style={styles.headerBox}>
            <Text style={styles.title}>TIPO</Text>
            <Text style={styles.title}>Cant. Aprox.</Text>
            <Text style={styles.title}></Text>
          </View>

          {this.props.myAccountStatus.data ? (
            this.stockList()
          ) : (
            <View>
              <Text style={styles.text}>Cargando residuos...</Text>
            </View>
          )}

        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  myAccountStatus: state.myAccountStatus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ActionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(index);
