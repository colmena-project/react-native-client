import React, {Component} from 'react';

import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import colors from '../../styles/colors';

import AsyncStorage from '@react-native-community/async-storage';

export default class WasteCheck extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  async initData() {
    const localWaste = await AsyncStorage.getItem(
      `containers_${this.props.waste.objectId}`,
    );
    if (localWaste) {
      this.setState({active: true});
      this.props.action(this.props.waste.objectId, this.props.waste.code, true);
    }
  }

  componentDidMount() {
    this.initData();
  }

  handleAction(){
    this.setState({active: !this.state.active});
    this.props.action(this.props.waste.objectId, this.props.waste.code, !this.state.active);
  }

  render() {
    //let img = Object.values(this.props.waste.type.get('iconFile'))[3];
    if(this.props.waste.status !== 'RECOVERED'){
      return (
          <View key={this.props.waste.objectId} style={styles.boxDisabled}>
            <View style={styles.boxImage}>
              {/* <Image style={styles.boxImage} source={{ uri: img }} /> */}
            </View>
            <View style={styles.boxCode}>
              <Text style={styles.text}>
              {this.props.waste.code} ({this.props.waste.status})
              </Text>
            </View>
          </View>
        );
    }else{
      return (
        <TouchableOpacity onPress={()=>{this.handleAction()}}>
          <View key={this.props.waste.objectId} style={this.state.active ? styles.boxActive : styles.box}>
            <View style={styles.boxImage}>
              {/* <Image style={styles.image} source={{ uri: img }} />*/}
            </View>
            <View style={styles.boxCode}>
              <Text style={this.state.active ? styles.textActive : styles.text}>
              {this.props.waste.code}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
    box: {
      width: '90%',
      flex: 1, 
      flexDirection: 'row',
      alignSelf: 'center',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 10,
    },
    boxActive: {
      width: '90%',
      flex: 1, 
      flexDirection: 'row',
      alignSelf: 'center',
      borderColor: '#000',
      borderColor: colors.colmenaBackground,
      backgroundColor: colors.colmenaOtherGreen,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 10,
    },
    boxDisabled: {
      padding: 15,
      borderColor: '#bbb',
      borderWidth: 1,
      borderRadius: 10,
      color: colors.colmenaGrey02, 
      backgroundColor: colors.colmenaGreyDisabled,
      textAlign: 'center'
    },
    boxCode:{
      width: '70%',
      height: 60,
      justifyContent: 'center', 
      alignItems: 'center',
    },
    boxImage:{
      width: 60,
      height: 60,
      justifyContent: 'center', 
      alignItems: 'center',
    },
    image:{
      width: 60,
      height: 60,
      resizeMode: 'contain',
      padding: 5,
      backgroundColor: 'blue'
    },
    text: {
      textAlign: 'center',
      color: colors.black,
    },
    textActive: {
      textAlign: 'center',
      color: colors.white,
    }
});