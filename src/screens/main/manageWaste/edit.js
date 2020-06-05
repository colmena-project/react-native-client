import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert
} from 'react-native';

import { IconButton, Colors } from 'react-native-paper';

import Parse from 'parse/react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../../redux/actions';

import AsyncStorage from '@react-native-community/async-storage';

import WasteEdit from '../../../components/waste/WasteEdit';

import styles from '../../../styles/waste';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      checks: 0,
      containers: [],
    };
    this.remove = this.remove.bind(this);
    //this.handleChecked = this.handleChecked.bind(this);
    //this.submit = this.submit.bind(this);
  }


  componentDidMount() {
    this.props.wasteTypes();
    this.props.myAccount();
    this.initialData();
  }


  remove(id, code){
    Alert.alert(
      `Eliminar ${code}`,
      `Estas seguro que queres eliminar este contenedor ${code} ?`,
      [
        {
          text: 'Si, estoy seguro',
          onPress: () => this.setState({containers: this.state.containers.filter(item => item.objectId !== id)})
        },
        {
          text: 'Cancelar',
          onPress: () => console.log('Acción cancelada'),
          style: 'cancel'
        },
      ],
      { cancelable: false }
    );
  }

  initialData = () => {
    const {myAccountStatus} = this.props;
    const accountData = myAccountStatus.data;
    const filteredData = accountData.containers.filter(item => item.status == 'RECOVERED');
    this.setState({containers: filteredData});
  };

  render() {
    const {checks} = this.state;
    return (
        <View style={styles.wrapper}>
          <View style={styles.brand, { padding: 10}}>
            <Text style={styles.brandText}>Gestionar residuos { this.props.route.params.type }</Text>
          </View>
          <View>
            { this.props.myAccountStatus.data ? (
                <FlatList
                  style={{ height: '76%'}}
                  data={ this.state.containers } 
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => <WasteEdit waste={item} action={this.remove} />} 
                />
              ) : (
                <Text style={styles.text}>Cargando...</Text>
              )}

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <IconButton
                  icon="plus"
                  color={Colors.green500}
                  size={40}
                  onPress={() => console.log('Pressed')}
                  style={{ backgroundColor: Colors.green50 }}
                />
              </View>

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
