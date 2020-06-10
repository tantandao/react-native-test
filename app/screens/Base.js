import React, {PureComponent} from 'react';
import {
    StyleSheet
} from 'react-native';
import {ThemeContext} from 'react-navigation';
import RootNavigation from './RootNavigation';
import VXRView from '../components/VXRView';
import JsonUtil from '../utils/JsonUtil';

export default class Base extends PureComponent {

    static contextType = ThemeContext;

    defaultParam = {};

    componentDidMount() {
        this.setNavigation();
        this.setDefaultParam();
        this.componentSetParams(this.props.navigation);
        this.componentRunParam(this.defaultParam);
    }

    setNavigation() {
        this.didFocusSubscription = this.props.navigation.addListener('didFocus', this.handleDidFocusSubscription);
    }

    handleDidFocusSubscription = (payload) => {
        RootNavigation.setNavigation(this.props.navigation);
        RootNavigation.setPayload(payload);
    };

    setDefaultParam() {
        const defaultParam = this.props.navigation.getParam('defaultParam', '');
        this.defaultParam = JsonUtil.parseJsonString(defaultParam);
    }

    componentSetParams(navigation) {

    }

    componentRunParam(param) {
        this.showPopup(param);
    }

    showPopup(param) {
        const popup = param?.popup;
        if (popup) this.alert(popup?.title, popup?.message, popup?.buttons || [], popup?.options || {});
    }

    componentWillUnmount() {
        this.didFocusSubscription.remove();
    }

    getParam(param, fallback) {
        return this.props.navigation.getParam(param, fallback);
    }

    setParams(params) {
        this.props.navigation.setParams(params);
    }

    getTheme() {
        return this.context;
    }

    alertWithType(...args) {

    }

    alert(...args) {

    }

    dismiss() {

    }

    render() {
        return (
            <VXRView ref={ref => this.parentView = ref} style={styles.container}>
            </VXRView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
