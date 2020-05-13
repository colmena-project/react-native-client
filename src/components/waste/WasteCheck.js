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
    this.handleChange = this.handleChange.bind(this);
    this.initData = this.initData.bind(this);
  }

  async initData() {
    const localWaste = await AsyncStorage.getItem(
      `containers_${this.props.waste.objectId}`,
    );
    if (localWaste) {
      this.setState({active: true});
    }
  }

  componentDidMount() {
    this.initData();
  }

  handleChange(wasteID, code, check) {
    this.setState({active: check });
    if (!check) {
      AsyncStorage.removeItem('containers_' + wasteID);
    } else {
      AsyncStorage.setItem(
        'containers_' + wasteID,
        JSON.stringify({id: wasteID, code: code}),
      );
    }
  }

  render() {
    return (
    <TouchableOpacity onPress={()=> this.handleChange(this.props.waste.objectId, this.props.waste.code, !this.state.active)}>
      <View key={this.props.waste.objectId} style={{ width: '90%', alignSelf: 'center' }}>
        <Image style={styles.boxImage} source={this.state.img} />
        <Text style={this.state.active ? styles.active: styles.item}>
        {this.props.waste.code}
        </Text>
      </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    boxImage:{
      padding: 10,
    },
    item: {
        padding: 15,
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 10,
    },
    active: {
        padding: 15,
        borderColor: colors.colmenaBackground,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: colors.colmenaGreen,
        color: 'white'
    }
});