import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import ColmenaIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 's1',
    text: 'Recolecta tus residuos, pet, vidrios, etc',
    title: 'Reciclá',
    image: require('../../assets/1.png'),
    backgroundColor: '#FFF'
  },

  {
    key: 's2',
    title: 'Transporta',
    text: 'Transporta los residuos para ser recompenzado ($)',
    image: require('../../assets/2.png'),
    backgroundColor: '#FFF'
  },

  {
    key: 's3',
    title: 'Transformá',
    text: 'Transformá los residuos en productos',
    image: require('../../assets/3.png'),
    backgroundColor: '#FFF'
  },
];

class Intro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showIntro: true
    }

  }

  _onDone = () => {
    this.setState({ showIntro: false });
    return this.props.navigation.navigate('Login');
  };

  _onSkip = () => {
    this.setState({ showIntro: true });
  };

  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  render() {
    if(this.state.showIntro){
      return (

          <ColmenaIntroSlider
            slides={slides}
            renderItem={this._renderItem}
            onDone={this._onDone}
            showSkipButton={true}
            onSkip={this._onSkip}
            bottomButton
            nextLabel="Continuar" 
            prevLabel="Volver"
            skipLabel="Saltar" 
            doneLabel="Terminar"
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
          />

      )
    } else{
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  stretch: {
    width: 300,
    height: 300,
    resizeMode: 'stretch'
  },
  image: {
    width: 320,
    height: 320,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    color: '#5f6368',
    textAlign: 'center',
    paddingVertical: 30,
    fontFamily: "Montserrat-Medium"
  },
  
  title: {
    fontSize: 22,
    color: '#5f6368',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: "Montserrat-Medium"
  },
  dot:{
    backgroundColor: '#ccc'
  },
  activeDot:{
    backgroundColor: 'black'
  },

})

export default Intro