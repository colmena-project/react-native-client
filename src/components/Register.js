import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  keyboardType,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Alert,
  AsyncStorage,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../redux/actions';

import NavBarButton from './buttons/NavBarButton';

import Icon from 'react-native-vector-icons/FontAwesome';

import Parse from 'parse/react-native';

import Config from '../config';

import InputField from './form/InputField';

import colors from '../styles/colors';
import styles from '../styles/login';

import {PropTypes} from 'prop-types';

import emailCheck from '../utils/email';

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize(Config.parseConnect);

Parse.serverURL = Config.parseUrl;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: true,
      fullname: '',
      validFullname: false,
      email: '',
      validEmail: false,
      password: '',
      validPassword: false,
      repeatPassword: '',
      validRepeatPassword: false,
      loadingVisible: false,
    };

    this.handleFullnameChange = this.handleFullnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(
      this,
    );
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  */

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

  handleFullnameChange(fullname) {
    this.setState({fullname});
    if (fullname.length > 6) {
      this.setState({validFullname: true});
    } else if (fullname <= 6) {
      this.setState({validFullname: false});
    }
  }

  handleEmailChange(email) {
    const {validEmail} = this.state;
    this.setState({email: email});
    if (!validEmail) {
      if (emailCheck(email)) {
        this.setState({validEmail: true});
      }
    } else if (!emailCheck(email)) {
      this.setState({validEmail: false});
    }
  }

  handlePasswordChange(password) {
    const {validPassword} = this.state;
    this.setState({password});
    if (password.length > 4) {
      this.setState({validPassword: true});
    } else if (password <= 4) {
      this.setState({validPassword: false});
    }
  }

  handleRepeatPasswordChange(repeatPassword) {
    this.setState({repeatPassword});
    if (repeatPassword.length > 4 && repeatPassword == this.state.password) {
      this.setState({validRepeatPassword: true});
    } else {
      this.setState({validRepeatPassword: false});
    }
  }

  async createUser(userData) {
    Parse.User.currentAsync().then(async user => {
      Parse.User.logOut();
      const newUser = new Parse.User(userData);
      try {
        await newUser.signUp();
        await Parse.Cloud.run('createAccount', {
          firstName: userData.name,
          lastName: userData.name,
        });
        Alert.alert('Se creo la cuenta!');
      } catch (error) {
        // Show the error message somewhere and let the user try again.
        Alert.alert('Error: ' + error.code + ' ' + error.message);
      }
    });
  }

  handleSubmit() {
    const {
      validFullname,
      validEmail,
      validPassword,
      validRepeatPassword,
      fullname,
      email,
      password,
    } = this.state;
    if (validFullname && validEmail && validPassword && validRepeatPassword) {
      this.createUser({
        username: email,
        email: email,
        password: password,
        name: fullname,
      });
    } else {
      Alert.alert('Error! falta completar datos..');
    }
  }

  render() {
    const {
      formValid,
      loadingVisible,
      validFullname,
      validEmail,
      validPassword,
      validRepeatPassword,
    } = this.state;

    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.brand}>
              <Text style={styles.brandText}>Registrarse</Text>
              <Image
                style={styles.colmenaLogo}
                source={require('../../assets/colmena-app-ico.png')}
              />
            </View>

            <InputField
              labelText="Nombre completo"
              labelTextSize={14}
              labelColor={colors.colmenaLightGrey}
              textColor={colors.colmenaGrey}
              borderBottomColor={colors.colmenaLightGrey}
              borderFocusColor={colors.colmenaGreen}
              inputType="text"
              customStyle={{marginBottom: 30}}
              onChangeText={this.handleFullnameChange}
              showCheckmark={validFullname}
              autoFocus
            />

            <InputField
              labelText="E-mail"
              labelTextSize={14}
              labelColor={colors.colmenaLightGrey}
              textColor={colors.colmenaGrey}
              borderBottomColor={colors.colmenaLightGrey}
              borderFocusColor={colors.colmenaGreen}
              inputType="email"
              customStyle={{marginBottom: 30}}
              onChangeText={this.handleEmailChange}
              showCheckmark={validEmail}
            />

            <InputField
              labelText="Contraseña"
              labelTextSize={14}
              labelColor={colors.colmenaLightGrey}
              textColor={colors.colmenaGrey}
              borderBottomColor={colors.colmenaLightGrey}
              borderFocusColor={colors.colmenaGreen}
              inputType="password"
              customStyle={{marginBottom: 30}}
              onChangeText={this.handlePasswordChange}
              showCheckmark={validPassword}
            />

            <InputField
              labelText="Repetir Contraseña"
              labelTextSize={14}
              labelColor={colors.colmenaLightGrey}
              textColor={colors.colmenaGrey}
              borderBottomColor={colors.colmenaLightGrey}
              borderFocusColor={colors.colmenaGreen}
              inputType="repeatPassword"
              customStyle={{marginBottom: 30}}
              onChangeText={this.handleRepeatPasswordChange}
              showCheckmark={validRepeatPassword}
            />

            {validFullname &&
            validEmail &&
            validPassword &&
            validRepeatPassword ? (
              <TouchableOpacity
                style={styles.btnSubmit}
                onPress={this.handleSubmit}
                disabled={false}>
                <Text style={styles.submitText}>Crear cuenta</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btnSubmitDisabled}
                onPress={this.handleSubmit}
                disabled={true}>
                <Text style={styles.submitText}>Crear cuenta</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
/*
const mapStateToProps = state => ({
  loggedInStatus: state.loggedInStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

Login.propTypes = {
  Login: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
*/
export default Register;
