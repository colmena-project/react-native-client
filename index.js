import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import Firebase from './src/services/firebase';

import Config from 'react-native-config';

import AsyncStorage from '@react-native-community/async-storage';

import Parse from 'parse/react-native';

Firebase.init();

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize(Config.PARSE_CONNECT);

Parse.serverURL = Config.PARSE_URL;

AppRegistry.registerComponent(appName, () => App);
