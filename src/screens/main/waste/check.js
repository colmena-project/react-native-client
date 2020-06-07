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

import {List} from 'react-native-paper';

import Loader from '../../../components/Loader';

import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';

import NavBarButton from '../../../components/buttons/NavBarButton';

import colors from '../../../styles/colors';
import styles from '../../../styles/waste';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../../redux/actions';

import Parse from 'parse/react-native';

class check extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      localWastes: [],
      retribution: [],
      total: 0,
      loadingVisible: false,
    };

    this.checkInfoSubmit = this.checkInfoSubmit.bind(this);
  }

  componentDidMount() {
    this.props.myAccount();
    this.props.wasteTypes();
    this.localStock();
  }

  async saveStock() {

    const {myAccountStatus} = this.props;

    this.setState({loadingVisible: true});
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    const wastes = items.filter(item => item[0].includes('wastes_'));
    const containers = wastes.map(item => {
      let waste = JSON.parse(item[1]);
      return {typeId: waste.id, qty: waste.qty};
    });

    const result = await this.props.updateStock(containers, myAccountStatus.data.addresses[0].objectId);
    await AsyncStorage.setItem('lastRecover', JSON.stringify(result));
    this.setState({loadingVisible: false});
    this.props.navigation.navigate('WasteSuccess');
  }

  checkInfoSubmit() {
    this.saveStock();
  }

  localStock = async () => {
    const {wasteTypeStatus} = this.props;
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    const wastes = items.filter(item => item[0].includes('wastes_'));
    const estimateParam = [];

    wastes.map(waste => { 
      let oWaste = JSON.parse(waste[1]);
      let wTypes = wasteTypeStatus.data.filter(item => item.id == oWaste.id);
      estimateParam.push({ 
        wasteType: oWaste.id, 
        qty: oWaste.qty * wTypes[0].get('qty'),
        unit: wTypes[0].get('unit')
      });
    });

    let retribution = await Parse.Cloud.run('estimateRetribution', {
      'type': 'material',
      'elements': estimateParam
    });
    this.setState({localWastes: wastes, retribution: retribution['material']['elements'], total: retribution['material']['total']});
  };


  calcularJC = (wasteID) => {
    let retribution = this.state.retribution.filter(item => item.wasteType == wasteID);
    return retribution[0].value
  };

  wastesBucket = () => {
    const {localWastes} = this.state;

    return localWastes.map((item, index) => {
      let waste = JSON.parse(item[1]);
      return (
        <View key={index} style={styles.tableGroup}>
          <View style={{...styles.tableItem, alignItems:'flex-start' }}>
            <Text style={styles.title}>{waste.name}</Text>
          </View>
          <View style={styles.tableItem}>
            <Text style={styles.title}>{waste.qty}</Text>
          </View>
          <View style={{...styles.tableItem, alignItems:'flex-end'}}>
            <Text style={styles.title}> {this.calcularJC(waste.id)} jc</Text>
          </View>
        </View>
      );
    })
  };

  render() {
    const {loadingVisible} = this.state;
    
    const {myAccountStatus, wasteTypeStatus} = this.props;

    return (
      <View style={styles.scrollViewWrapper}>
        <Loader modalVisible={loadingVisible} animationType="fade" />
        <ScrollView style={styles.scrollView}>
          <View style={{width: '100%'}}>
            <Image
              style={{...styles.headerImage, width: 80, height:80, alignItems: 'center', alignContent:'center',textAlign: 'center' }}
              source={require('../../../../assets/icons/png/icon-registrar-gestionar.png')}
            />
          </View>
          <View style={{ width:'100%', marginBottom: 15,}}>
            <Text style={{...styles.headerTitle, fontSize: 28,}}>Verificar info</Text>
          </View>
          <View>
          {myAccountStatus.data ? (
            <List.Item 
              title={`${myAccountStatus.data.addresses[0].street}`} 
              description={`${myAccountStatus.data.addresses[0].city}  ${myAccountStatus.data.addresses[0].state}`} 
              left={props => <List.Icon icon="map-marker-outline" />} 
            />
            ) : (
            <View>
              <Text style={styles.text}>Obteniendo ubicación...</Text>
            </View>
          )}
          </View>
          <View style={styles.tableHeader}>
            <Text style={styles.text}>Material</Text>
            <Text style={styles.text}>Bolsas</Text>
            <Text style={styles.text}>Ganancia</Text>
          </View>
          {this.wastesBucket()}
          <View style={styles.tableFoot}>
            <Text style={styles.footText}>
              Retribución Total{' '}
              <Text style={styles.footTotal}> {this.state.total} jc</Text>
            </Text>
          </View>

          <View>
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={this.checkInfoSubmit}>
              <Text style={styles.submitText}>Guardar y continuar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  myAccountStatus: state.myAccountStatus,
  wasteTypeStatus: state.wasteTypeStatus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ActionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(check);
