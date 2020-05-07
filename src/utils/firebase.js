import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';

async function registerAppWithFCM() {
  await messaging().registerDeviceForRemoteMessages();
}

async function requestPermission() {
  const granted = messaging().requestPermission();
  if (granted) {
    console.log('User permission ok');
  } else {
    console.log('User declined messaging permissions');
  }
}

const pushNotification = data => {
  try {
    const formattedData = JSON.parse(data);
    const { title = "ColmenaApp", message = "Mensaje", subText = "Notificación", bigText = "Seguí reciclando con Colmena!" } = formattedData;

    PushNotification.localNotification({
      ticker: "My Notification Ticker", // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_launcher", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      title: title, // (optional)
      message: message, // (required)
      subText: subText, // (optional) default: none
      bigText: bigText, // (optional) default: "message" prop
      color: "green", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: "some_tag", // (optional) add tag to message
      group: "group", // (optional) add group to message
      ongoing: true, // (optional) set whether this is an "ongoing" notification
      priority: "high", // (optional) set notification priority, default: high
      visibility: "public", // (optional) set notification visibility, default: private
      importance: "high", // (optional) set notification importance, default: high
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)

      /* iOS and Android properties */
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 5, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
      actions: '["Gracias!"]', // (Android only) See the doc for notification actions to know more
    });
  } catch (ex) {
    console.log(ex);
  };
};

async function init() {
  await registerAppWithFCM();
  await requestPermission();
  const token = await messaging().getToken();
  await AsyncStorage.setItem('FCMToken', token);

  messaging().onMessage(async remoteMessage => {
    const { data } = remoteMessage.data;
    console.log('MessageHandler', data);
    pushNotification(data);

  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    const { data } = remoteMessage.data;
    pushNotification(data);
  });
}

export default {
  init,
};