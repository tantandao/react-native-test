import React from 'react';
import {Dimensions} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import colors from '../../configs/colors';

import Login from './Login';

const widthScreen = Dimensions.get('window').width;

export const AuthStack = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: ({screenProps: {t}}) => ({
                title: t('screen_login'),
                headerBackTitle: null
            })
        }
    },
    {
        initialRouteName: 'Login',
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.statusBarColor
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
                width: widthScreen - 80,
                fontWeight: 'bold'
            }
        }
    }
);
