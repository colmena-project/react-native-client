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

import Loader from './Loader';

/*
import {
  LoginManager,
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
*/

import {SocialIcon} from 'react-native-elements';

import InputField from './form/InputField';

import colors from '../styles/colors';
import styles from '../styles/login';

import {PropTypes} from 'prop-types';

import emailCheck from '../utils/email';

import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize('F930d5lx5zXy8LNH1CpLa6AaLfMMFfZY');

Parse.serverURL = 'http://vps262678.vps.ovh.ca/parse/';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: true,
      validEmail: false,
      email: '',
      password: '',
      validPassword: false,
      loadingVisible: false,
    };

    this.loginColmena = this.loginColmena.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    header: null,
  });

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

    if (!validPassword) {
      if (password.length > 4) {
        this.setState({validPassword: true});
      }
    } else if (password <= 4) {
      this.setState({validPassword: false});
    }
  }

  async loginColmena() {
    this.setState({loadingVisible: true});
    const {login, navigation} = this.props;
    const {navigate} = navigation;
    const {email, password} = this.state;
    const isLoginOk = await login(email, password);

    if (isLoginOk) {
      this.setState({formValid: true, loadingVisible: false});
      navigate('MyWaste');
    } else {
      this.setState({formValid: false, loadingVisible: false});
      Alert.alert('error.. usuario o pass incorrecto');
    }
  }
  async loginFacebook() {
    const {loginFb, navigation} = this.props;
    const {navigate} = navigation;
    const isLoginFbOk = await loginFb();
    if (isLoginFbOk) {
      this.setState({formValid: true, loadingVisible: false});
      navigate('Profile');
    } else {
      this.setState({formValid: false, loadingVisible: false});
      Alert.alert('error.. usuario o pass incorrecto');
    }
  }

  /*
  async loginFacebook() {
    const {navigation} = this.props;
    const {navigate} = navigation;

    try {
      Parse.User.enableUnsafeCurrentUser();
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw new Error('Solicitud cancelada por el usuario');
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error(
          'Se produjo un error al obtener el token de acceso del usuario.',
        );
      }

      try {
        const graphRequest = new GraphRequest(
          '/me',
          {
            accessToken: data.accessToken,
            parameters: {
              fields: {
                string:
                  'first_name, middle_name, last_name, name, short_name, email, picture.type(large)',
              },
            },
          },
          (error, r) => {
            if (error) {
              Alert.alert(error);
            } else {
              Parse.User.currentAsync().then(async user => {
                console.log(user);
                user = await Parse.User.logInWith('facebook', {
                  authData: {
                    id: data.userID,
                    access_token: data.accessToken,
                    expiration_date: data.expirationTime,
                  },
                });

                const account = await Parse.Cloud.run('getMyAccount');
                if (!account) {
                  await Parse.Cloud.run('createAccount', {
                    firstName: r.first_name,
                    middleName: r.middle_name,
                    lastName: r.last_name,
                    nickname: r.short_name,
                    facebookProfilePhotoUrl: r.picture.data.url,
                  });
                  navigate('Profile');
                } else {
                  if (!account.account.get('firstName')) {
                    account.set('firstName', r.first_name);
                  }
                  if (!account.account.get('middleName')) {
                    account.account.set('middleName', r.middle_name);
                  }
                  if (!account.account.get('lastName')) {
                    account.account.set('lastName', r.last_name);
                  }
                  if (!account.account.get('nickname')) {
                    account.account.set('nickname', r.short_name);
                  }
                  account.account.set(
                    'facebookProfilePhotoUrl',
                    r.picture.data.url,
                  );
                  await account.account.save();
                  return navigate('Profile');
                }
              });
            }
          },
        );
        new GraphRequestManager().addRequest(graphRequest).start();
      } catch (error) {
        console.error(error);
      }
    } catch (e) {
      console.error(e);
    }
  }
*/
  render() {
    const {formValid, loadingVisible, validEmail, validPassword} = this.state;

    const {navigation} = this.props;
    const {navigate} = navigation;

    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <Loader modalVisible={loadingVisible} animationType="fade" />

        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.brand}>
              <Text style={styles.brandText}>Ingreso</Text>
              <Image
                style={styles.colmenaLogo}
                source={require('../../assets/colmena-app-ico.png')}
              />
            </View>
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
              autoFocus
            />
            <InputField
              labelText="Contraseña"
              labelTextSize={14}
              labelColor={colors.colmenaLightGrey}
              textColor={colors.colmenaGrey}
              borderBottomColor={colors.colmenaLightGrey}
              borderFocusColor={colors.colmenaGreen}
              inputType="password"
              customStyle={{marginBottom: 20}}
              onChangeText={this.handlePasswordChange}
              showCheckmark={false}
            />

            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={this.loginColmena}>
              <Text style={styles.submitText}>Ingresar</Text>
            </TouchableOpacity>
            <View style={styles.wrapperCenter}>
              <TouchableOpacity>
                <Text style={styles.forgot}>Olvide mi contraseña</Text>
              </TouchableOpacity>

              <Text style={styles.text}>Si no tenes cuenta</Text>

              <TouchableOpacity
                style={styles.btnRegistrarse}
                onPress={() => {
                  navigate('Register');
                }}>
                <Text style={styles.RegistrarseText}>Registrate ahora</Text>
              </TouchableOpacity>
              <Text> ó </Text>

              <SocialIcon
                title="Ingresar con facebook"
                button
                type="facebook"
                onPress={this.loginFacebook}
                style={styles.btnFacebook}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  loggedInStatus: state.loggedInStatus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ActionCreators, dispatch);

Login.propTypes = {
  login: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
