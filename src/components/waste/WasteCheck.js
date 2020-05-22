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
    let img = Object.values(this.props.waste.type.get('iconFile'))[3];
    if(this.props.waste.status !== 'RECOVERED'){
      let stateDesc = '';
      if(this.props.waste.status === 'IN_TRANSIT')
        stateDesc = 'En transito...';
      else
        stateDesc = this.props.waste.status;
      return (
          <View key={this.props.waste.id} style={styles.boxDisabled}>
            <View style={styles.boxImage}>
              <Image style={styles.image} source={{ uri: img }} />
            </View>
            <View style={styles.boxCode}>
              <Text style={styles.textDisabled}>
              {this.props.waste.code} ({stateDesc})
              </Text>
            </View>
          </View>
        );
    }else{
      return (
        <TouchableOpacity onPress={()=>{this.handleAction()}}>
          <View key={this.props.waste.id} style={this.state.active ? styles.boxActive : styles.box}>
            <View style={styles.boxImage}>
              <Image style={styles.image} source={{ uri: img }} />
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
      borderColor: colors.colmenaLightGrey,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 10,
    },
    boxActive: {
      width: '90%',
      flex: 1, 
      flexDirection: 'row',
      alignSelf: 'center',
      borderColor: colors.white,
      backgroundColor: colors.colmenaGreenActive,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 10,
    },
    boxDisabled: {
      width: '90%',
      flex: 1, 
      flexDirection: 'row',
      alignSelf: 'center',
      borderColor: '#bbb',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 10,
      color: colors.colmenaGrey02, 
      backgroundColor: colors.colmenaGreyDisabled,
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
      width: 40,
      height: 40,
      resizeMode: 'contain',
      padding: 10,
    },
    text: {
      textAlign: 'center',
      color: colors.black,
    },
    textActive: {
      textAlign: 'center',
      color: colors.white,
      fontWeight: 'bold'
    },
    textDisabled: {
      textAlign: 'center',
      color: colors.colmenaLightGrey,
    },
});