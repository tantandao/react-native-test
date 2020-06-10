import {Alert, Linking} from 'react-native';
import {strings} from '../controls/i18n';

export default class VXRHandler {

    static openUrl(url) {
        Linking.canOpenURL(url).then((supported) => {
            if (!supported) {
                Alert.alert(strings('title_alert_open_url'), strings('message_alert_open_url'));
            }
            return Linking.openURL(url);
        }).catch((error) => console.error('An error occurred', error));
    }
}
