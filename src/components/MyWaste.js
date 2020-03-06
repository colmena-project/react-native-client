import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  TouchableHighlightBase,
} from 'react-native';

import InputField from './form/InputField';

import {CheckBox, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../styles/colors';
import styles from '../styles/waste';

import InputSpinner from 'react-native-input-spinner';

class MyWaste extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plastic: 0,
      plasticCoin: 0,
      glass: 0,
      glassCoin: 0,
      checked: false,
    };
    this.wasteSubmit = this.wasteSubmit.bind(this);
  }

  wasteSubmit() {
    Alert.alert('Tus residuos fueron registrados!');
  }

  render() {
    return (
      <View style={styles.scrollViewWrapper}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.brand}>
            <Text style={styles.brandText}>Mis residuos</Text>

            {this.state.plastic > 0 || this.state.glass > 0 ? (
              <Button
                title="Generar QR"
                type="outline"
                iconLeft
                icon={
                  <Icon
                    style={{margin: 5}}
                    name="print"
                    size={15}
                    color="black"
                  />
                }
              />
            ) : (
              <Image
                style={styles.colmenaLogo}
                source={require('../../assets/colmena-app-ico.png')}
              />
            )}
          </View>
          <View style={styles.box}>
            <View>
              <Image
                style={styles.boxImage}
                source={require('../../assets/water-bottle-color-icon.png')}
              />
            </View>
            <View>
              <InputSpinner
                max={20}
                min={0}
                step={1}
                colorMax={'#f04048'}
                colorMin={'#b3b3b3'}
                color={colors.colmenaGreen}
                value={this.state.plastic}
                onChange={num => {
                  this.setState({plastic: num, plasticCoin: num * 20});
                  console.log(num);
                }}
              />
            </View>
            <View style={styles.amount}>
              <Text style={styles.amountText}>$ {this.state.plasticCoin}</Text>
            </View>
          </View>

          <View style={styles.box}>
            <View>
              <Image
                style={styles.boxImage}
                source={require('../../assets/glass-bottle-icon.png')}
              />
            </View>
            <View>
              <InputSpinner
                max={30}
                min={0}
                step={1}
                colorMax={'#f04048'}
                colorMin={'#b3b3b3'}
                color={colors.colmenaGreen}
                value={this.state.glass}
                onChange={num => {
                  this.setState({glass: num, glassCoin: num * 30});
                }}
              />
            </View>

            <View style={styles.amount}>
              <Text style={styles.amountText}>$ {this.state.glassCoin}</Text>
            </View>
          </View>

          <CheckBox
            containerStyle={{borderColor: colors.colmenaBackground}}
            title="Visible para recolector"
            checked={this.state.checked}
            onPress={() => this.setState({checked: !this.state.checked})}
            checkedColor={colors.colmenaGreen}
          />
          <View style={{marginTop: 30}}>
            <InputField
              labelText="Dirección para retirar"
              placeholder="Calle 85 y 172b, barrio Acaragua"
              labelTextSize={12}
              labelColor={colors.colmenaLightGrey}
              textColor={colors.colmenaGrey}
              borderBottomColor={colors.colmenaLightGrey}
              borderFocusColor={colors.colmenaGreen}
              inputType="text"
              onChangeText={() => {}}
              customStyle={{marginBottom: 10}}
              showCheckmark={false}
            />
          </View>
          {this.state.plastic > 0 || this.state.glass > 0 ? (
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={this.wasteSubmit}>
              <Text style={styles.submitText}>Solicitar recolector</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btnSubmitDisabled}
              onPress={this.wasteSubmit}
              disabled={true}>
              <Text style={styles.submitText}>Solicitar recolector</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
}
export default MyWaste;
