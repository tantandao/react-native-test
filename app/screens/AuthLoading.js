import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RootNavigation from './RootNavigation';
import VXRConstant from '../constants/VXRConstant';
import VXRGlobal from '../globals/VXRGlobal';
import colors from '../configs/colors';

import Base from './Base';

export default class AuthLoading extends Base {

    componentDidMount() {
        super.componentDidMount();
        this.timer = setTimeout(this.onValidation, 300);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        clearTimeout(this.timer);
    }

    onValidation = async () => {
        const values = await AsyncStorage.multiGet(['@user_token', '@user_role']);
        const userToken = values && values[0] && values[0][1] ? values[0][1] : '';
        const userRole = values && values[1] && values[1][1] ? values[1][1] : '';
        if (userToken) {
            VXRGlobal.userToken = userToken;
            VXRGlobal.userRole = userRole;
            if (userRole === VXRConstant.ROLE_USER) {
                RootNavigation.navigate('User');
            } else {
                RootNavigation.navigate('Auth');
            }
        } else {
            RootNavigation.navigate('Auth');
        }
    };

    render() {
        return (
            <View ref={ref => this.parentView = ref} style={styles.container}>
                <View style={styles.content}>
                    <StatusBar barStyle={'dark-content'} backgroundColor={colors.white}/>
                    <ActivityIndicator color={colors.primaryFirstColor}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    content: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
