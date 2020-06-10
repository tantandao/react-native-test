import React from 'react';
import {
    Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import VXRNotificationHandler from '../handlers/VXRNotificationHandler';
import firebase from 'react-native-firebase';
import type {Notification, NotificationOpen} from 'react-native-firebase';

import Base from './Base';

export default class Firebase extends Base {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
        if (Platform.OS === 'android') {
            const channel = new firebase.notifications.Android.Channel('vexere-channel', 'VeXeRe Channel', firebase.notifications.Android.Importance.Max).setDescription('My apps VeXeRe channel');
            firebase.notifications().android.createChannel(channel);
        }
        this.checkPermission();
        this.onTokenRefresh();
        this.onNotificationCached();
        this.onNotificationDisplayed();
        this.onNotification();
        this.onNotificationOpened();
        this.onMessage();
    }

    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getFCMToken();
        } else {
            this.requestPermission();
        }
    }

    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            this.getFCMToken();
        } catch (error) {
        }
    }

    async getFCMToken() {
        const fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // Send token to back-end
            await AsyncStorage.setItem('@fcm_token', fcmToken);
        }
    }

    onTokenRefresh() {
        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(async (fcmToken) => {
            if (fcmToken) {
                // Send token to back-end
                await AsyncStorage.setItem('@fcm_token', fcmToken);
                await AsyncStorage.removeItem('@fcm_token_trigger');
            }
        });
    }

    onNotificationCached() {
        this.timer = setTimeout(async () => {
            const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
            if (notificationOpen) {
                const action = notificationOpen.action;
                const notification: Notification = notificationOpen.notification;
                VXRNotificationHandler.onClick(action, notification.data);
            }
        }, 1000);
    }

    onNotificationDisplayed() {
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            VXRNotificationHandler.onReceived(null, notification);
        });
    }

    onNotification() {
        this.notificationListener = firebase.notifications().onNotification(async (notification: Notification) => {
            notification
                .android.setAutoCancel(true)
                .android.setChannelId('vexere-channel')
                .android.setSmallIcon('ic_launcher');
            firebase.notifications().displayNotification(notification);
        });
    }

    onNotificationOpened() {
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            if (notificationOpen) {
                const action = notificationOpen.action;
                const notification: Notification = notificationOpen.notification;
                VXRNotificationHandler.onClick(action, notification.data);
            }
        });
    }

    onMessage() {
        this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {

        });
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.onTokenRefreshListener();
        clearTimeout(this.timer);
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
        this.messageListener();
    }

    render() {
        return null;
    }
}
