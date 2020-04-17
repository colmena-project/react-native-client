import React, {Component} from 'react';

import {View, Text, Image} from 'react-native';

import InputSpinner from 'react-native-input-spinner';

import colors from '../../styles/colors';
import styles from '../../styles/waste';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../redux/actions';

import AsyncStorage from '@react-native-community/async-storage';

class WasteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.initData = this.initData.bind(this);
  }

  async initData() {
    const localWaste = await AsyncStorage.getItem(
      `wastes_${this.props.waste.id}`,
    );
    if (localWaste) {
      this.setState({qty: JSON.parse(localWaste).qty});
    }
  }

  componentDidMount() {
    this.initData();
  }

  handleChange(wasteID, name, qty) {
    this.setState({qty: qty});
    if (qty === 0) {
      AsyncStorage.removeItem('wastes_' + wasteID);
    } else {
      AsyncStorage.setItem(
        'wastes_' + wasteID,
        JSON.stringify({id: wasteID, name: name, qty: qty}),
      );
    }
  }

  render() {
    let img = Object.values(this.props.waste.get('iconFile'))[3];
    return (
      <View key={this.props.waste.id} style={styles.box}>
        <View style={styles.tableItem}>

          <Image
            style={styles.boxImage}
            source={{uri: img}}
          />

          <Text style={{textAlign: 'center'}}>
            {this.props.waste.get('name')}
          </Text>
        </View>
        <View style={styles.tableItem}>
          <InputSpinner
            max={this.props.max}
            min={this.props.min}
            step={1}
            colorMax={'#f04048'}
            colorMin={'#b3b3b3'}
            color={colors.colmenaGreen}
            value={this.state.qty}
            onChange={num => {
              this.handleChange(
                this.props.waste.id,
                this.props.waste.get('name'),
                num,
              );
            }}
          />
          <Text style={styles.tableItem}>
            {this.state.qty > 1
              ? this.props.waste.get('containerPlural')
              : this.props.waste.get('container')}
          </Text>
        </View>
        <View style={styles.amount}>
          <Text style={styles.amountText}>{this.state.qty * 20} jc</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ActionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WasteBox);
