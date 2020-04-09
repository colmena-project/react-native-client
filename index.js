import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Firebase from './src/utils/firebase';

Firebase.init();

AppRegistry.registerComponent(appName, () => App);
