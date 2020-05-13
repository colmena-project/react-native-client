import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

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
      totalTransportar: null,
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.localStock();
  }

  localStock = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    const containers = items.filter(item => item[0].includes('containers_'));

    // const total = containers.reduce(function(prev, cur) {
    //   return prev + JSON.parse(cur[1]).qty * 20;
    // }, 0);

   const total = 500;
    this.setState({localContainers: containers, totalAcopio: total, totalTransportar: total * 2});
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
            {/* this.showInfoAccount() */}
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
              <Text style={styles.footTotal}>{this.state.totalTransportar} jc</Text>
            </Text>
          </View>

          <View>
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={this.checkInfoSubmit}>
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
