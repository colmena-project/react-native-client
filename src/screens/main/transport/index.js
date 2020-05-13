import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../../redux/actions';

import WasteCheck from '../../../components/waste/WasteCheck';

import styles from '../../../styles/waste';

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
      checks: 2,
      next: false,
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    this.props.navigation.navigate('TransportAddress');
  }


  componentDidMount() {
    this.props.myAccount();
    this._retrieveData();
  }
  componentDidUpdate() {
    this._retrieveData();
  }

 _retrieveData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      const elegidas = items.filter(item => item[0].includes('containers_'));
      let c = 0;
      elegidas.forEach((el) => {
        c += 1;
      });
      console.log(c);
      this.setState({checks: c});
    } catch (error) {
    }
  };

  listHeader = () => {
    const {myAccountStatus} = this.props;
    const accountData = myAccountStatus.data;
    let total = 0;
    let elegidas = 0;
    let containers = accountData.containers.filter(item => item.status == 'RECOVERED');
    containers.forEach((el) => {
      total += 1;
    });
    var header = (
      <View style={styles.totalize}>
        <Text>Total {total}</Text>
        <Text>Elegidas {this.state.checks}</Text>
      </View>
    );
    return header;
  };

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
              data={ accountData.containers.filter(item => item.status == 'RECOVERED') } 
              keyExtractor={(item, index) => item.key}
              renderItem={({item}) => <WasteCheck waste={item} />} 
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
