import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

class MyColmena extends Component {
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Mi Colmena esta vacia, a recolectar!</Text>

        <Button
          title="Ir a Mi Billetera"
          onPress={() => navigate('MyWallet')}
        />
        <Button
          title="Ir a Mi Billetera"
          onPress={() => navigate('MyWallet')}
        />
      </View>
    )
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
    width: 50,
    height: 200,
    resizeMode: 'stretch'
  }
})

export default MyColmena