import React from 'react';
import {
    BackHandler,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {WebView} from 'react-native-webview';
import RootNavigation from './RootNavigation';
import VXRView from '../components/VXRView';
import {HeaderBackButton} from 'react-navigation-stack';
import * as Progress from 'react-native-progress';
import {strings} from '../controls/i18n';
import colors from '../configs/colors';

import Base from './Base';

const widthScreen = Dimensions.get('window').width;

export default class Web extends Base {

    static navigationOptions = ({navigation}) => {
        const title = navigation.getParam('title', strings('screen_web'));
        const handleBackPress = navigation.getParam('handleBackPress', () => {});
        const onClose = navigation.getParam('onClose', () => {});
        return {
            title: title,
            headerLeft: (
                <HeaderBackButton tintColor={colors.white} onPress={handleBackPress}/>
            ),
            headerRight: (
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Image style={styles.icon} source={require('../assets/images/ic_cancel.png')}/>
                    </TouchableOpacity>
                </View>
            )
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            progress: 0,
            source: {
                uri: 'https://www.google.com/'
            }
        };
    }

    componentDidMount() {
        super.componentDidMount();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.load();
    }

    componentSetParams(navigation) {
        navigation.setParams({handleBackPress: this.handleBackPress});
        navigation.setParams({onClose: this.onClose});
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        clearInterval(this.timer);
    }

    handleBackPress = () => {
        if (this.canGoBack && this.webView) {
            this.webView.goBack();
        } else {
            RootNavigation.goBack();
        }
        return true;
    };

    onClose = () => {
        RootNavigation.goBack();
    };

    load() {
        this.setState({
            title: this.defaultParam?.title || '',
            source: {
                uri: this.defaultParam?.uri || 'https://www.google.com'
            }
        }, this.updateProgress);
    }

    updateProgress = () => {
        this.timer = setInterval(() => {
            const {progress} = this.state;
            if (progress < 0.8) {
                this.setState({
                    progress: progress + (0.2 * Math.random())
                });
            } else {
                clearInterval(this.timer);
            }
        }, 300);
    };

    onNavigationStateChange = (navState) => {
        this.canGoBack = navState.canGoBack;
        if (navState.loading) {
            this.setState({
                progress: 0
            }, this.updateProgress);
        } else {
            this.setState({
                progress: 1
            }, this.updateProgress);
        }

        const {title} = this.state;
        if (!title) {
            this.setParams({title: navState.title});
        } else {
            this.setParams({title: title});
        }
    };

    onLoad = () => {

    };

    onLoadEnd = () => {

    };

    render() {
        const {progress, source} = this.state;
        return (
            <VXRView ref={ref => this.parentView = ref} style={styles.container}>
                <View style={styles.content}>
                    <Progress.Bar
                        color={colors.primaryFirstColor}
                        borderWidth={0}
                        borderColor={colors.backgroundColor}
                        borderRadius={0}
                        height={1}
                        progress={progress}
                        width={widthScreen}/>
                    <WebView
                        ref={ref => this.webView = ref}
                        source={source}
                        javaScriptEnabled={true}
                        onNavigationStateChange={this.onNavigationStateChange}
                        onLoad={this.onLoad}
                        onLoadEnd={this.onLoadEnd}/>
                </View>
            </VXRView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    content: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    button: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
});
