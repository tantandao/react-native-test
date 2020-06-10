import React from 'react';
import {Dimensions} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import colors from '../../configs/colors';

import Home from './home/Home';
import Profile from './profile/Profile';
import Message from './message/Message';
import Notification from './notification/Notification';
import NotificationDetail from './notification/NotificationDetail';
import More from './more/More';
import Web from '../Web';

const widthScreen = Dimensions.get('window').width;

export const UserStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({screenProps: {t}}) => ({
                header: null,
                headerBackTitle: null
            })
        },
        Profile: {
            screen: Profile,
            navigationOptions: ({screenProps: {t}}) => ({
                title: t('screen_profile'),
                headerBackTitle: null
            })
        },
        Message: {
            screen: Message,
            navigationOptions: ({screenProps: {t}}) => ({
                title: t('screen_message'),
                headerBackTitle: null
            })
        },
        Notification: {
            screen: Notification,
            navigationOptions: ({screenProps: {t}}) => ({
                title: t('screen_notification'),
                headerBackTitle: null
            })
        },
        NotificationDetail: {
            screen: NotificationDetail,
            navigationOptions: ({screenProps: {t}}) => ({
                title: t('screen_notification_detail'),
                headerBackTitle: null
            })
        },
        More: {
            screen: More,
            navigationOptions: ({screenProps: {t}}) => ({
                title: t('screen_more'),
                headerBackTitle: null
            })
        },
        Web: {
            screen: Web,
            navigationOptions: ({screenProps: {t}}) => ({
                headerBackTitle: null
            })
        }
    },
    {
        initialRouteName: 'Home',
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
