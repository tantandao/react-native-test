import React from 'react';
import {createSwitchNavigator} from 'react-navigation';

import AuthLoading from './app/screens/AuthLoading';
import {AuthStack} from './app/screens/auth/AuthNavigator';
import {UserStack} from './app/screens/user/UserNavigator';

export const RootStack = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        Auth: AuthStack,
        User: UserStack
    },
    {
        initialRouteName: 'AuthLoading'
    }
);
