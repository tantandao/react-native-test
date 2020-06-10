import AsyncStorage from '@react-native-community/async-storage';
import RootNavigation from '../screens/RootNavigation';

export default class VXRHelper {

    static resetApplication() {
        setTimeout(async () => {
            await AsyncStorage.clear();
            RootNavigation.navigate('Auth');
        }, 100);
    }
}
