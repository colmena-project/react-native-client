import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

import Parse from 'parse/react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../../redux/actions';

import AsyncStorage from '@react-native-community/async-storage';

import WasteCheck from '../../../components/waste/WasteCheck';

import styles from '../../../styles/waste';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      checks: 0,
      next: false,
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit() {
    this.props.navigation.navigate('TransportAddress');
  }

  componentDidMount() {
    this.props.wasteTypes();
    this.props.myAccount();
  }
  

  

  listHeader = () => {
    const {myAccountStatus} = this.props;
    const accountData = myAccountStatus.data;
    let total = 0;
    let containers = accountData.containers.filter(item => item.status == 'RECOVERED');
    containers.forEach((el) => {
      total += 1;
    });
    return (
      <View style={styles.totalize}>
        <Text>Total {total}</Text>
        <Text>Elegidas {this.state.checks}</Text>
      </View>
    );
  };

  handleChecked(wasteID, code, check) {
    console.log('WasteID: ' + wasteID);
    console.log('code: ' + code);
    if (!check) {
      this.setState({checks: this.state.checks - 1 });
      AsyncStorage.removeItem('containers_' + wasteID);
    } else {
      this.setState({checks: this.state.checks + 1 });
      AsyncStorage.setItem(
        'containers_' + wasteID,
        JSON.stringify({id: wasteID, code: code}),
      );
    }
  }

  /*
  limpiar = async ()=>{
    console.log('limpiando...');
    const keys = await AsyncStorage.getAllKeys();
    const wastesRemove = keys.filter(item => item.includes('containers_'));
    await AsyncStorage.multiRemove(wastesRemove);
    console.log('limpieza completa!');
  }
  */

  render() {
    const {myAccountStatus} = this.props;
    const accountData = myAccountStatus.data;

    return (
      <View style={styles.wrapper}>

          <View style={styles.brand, { padding: 10}}>
            <Text style={styles.brandText}>Elija los contenedores</Text>
          </View>
          <View>
          {
            this.props.myAccountStatus.data ? (
              <FlatList
                style={{ height: '78%'}}
                data={ accountData.containers } 
                keyExtractor={(item, index) => item.key}
                renderItem={({item}) => <WasteCheck waste={item} action={this.handleChecked} />} 
                ListHeaderComponent={this.listHeader} 
                stickyHeaderIndices={[0]}
              />
            ) : (
              <Text style={styles.text}>Cargando...</Text>
            )
          }
          </View>
          <View style={{ width:'80%', alignSelf: 'center'}}>
            <TouchableOpacity
                style={styles.btnSubmit}
                onPress={this.submit}>
                <Text style={styles.submitText}>Continuar</Text>
            </TouchableOpacity>
          </View>
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
