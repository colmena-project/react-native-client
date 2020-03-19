import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  Image,
} from 'react-native';

import {Input} from 'react-native-elements';

import emailCheck from '../../../utils/email';

import InputField from '../../../components/form/InputField';

import {Avatar} from 'react-native-elements';

import Loader from '../../../components/Loader';

import colors from '../../../styles/colors';

import styles from '../../../styles/login';

import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize('F930d5lx5zXy8LNH1CpLa6AaLfMMFfZY');

Parse.serverURL = 'http://vps262678.vps.ovh.ca/parse/';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValid: true,
      nickname: '',
      firstName: '',
      lastName: '',
      picture: null,
      validFirstName: false,
      validLastName: false,
      email: '',
      validEmail: false,
      loadingVisible: false,
    };
  }

  async getAccountData() {
    const Account = await Parse.Cloud.run('getMyAccount');

    this.setState({
      nickname: Account.account.get('nickname'),
      firstName: Account.account.get('firstName'),
      middleName: Account.account.get('middleName'),
      lastName: Account.account.get('lastName'),
      picture: Account.account.get('facebookProfilePhotoUrl'),
    });
    console.log(this.state);
  }

  componentDidMount() {
    this.getAccountData();
  }

  render() {
    const {
      formValid,
      validPicture,
      validFirstName,
      validLastName,
      validEmail,
      nickname,
      firstName,
      middleName,
      lastName,
      picture,
      loadingVisible,
    } = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.scrollViewWrapper}>
          <Loader modalVisible={loadingVisible} animationType="fade" />
          <ScrollView style={styles.scrollView}>
            <View style={styles.brand}>
              <Text style={styles.brandText}>Mi Perfil</Text>
              <Image
                style={styles.colmenaLogo}
                source={require('../../../../assets/colmena-app-ico.png')}
              />
            </View>
            {picture ? (
              <Avatar
                size={120}
                source={{uri: picture}}
                rounded
                showEditButton
              />
            ) : (
              <Avatar
                size={120}
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                onPress={() => console.log('Subir foto...')}
                activeOpacity={0.7}
                containerStyle={{
                  flex: 2,
                  marginLeft: 20,
                  marginTop: 0,
                  marginBottom: 10,
                }}
                showEditButton
              />
            )}
            <Input defaultValue={`@${nickname}`} />

            <Input
              label="Nombre(s)"
              defaultValue={`${firstName} ${middleName}`}
            />
            <Input label="Apellido(s)" defaultValue={lastName} />
            {/*
            <InputField
              labelText="Nombre(s)"
              labelTextSize={14}
              labelColor={colors.colmenaLightGrey}
              textColor={colors.colmenaGrey}
              borderBottomColor={colors.colmenaLightGrey}
              borderFocusColor={colors.colmenaGreen}
              inputType="text"
              customStyle={{marginBottom: 30}}
              inputValue={firstName}
              autoFocus
            />

            <InputField
              labelText="Apellido(s)"
              labelTextSize={14}
              labelColor={colors.colmenaLightGrey}
              textColor={colors.colmenaGrey}
              borderBottomColor={colors.colmenaLightGrey}
              borderFocusColor={colors.colmenaGreen}
              inputType="text"
              customStyle={{marginBottom: 30}}
              inputValue={lastName}
              autoFocus
            />
            */}
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default Profile;
