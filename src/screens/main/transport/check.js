import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

import { Parse } from 'parse/react-native';
import AsyncStorage from '@react-native-community/async-storage';

import NavBarButton from '../../../components/buttons/NavBarButton';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../../styles/colors';

import { ActivityIndicator, List} from 'react-native-paper';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../../redux/actions';

import styles from '../../../styles/waste';

class check extends Component {

  constructor(props) {
    super(props);

    this.state = {
      localContainers: [],
      totalAcopio: null,
      totalTransport: null,
      distance: null,
      RecyclingCenter: null,
      loadingVisible: true,
    };

    // this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.myAccount();
    this.initData();
  }

  estimateTransportDistance = async() =>{
    const {myAccountStatus} = this.props;
    const latLong = myAccountStatus.data.addresses[0].latLng;
    const sRc = await AsyncStorage.getItem('RecyclingCenter');
    const rc = JSON.parse(sRc);
    let retributionDistance = await Parse.Cloud.run('estimateRetribution', {
      'type': 'transport',
      'elements': [
        { latitude: latLong.latitude, longitude: latLong.longitude}, 
        { latitude: rc.latitude, longitude: rc.longitude}]
    });

    this.setState({ RecyclingCenter: { id: rc.id, name: rc.name, description: rc.description }});

    return retributionDistance.transport;
  };

  initData = async () => {
    const {myAccountStatus} = this.props;

    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    const containers = items.filter(item => item[0].includes('containers_'));
    const myAccountData = myAccountStatus.data;
    
    const containerSelected = containers.map( item => {
      let container = JSON.parse(item[1]);
      return myAccountData.containers.filter( wt => wt.code == container.code);
    });

    const estimateParam = [];

    containerSelected.map( cs => { 
      estimateParam.push({
        wasteType: cs[0].type.id, 
        qty: cs[0].type.get('qty'),
        unit: cs[0].type.get('unit')
      });
    });

    let retribution = await Parse.Cloud.run('estimateRetribution', {
      'type': 'material',
      'elements': estimateParam
    });

    const jcDistance = await this.estimateTransportDistance();

    this.setState({ 
      localContainers: containers, 
      totalAcopio: retribution['material']['total'], 
      totalTransport: jcDistance.total, 
      distance: '...',
      loadingVisible: false,
    });
  };
  
  saveTransport = async () =>{
    const containers = this.state.localContainers.map(item => {
      return JSON.parse(item[1]).id;
    });
    const respRegister = await Parse.Cloud.run('registerTransport', {
      'containers': containers,
      'to': this.state.RecyclingCenter.id
    });
  };

  limpiar = async()=> {
    const keys = await AsyncStorage.getAllKeys();
    const containersRemove = keys.filter(item => item.includes('containers_'));
    await AsyncStorage.multiRemove(containersRemove);
  };

  submit = () => {
    this.setState({loadingVisible: true});
    this.saveTransport();
    this.limpiar();
    this.setState({loadingVisible: false});
    this.props.navigation.navigate('TransportSuccess');
  };

  render() {
    const {loadingVisible} = this.state;    
    return (
      <View style={styles.scrollViewWrapper}>
        { loadingVisible ? <ActivityIndicator animating={loadingVisible} style={{ flex: 1, alignItems: 'center' }} color={colors.colmenaGreen} /> :
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerMsg}>
            <Text style={styles.headerText}>Verificar info de Transporte</Text>
            <Image
              style={styles.headerIcon}
              source={require('../../../../assets/icons/png/icon-transportar.png')}
            />
          </View>
          <View>
            {this.state.RecyclingCenter && 
            <List.Item 
              title={this.state.RecyclingCenter.name}
              description={this.state.RecyclingCenter.description} 
              left={props => <List.Icon icon="map-marker-outline" />} 
            />}
          </View>
          {this.state.localContainers.map((item, index) => {
            let container = JSON.parse(item[1]);
            return (
              <View key={index} style={styles.tableGroup}>
                <View style={styles.tableItem}>
                  <Text style={styles.title}>{container.code}</Text>
                </View>
              </View>
            );
          })}
          <View style={styles.tableFoot}>
            <Text style={styles.footText}>
              Por Material Recuperado{' '}
              <Text style={styles.footTotal}>{this.state.totalAcopio} jc</Text>
            </Text>
          </View>

          <View style={styles.tableFoot}>
            <Text style={styles.footText}>
              Por Transporte{' '}
              <Text style={styles.footTotal}>{this.state.totalTransport} jc</Text>
            </Text>
          </View>

          <View style={styles.tableFoot}>
            <Text style={styles.footText}>
              Distancia{' '}
              <Text style={styles.footTotal}>{this.state.distance} km</Text>
            </Text>
          </View>
          
          <View>
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={this.submit}>
              <Text style={styles.submitText}>TRANSPORTAR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        }
      </View>
    )
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
)(check);
