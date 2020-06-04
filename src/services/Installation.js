import { Platform, AsyncStorage } from 'react-native';
import Parse from 'parse/react-native';

const getToken = async () => {
    const FCMToken = await AsyncStorage.getItem('FCMToken');
    if (!FCMToken) throw new Error('No tiene token.');

    return FCMToken;
};

export const setInstallation = async (password) => {
    try {
        const FCMToken = await getToken();
        const installationId = await Parse._getInstallationId();
        const deviceType = Platform.OS == 'android' ? 'android' : 'ios';
        const pushType = Platform.OS == 'android' ? 'gcm' : '';
        const localeIdentifier = 'es-AR';
        const newInstallation = new Parse.Installation();
        newInstallation.set('deviceType', deviceType);
        newInstallation.set('installationId', installationId);
        newInstallation.set('channels', ["All"]);
        newInstallation.set('pushType', pushType);
        newInstallation.set('timeZone', 'America/Argentina/Buenos_Aires');
        newInstallation.set('appName', 'ColmenaApp');
        newInstallation.set('appIdentifier', 'com.colmena.colmenapp');
        newInstallation.set('deviceToken', FCMToken);
        newInstallation.set('localeIdentifier', localeIdentifier);
        await newInstallation.save();

    } catch (err) {
        console.log('Error!! ' + err);
    }
};

export default {
    setInstallation,
};