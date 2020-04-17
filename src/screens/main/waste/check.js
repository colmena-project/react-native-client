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

class check extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      localWastes: [],
      totalWastes: 0,
      loadingVisible: false,
    };

    this.checkInfoSubmit = this.checkInfoSubmit.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    headerLeft: (
      <NavBarButton
        icon={
          <Icon name="angle-left" color={colors.colmenaLightGrey} size={30} />
        }
        handleButtonPress={() => navigation.goBack()}
        location="left"
      />
    ),
    headerStyle: {
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerTransparent: true,
  });

  componentDidMount() {
    //this.props.myStock();
    this.localStock();
  }

  async saveStock() {
    this.setState({loadingVisible: true});
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    const wastes = items.filter(item => item[0].includes('wastes_'));
    const containers = wastes.map(item => {
      let waste = JSON.parse(item[1]);
      return {typeId: waste.id, qty: waste.qty};
    });
    const result = await this.props.updateStock(containers);
    await AsyncStorage.setItem('lastRecover', JSON.stringify(result));
    this.setState({loadingVisible: false});
    this.props.navigation.navigate('WasteSuccess');
  }
  checkInfoSubmit() {
    this.saveStock();
  }

  localStock = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    const wastes = items.filter(item => item[0].includes('wastes_'));
    const total = wastes.reduce(function(prev, cur) {
      return prev + JSON.parse(cur[1]).qty * 20;
    }, 0);
    this.setState({localWastes: wastes, totalWastes: total});
  };

  render() {
    const {loadingVisible} = this.state;
    return (
      <View style={styles.scrollViewWrapper}>
        <Loader modalVisible={loadingVisible} animationType="fade" />
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerMsg}>
            <Image
              style={styles.colmenaLogo}
              source={require('../../../../assets/icons/png/icon-registrar-gestionar.png')}
            />
            <Text style={styles.brandText}>Verificar info</Text>
          </View>
          <View>
            <List.Item
              title="Usuario"
              description="Dirección."
              left={props => <List.Icon icon="map-marker-outline" />}
            />
          </View>
          <View style={styles.tableHeader}>
            <Text style={styles.text}>Material</Text>
            <Text style={styles.text}>Bolsas</Text>
            <Text style={styles.text}>Ganancia</Text>
          </View>
          {this.state.localWastes.map((item, index) => {
            let waste = JSON.parse(item[1]);
            return (
              <View key={index} style={styles.tableGroup}>
                <View style={styles.tableItem}>
                  <Text style={styles.title}>{waste.name}</Text>
                </View>
                <View style={styles.tableItem}>
                  <Text style={styles.title}>{waste.qty}</Text>
                </View>
                <View style={styles.tableItem}>
                  <Text style={styles.title}>{waste.qty * 20} jc</Text>
                </View>
              </View>
            );
          })}
          <View style={styles.tableFoot}>
            <Text style={styles.footText}>
              Retribución Total{' '}
              <Text style={styles.footTotal}>{this.state.totalWastes} jc</Text>
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
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ActionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(check);
