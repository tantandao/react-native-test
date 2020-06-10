import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import CodePush from 'react-native-code-push';
import {name as appName} from './app.json';
import Service from './Service';
import App from './App';

const codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
    installMode: CodePush.InstallMode.IMMEDIATE
};
const VXRApp = CodePush(codePushOptions)(App);

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => Service);
AppRegistry.registerComponent(appName, () => VXRApp);
