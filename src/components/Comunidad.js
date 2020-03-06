import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';

class Comunidad extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Que sucede en mi barrio...</Text>

        <Button title="Ir a Mi Colmena" onPress={() => navigate('MyColmena')} />
        <Button
          title="Ir a Mi Billetera"
          onPress={() => navigate('MyWallet')}
        />
      </View>
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
});

export default Comunidad;
