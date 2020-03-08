import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

import colors from '../styles/colors';

class MiColmenaContainer extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {data} = this.props;
    return (
      <View style={styles.wrapper}>
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.heading}>Comunidad Colmena</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollview: {
    paddingTop: 100,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  categories: {
    marginBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.gray04,
  },
});

export default MiColmenaContainer;
