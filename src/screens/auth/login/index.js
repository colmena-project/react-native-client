import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SocialIcon } from 'react-native-elements';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../../redux/actions';

import { PropTypes } from 'prop-types';

import colors from '../../../styles/colors';
import styles from '../../../styles/login';

import InputField from '../../../components/form/InputField';
import Loader from '../../../components/Loader';
import emailCheck from '../../../utils/email';

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

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  handleEmailChange(email) {
    const { validEmail } = this.state;
    this.setState({ email: email });

    if (!validEmail) {
      if (emailCheck(email)) {
        this.setState({ validEmail: true });
      }
    } else if (!emailCheck(email)) {
      this.setState({ validEmail: false });
    }
  }

  handlePasswordChange(password) {
    const { validPassword } = this.state;

    this.setState({ password });

    if (!validPassword) {
      if (password.length > 4) {
        this.setState({ validPassword: true });
      }
    } else if (password <= 4) {
      this.setState({ validPassword: false });
    }
  }

  async loginColmena() {
    this.setState({ loadingVisible: true });
    const { login, navigation } = this.props;
    const { navigate } = navigation;
    const { email, password } = this.state;
    const isLoginOk = await login(email, password);

    if (isLoginOk) {
      this.setState({ formValid: true, loadingVisible: false });
      navigate('MyWaste');
    } else {
      this.setState({ formValid: false, loadingVisible: false });
      Alert.alert('error.. usuario o pass incorrecto');
    }
  }
  async loginFacebook() {
    const { loginFb, navigation } = this.props;
    const { navigate } = navigation;
    const isLoginFbOk = await loginFb();
    if (isLoginFbOk) {
      this.setState({ formValid: true, loadingVisible: false });
      navigate('Profile');
    } else {
      this.setState({ formValid: false, loadingVisible: false });
    }
  }

  render() {
    const { formValid, loadingVisible, validEmail, validPassword } = this.state;

    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <Loader modalVisible={loadingVisible} animationType="fade" />

        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.brand}>
              <Text style={styles.brandText}>Ingreso</Text>
              <Image
                style={styles.colmenaLogo}
                source={require('../../../../assets/colmena-app-ico.png')}
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
              customStyle={{ marginBottom: 30 }}
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
              customStyle={{ marginBottom: 20 }}
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
