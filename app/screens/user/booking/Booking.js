import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import RootNavigation from '../../RootNavigation';
import VXRHeader from '../../../components/VXRHeader';
import VXRGlobal from '../../../globals/VXRGlobal';
import {strings} from '../../../controls/i18n';
import colors from '../../../configs/colors';
import dimens from '../../../configs/dimens';

import Base from '../../Base';
import NotificationIcon from '../notification/NotificationIcon';

export default class Booking extends Base {

    componentDidMount() {
        super.componentDidMount();

        VXRGlobal.appInitialize = true;
    }

    onMessage = () => {
        RootNavigation.navigate('Message');
    };

    onNotification = () => {
        RootNavigation.navigate('Notification');
    };

    onMore = () => {
        RootNavigation.navigate('More');
    };

    openDrawer = () => {
        RootNavigation.openDrawer();
    };

    renderRight = () => {
        return (
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={this.onMessage}>
                    <Image style={styles.icon} source={require('../../../assets/images/ic_message.png')}/>
                </TouchableOpacity>
                <NotificationIcon onPress={this.onNotification}/>
                <TouchableOpacity style={styles.button} onPress={this.onMore}>
                    <Image style={styles.icon} source={require('../../../assets/images/ic_more.png')}/>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <View ref={ref => this.parentView = ref} style={styles.container}>
                <View style={styles.content}>
                    <VXRHeader
                        iconLeft={require('../../../assets/images/ic_menu.png')}
                        titleLeft={strings('drawer_page_booking')}
                        onPressLeft={this.openDrawer}
                        renderRight={this.renderRight}/>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.text}>{strings('drawer_page_booking')}</Text>
                        </View>
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
        backgroundColor: colors.white
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
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
    },
    text: {
        fontSize: dimens.largeText,
        color: colors.primaryTextColor,
        textAlign: 'center'
    }
});
