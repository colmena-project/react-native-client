import { Platform } from 'react-native';
import Parse from 'parse/react-native';

export const setInstallation = async (password) => {
    try {
        const installationId = await Parse._getInstallationId();
        const deviceType = Platform.OS == 'android' ? 'android' : 'ios';
        const pushType = Platform.OS == 'android' ? 'fcm' : '';
        const localeIdentifier = 'es-AR';
        const newInstallation = new Parse.Installation();
        newInstallation.set('deviceType', deviceType);
        newInstallation.set('installationId', installationId);
        newInstallation.set('channels', ["All"]);
        newInstallation.set('pushType', pushType);
        newInstallation.set('timeZone', 'America/Argentina/Buenos_Aires');
        newInstallation.set('appName', 'Colmena');
        newInstallation.set('appIdentifier', 'com.colmena.colmenapp');
        newInstallation.set('localeIdentifier', localeIdentifier);
        await newInstallation.save();
    } catch (err) {
        console.log('Error!! ' + err);
    }
};

export default {
    setInstallation,
};