import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import _ from 'lodash';
import colors from '../configs/colors';

const APP_BAR_HEIGHT = Platform.select({ios: 44, android: 56, default: 64});

export default ({iconLeft, titleLeft, renderRight, onPressLeft}) => {
    const onPressLeftDebounce = _.debounce(onPressLeft, 300, {leading: true, trailing: false});
    return (
        <View style={styles.container}>
            <View style={[styles.content, Platform.select({android: styles.android, ios: styles.ios})]}>
                <TouchableOpacity style={styles.row} onPress={onPressLeftDebounce}>
                    {iconLeft ? <Image style={styles.icon} source={iconLeft}/> : null}
                    {titleLeft && titleLeft.length > 0 ? <Text style={styles.text} allowFontScaling={false}>{titleLeft}</Text> : null}
                </TouchableOpacity>
                {renderRight ? renderRight() : () => {}}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.statusBarColor,
        width: '100%',
        height: Platform.select({android: 0, ios: getStatusBarHeight(true)}) + APP_BAR_HEIGHT,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    content: {
        flexDirection: 'row',
        backgroundColor: colors.statusBarColor,
        width: '100%',
        height: APP_BAR_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ios: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#A7A7AA'
    },
    android: {
        elevation: 4
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 10
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    text: {
        fontSize: Platform.select({android: 20, ios: 17}),
        color: colors.white,
        fontWeight: 'bold',
        marginLeft: 10
    }
});
