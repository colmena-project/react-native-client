import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlightBase,
  Button,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../../redux/actions';

import WasteBox from '../../../components/waste/WasteBox';

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
    this.props.navigation.navigate('WasteCheckInfo');
  }

  wasteTypesList() {
    const {wasteTypeStatus} = this.props;

    return wasteTypeStatus.data.map((waste, index) => {
      return <WasteBox key={index} waste={waste} value={0} min={0} max={30} />;
    });
  }

  checkInitial = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    const res = items.filter(item => item[0].includes('wastes_'));
    if (res.length > 0) {
      this.setState({next: true});
    } else {
      this.setState({next: false});
    }
  };

  componentDidMount() {
    this.checkInitial();
    this.props.wasteTypes();
  }

  componentDidUpdate() {
    this.checkInitial();
  }

  render() {
    return (
      <View style={styles.scrollViewWrapper}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.brand}>
            <Text style={styles.brandText}>Registrar residuos</Text>
          </View>
          {/*
          <View>
            <Button
              title="terminar lo q quedo"
              onPress={() => {
                this.props.navigation.navigate('WasteSuccess');
              }}
            />
          </View>
          <View>
            <Button title="Limpiar wastes" onPress={this.limpiarWastes} />
          </View>
          */}
          <View style={styles.headerBox}>
            <Text style={styles.title}>TIPO</Text>
            <Text style={styles.title}>Cant. Aprox.</Text>
            <Text style={styles.title}>Retribución</Text>
          </View>

          {this.props.wasteTypeStatus.data ? (
            this.wasteTypesList()
          ) : (
            <View>
              <Text style={styles.text}>Cargando residuos...</Text>
            </View>
          )}
          {this.state.next ? (
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={this.wasteSubmit}>
              <Text style={styles.submitText}>Continuar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btnSubmitDisabled}
              onPress={this.wasteSubmit}>
              <Text style={styles.submitText}>Continuar</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  myStockStatus: state.myStockStatus,
  wasteTypeStatus: state.wasteTypeStatus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ActionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(index);
