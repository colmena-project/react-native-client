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
      account: null,
      checked: false,
      containers: [],
      stock: null,
      next: false,
    };

    this.wasteSubmit = this.wasteSubmit.bind(this);
  }

  limpiarWastes = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const wastesRemove = keys.filter(item => item.includes('wastes_'));
    await AsyncStorage.multiRemove(wastesRemove);
    this.setState({next: false});
  };

  displayStorage = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    const res = items.filter(item => item[0].includes('wastes_'));
    return res;
  };

  wasteSubmit() {
    this.props.navigation.navigate('WastesEdit');
  }

  edit(wasteId){
    Alert.alert('param: ' + wasteId);
  }


  stockList() {
    const {myStockStatus} = this.props;

    return myStockStatus.data.map((wasteType, index) => {
      let img = Object.values(wasteType.wasteType.iconFile)[3];
      return (
      <TouchableOpacity onPress={()=> {
        this.props.navigation.navigate('WastesEdit', { type: wasteType.wasteType.id });
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
              <Text style={styles.tableItem}>
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
    // this.checkInitial();
    this.props.myStock();
    //this.props.wasteTypes();
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

          {this.props.myStockStatus.data ? (
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
  myStockStatus: state.myStockStatus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ActionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(index);
