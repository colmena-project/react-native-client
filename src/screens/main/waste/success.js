import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {List} from 'react-native-paper';

import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../../redux/actions';

import styles from '../../../styles/waste';

class success extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      lastRecover: null,
    };

    this.wastePrint = this.wastePrint.bind(this);
    this.wasteSubmit = this.wasteSubmit.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    header: null,
  });

  wastePrint() {
    console.log('imprimiendo...');
  }

  async checkInfoSubmit() {
    this.props.navigation.navigate('Waste');
  }

  wasteSubmit() {
    this.props.navigation.navigate('Transport');
  }

  recoverData = async () => {
    const recovery = await AsyncStorage.getItem('lastRecover');
    this.setState({lastRecover: JSON.parse(recovery)});
  };

  componentDidMount() {
    this.recoverData();
  }

  containersList() {
    const {lastRecover} = this.state;

    const wasteTypes = lastRecover.details
      .map(detail => detail.container.type)
      .reduce((a, r) => {
        if (a[r.name]) {
          a[r.name] = {
            cantidad: (a[r.name].cantidad || 0) + 1,
            container: r.container,
            icon: r.iconFile.url,
          };
        } else {
          a[r.name] = {
            cantidad: (a[r.name] || 0) + 1,
            container: r.container,
            icon: r.iconFile.url,
          };
        }
        return a;
      }, {});

    return Object.entries(wasteTypes).map((waste, index) => {
      let icon = waste[1].icon;
      return (
        <View key={`wastes_${index}`} style={styles.boxLine}>
          <Text style={styles.titleLine}>
            {waste[0]} ({waste[1].cantidad}) {waste[1].container}
          </Text>
          {lastRecover.details
            .filter(detail => detail.container.type.name === waste[0])
            .map((item, i) => {
              return (
                <Text key={`code_${i}`} style={styles.textLine}>
                  {item.container.code}
                </Text>
              );
            })}
        </View>
      );
    });
  }

  render() {
    return (
      <View style={styles.scrollViewWrapper}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerMsg}>
            <Image
              style={styles.colmenaLogo}
              source={require('../../../../assets/icons/png/icon-registrar-ok.png')}
            />
            <Text style={styles.headerTitle}>
              Residuos registrados correctamente!
            </Text>
          </View>
          <View>
            <Text style={styles.headerSubtitle}>
              Los códigos a continuación son indispensables para registrar sus
              residuos, imprima o cópielos para pegar en sus bolsas o botellas
            </Text>
          </View>
          <View style={styles.groupLine}>
            {this.state.lastRecover ? (
              this.containersList()
            ) : (
              <Text style={styles.text}>Cargando contenedores...</Text>
            )}
          </View>
          <View>
            <List.Item
              title="Usuario"
              description="Dirección."
              left={props => <List.Icon icon="map-marker-outline" />}
            />
          </View>

          <View style={{marginTop: 5}}>
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={this.wasteSubmit}>
              <Text style={styles.submitText}>FINALIZAR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
)(success);
