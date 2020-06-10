import React from 'react';
import {
    Image,
    StyleSheet
} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {strings} from '../../../controls/i18n';
import colors from '../../../configs/colors';
import dimens from '../../../configs/dimens';

import Drawer from '../Drawer';

import Booking from '../booking/Booking';
import Setting from '../setting/Setting';
import Support from '../support/Support';
import Feedback from '../feedback/Feedback';

const Home = createDrawerNavigator(
    {
        Booking: {
            screen: Booking,
            navigationOptions: {
                drawerLabel: strings('drawer_page_booking'),
                drawerIcon: ({focused}) => <Image style={[styles.icon, {tintColor: focused ? colors.white : colors.primaryFirstColor}]} source={require('../../../assets/images/ic_booking.png')}/>
            }
        },
        Setting: {
            screen: Setting,
            navigationOptions: {
                drawerLabel: strings('drawer_page_setting'),
                drawerIcon: ({focused}) => <Image style={[styles.icon, {tintColor: focused ? colors.white : colors.primaryFirstColor}]} source={require('../../../assets/images/ic_setting.png')}/>
            }
        },
        Support: {
            screen: Support,
            navigationOptions: {
                drawerLabel: strings('drawer_page_support'),
                drawerIcon: ({focused}) => <Image style={[styles.icon, {tintColor: focused ? colors.white : colors.primaryFirstColor}]} source={require('../../../assets/images/ic_support.png')}/>
            }
        },
        Feedback: {
            screen: Feedback,
            navigationOptions: {
                drawerLabel: strings('drawer_page_feedback'),
                drawerIcon: ({focused}) => <Image style={[styles.icon, {tintColor: focused ? colors.white : colors.primaryFirstColor}]} source={require('../../../assets/images/ic_feedback.png')}/>
            }
        }
    },
    {
        initialRouteName: 'Booking',
        contentComponent: (props) => <Drawer {...props}/>,
        contentOptions: {
            activeBackgroundColor: colors.primaryFirstColor,
            inactiveBackgroundColor: colors.backgroundColor,
            activeTintColor: colors.white,
            inactiveTintColor: colors.primaryFirstColor,
            labelStyle: {
                fontSize: dimens.mediumText,
                marginVertical: 15,
                marginHorizontal: 0
            }
        }
    }
);

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    label: {
        fontSize: dimens.mediumText,
        fontWeight: 'bold',
        marginVertical: 15,
        marginHorizontal: 0
    }
});

export default Home;
