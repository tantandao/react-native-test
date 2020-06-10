import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text
} from 'react-native';
import VXRView from '../../../components/VXRView';
import AutoHeightWebView from 'react-native-autoheight-webview';
import colors from '../../../configs/colors';
import dimens from '../../../configs/dimens';

import Base from '../../Base';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export default class NotificationDetail extends Base {

    constructor(props) {
        super(props);
        this.state = {
            notification: null
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.load();
    }

    load() {
        this.setState({
            notification: this.defaultParam?.notification || null
        });
    }

    render() {
        const {notification} = this.state;
        return (
            <VXRView ref={ref => this.parentView = ref} style={styles.container}>
                <ScrollView
                    style={styles.content}
                    contentContainerStyle={{paddingBottom: 15}}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}>
                    <Text style={[styles.title, {marginTop: 15, marginHorizontal: 15}]}>{notification?.title}</Text>
                    <Text style={[styles.subtitle, {marginTop: 5, marginHorizontal: 15}]}>{notification?.body}</Text>
                    <Text style={[styles.subtitle, {marginTop: 5, marginHorizontal: 15}]}>{notification?.createDate}</Text>
                    <AutoHeightWebView
                        style={styles.web}
                        source={{html: notification?.data?.html}}
                        zoomable={false}
                        scrollEnabled={false}
                        customStyle={`
                            * {
                                font-family: 'Arial';
                            }
                        `}
                    />
                </ScrollView>
            </VXRView>
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
        backgroundColor: colors.white
    },
    title: {
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: dimens.normalText,
        color: colors.primaryTextColor,
        marginTop: 15
    },
    web: {
        width: widthScreen - 30,
        height: heightScreen,
        marginLeft: 15
    }
});
