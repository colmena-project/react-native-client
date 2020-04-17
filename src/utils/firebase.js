import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

async function registerAppWithFCM() {
  await messaging().registerDeviceForRemoteMessages();
}

async function requestPermission() {
  const granted = messaging().requestPermission();

  if (granted) {
    console.log('User permission ok :)');
  } else {
    console.log('User declined messaging permissions :(');
  }
}

async function init() {
  await registerAppWithFCM();
  await requestPermission();
  const token = await messaging().getToken();
  
  await AsyncStorage.setItem('FCMToken', token);

  messaging().onMessage(async remoteMessage => {
    console.log('FCM Message Data:', remoteMessage.data);
    const {ticker = 'no ticker', title, message} = remoteMessage.data;
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    const {ticker, title, message} = remoteMessage.data;
  });
}

export default {
  init,
};