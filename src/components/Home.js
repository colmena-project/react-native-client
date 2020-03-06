import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  SafeAreaView,
} from 'react-native';
import Intro from './Intro';

function Separator() {
  return <View style={styles.separator} />;
}

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const {navigate} = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.contenedorLogo}>
            <Image
              style={styles.logo}
              source={require('../../assets/colmena-app-logo-intro.png')}
            />
          </View>

          <Separator />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stretch: {
    width: 300,
    height: 300,
    resizeMode: 'stretch',
  },
  contenedorLogo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: 200,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

/*
const TabNavigator = createBottomTabNavigator({
  MyColmena: MyColmena,
  MyWallet: MyWallet
});
*/

// createAppContainer(TabNavigator);
export default Home;
