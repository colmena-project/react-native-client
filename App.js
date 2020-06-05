import React, { Component } from 'react';
import { StatusBar, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import RootNavigator from './src/navigators/AppNavigator';
import store from './src/redux/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" backgroundColor="#54CD98" />
        <RootNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('colmenapp', () => App);

export default App;
