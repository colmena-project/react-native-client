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

import {List} from 'react-native-paper';

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
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.myAccount();
    this.initData();
  }

  estimateTransportDistance = async() =>{
    const {myAccountStatus} = this.props;
    const latLong = myAccountStatus.data.addresses[0].latLng;

    const rc = await AsyncStorage.getItem('RecyclingCenter');
    let retributionDistance = await Parse.Cloud.run('estimateRetribution', {
      'type': 'transport',
      'elements': [
        { latitude: latLong.latitude, longitude: latLong.longitude}, 
        { latitude: JSON.parse(rc).latitude, longitude: JSON.parse(rc).longitude}]
    });

    this.setState({ RecyclingCenter: { name: JSON.parse(rc).name, description: JSON.parse(rc).description }});
    this.setState({ rcName: JSON.parse(rc).name});
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
    });
  };

  submit() {
    this.props.navigation.navigate('TransportSuccess');
  }

  render() {
    const {loadingVisible} = this.state;
    
    return (
      <View style={styles.scrollViewWrapper}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerMsg}>
            <Image
              style={styles.colmenaLogo}
              source={require('../../../../assets/icons/png/icon-transportar.png')}
            />
            <Text style={styles.brandTextCenter}>Verificar info de Transporte</Text>
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
