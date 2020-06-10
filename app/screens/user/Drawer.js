import React, {Component} from 'react';
import {
    Alert,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import RootNavigation from '../RootNavigation';
import VXRHelper from '../../helpers/VXRHelper';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {strings} from '../../controls/i18n';
import colors from '../../configs/colors';
import dimens from '../../configs/dimens';
import JsonUtil from '../../utils/JsonUtil';

export default class Drawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: 'Đào Công Tân',
                avatar: 'https://vuonhoaviet.vn/wp-content/uploads/2017/11/44.-Hoa-h%E1%BB%93ng-ngo%E1%BA%A1i-Sheherazad.jpg',
                description: 'Nhẹ nhàng, sâu lắng và trầm tư',
                linkedin: 'https://www.linkedin.com/in/c%C3%B4ng-t%C3%A2n-%C4%91%C3%A0o-3b99b9150/'
            }
        };
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    onProfile = () => {
        RootNavigation.closeDrawer();
        this.timer = setTimeout(() => {
            const {user} = this.state;
            RootNavigation.navigate('Profile', {
                defaultParam: JsonUtil.buildDefaultParam({
                    user: user
                })
            });
        }, 300);
    };

    onItemPress = ({route, focused}) => {
        if (focused) {
            RootNavigation.closeDrawer();
        } else {
            RootNavigation.closeDrawer();
            this.timer = setTimeout(() => RootNavigation.navigate(route.routeName), 300);
        }
    };

    onLogout = () => {
        VXRHelper.resetApplication();
    };

    onConfirmLogout = () => {
        RootNavigation.closeDrawer();
        this.timer = setTimeout(() => {
            Alert.alert(strings('title_alert_logout'),
                strings('message_alert_logout'),
                [
                    {text: strings('button_cancel')},
                    {text: strings('button_ok'), onPress: this.onLogout},
                ]
            );
        }, 300);
    };

    render() {
        const {user} = this.state;
        return (
            <View ref={ref => this.parentView = ref} style={styles.container}>
                <ScrollView style={styles.content}>
                    <View style={styles.header}/>
                    <TouchableOpacity style={styles.body} onPress={this.onProfile}>
                        <View style={styles.avatar}>
                            <Image style={{width: 60, height: 60, borderRadius: 30}} source={{uri: user?.avatar}}/>
                        </View>
                        <View style={{flex: 1, marginLeft: 15}}>
                            <Text style={styles.text}>{user?.name}</Text>
                            <Text style={styles.subtext}>{user?.description}</Text>
                        </View>
                    </TouchableOpacity>
                    <DrawerNavigatorItems {...this.props} onItemPress={this.onItemPress}/>
                    <TouchableOpacity style={{marginTop: 45, marginBottom: 15}} onPress={this.onConfirmLogout}>
                        <Text style={styles.action}>{strings('action_logout')}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
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
    header: {
        backgroundColor: colors.white,
        height: Platform.select({
            ios: getStatusBarHeight(true),
            android: 0
        })
    },
    body: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: colors.lineColor
    },
    avatar: {
        backgroundColor: colors.white,
        width: 62,
        height: 62,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: colors.lineColor,
        borderRadius: 31
    },
    text: {
        fontSize: dimens.largeText,
        color: colors.primaryTextColor,
        fontWeight: 'bold'
    },
    subtext: {
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor
    },
    action: {
        fontSize: dimens.normalText,
        color: colors.primaryFirstColor,
        textAlign: 'center'
    }
});
