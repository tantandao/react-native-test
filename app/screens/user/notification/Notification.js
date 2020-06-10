import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import VXRNotificationHandler from '../../../handlers/VXRNotificationHandler';
import colors from '../../../configs/colors';
import dimens from '../../../configs/dimens';

import Base from '../../Base';

export default class Notification extends Base {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            loading: false,
            notifications: [
                {
                    categoryId: 0,
                    title: 'Thông báo số 0',
                    body: 'Chúc anh review code thật hạnh phúc, một ngày tràn ngập năng lượng, tươi trẻ mạnh khỏe để tiếp tục phát triển sản phầm ngày hoàn thiện hơn',
                    createDate: 'Hôm nay, 10/06/2020 - 08:00:00',
                    isRead: false,
                    data: {
                        html: '<!DOCTYPE html><html><body><h1>Xin chào xin chào ^^</h1></body></html><p>Đây là bài test apply Vị trí React Native</p></body></html>'
                    }
                },
                {
                    categoryId: 1,
                    title: 'Thông báo số 1',
                    body: 'Bấm vô để xem thêm chi tiết về em',
                    createDate: 'Hôm nay, 10/06/2020 - 08:05:00',
                    isRead: true,
                    data: {
                        url: 'https://www.facebook.com/daocongtan'
                    }
                }
            ]
        };
    }

    onPress = (item) => () => {
        VXRNotificationHandler.onClick(null, item);
    };

    renderItem = ({item, index}) => {
        const titleStyle = item?.isRead ? {color: colors.noteTextColor, fontWeight: 'normal'} : {};
        const subtitleStyle = item?.isRead ? {color: colors.noteTextColor} : {};
        return (
            <TouchableOpacity key={index} style={styles.item} onPress={this.onPress(item)}>
                <Image style={[styles.icon, {tintColor: colors.primaryFirstColor}]} source={require('../../../assets/images/ic_notification.png')}/>
                <View style={{flex: 1, marginLeft: 15}}>
                    <Text style={[styles.title, titleStyle]}>{item?.title}</Text>
                    <Text style={[styles.subtitle, subtitleStyle, {marginTop: 5}]}>{item?.body}</Text>
                    <Text style={[styles.subtitle, subtitleStyle, {fontSize: dimens.smallText, marginTop: 5}]}>{item?.createDate}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    renderSeparator = () => {
        return (
            <View style={styles.separator}/>
        );
    };

    keyExtractor = (item, index) => String(index);

    onRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            setTimeout(() => this.setState({refreshing: false, loading: false}), 1000);
        });
    };

    onEndReached = () => {
        if (!this.onEndReachedCalledDuringMomentum) {
            this.setState({
                loading: true
            }, () => {
                this.onEndReachedCalledDuringMomentum = true;
            });
        }
    };

    renderFooter = () => {
        const {loading} = this.state;
        if (loading) {
            return (
                <View style={{height: 40, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator color={colors.primaryFirstColor}/>
                </View>
            );
        }
        return null;
    };

    onMomentumScrollBegin = () => this.onEndReachedCalledDuringMomentum = false;

    render() {
        const {refreshing, notifications} = this.state;
        return (
            <View ref={ref => this.parentView = ref} style={styles.container}>
                <View style={styles.content}>
                    <FlatList
                        refreshing={refreshing}
                        data={notifications}
                        renderItem={this.renderItem}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={this.keyExtractor}
                        onRefresh={this.onRefresh}
                        onEndReachedThreshold={0.5}
                        onEndReached={this.onEndReached}
                        ListFooterComponent={this.renderFooter}
                        onMomentumScrollBegin={this.onMomentumScrollBegin}
                    />
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
    separator: {
        height: 1,
        backgroundColor: colors.lineColor,
        marginLeft: 60,
        marginRight: 15
    },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    title: {
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: dimens.normalText,
        color: colors.primaryTextColor
    }
});
