import React, {Component} from 'react';
import {
    Alert,
    AppState,
    View,
    StatusBar,
} from 'react-native';
import {RootStack} from './Router';
import {createAppContainer} from 'react-navigation';
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';
import I18n from 'react-native-i18n';
import {strings} from './app/controls/i18n';
import colors from './app/configs/colors';

const AppContainer = createAppContainer(RootStack);

const errorHandler = (e, isFatal) => {
    if (isFatal) {
        Alert.alert('Unexpected error occurred',
            `Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message} We have reported this to our team ! Please close the app and start again!`,
            [{text: 'Close'}]
        );
    } else {
        console.log(e);
    }
};

setJSExceptionHandler(errorHandler, true);

setNativeExceptionHandler((errorString) => {
    console.log(errorString);
});

console.disableYellowBox = true;
if (!__DEV__) {
    console.log = () => {};
}

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
            locale: I18n.locale,
        };
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = (state) => {
        this.setState({appState: state});
    };

    t = (name, params) => {
        return strings(name, params);
    };

    setLocale = (locale) => {
        this.setState({locale});
    };

    render() {
        const {locale} = this.state;
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle={'light-content'} backgroundColor={colors.statusBarColor}/>
                <AppContainer
                    theme={'light'}
                    screenProps={{
                        t: this.t,
                        locale: locale,
                        setLocale: this.setLocale,
                    }}
                />
            </View>
        );
    }
}
