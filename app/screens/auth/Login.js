import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RootNavigation from '../RootNavigation';
import VXRCircleButton from '../../components/VXRCircleButton';
import VXRConstant from '../../constants/VXRConstant';
import {strings} from '../../controls/i18n';
import colors from '../../configs/colors';
import dimens from '../../configs/dimens';

import Base from '../Base';

export default class Login extends Base {

    onLogin = async () => {
        await AsyncStorage.multiSet([['@user_token', 'daocongtan'], ['@user_role', VXRConstant.ROLE_USER], ['@app_unread_notification', '1']]);
        RootNavigation.navigate('User');
    };

    render() {
        return (
            <View ref={ref => this.parentView = ref} style={styles.container}>
                <View style={styles.content}>
                    <VXRCircleButton icon={require('../../assets/images/ic_next.png')} onPress={this.onLogin}/>
                    <Text style={[styles.text, {marginTop: 15, marginHorizontal: 15}]}>{strings('text_login')}</Text>
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
    },
    text: {
        fontSize: dimens.largeText,
        color: colors.primaryTextColor,
        textAlign: 'center'
    }
});
