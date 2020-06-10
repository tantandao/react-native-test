import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {strings} from '../../../controls/i18n';
import colors from '../../../configs/colors';
import dimens from '../../../configs/dimens';

import Base from '../../Base';

export default class More extends Base {

    render() {
        return (
            <View ref={ref => this.parentView = ref} style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.text}>{strings('screen_more')}</Text>
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
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: dimens.largeText,
        color: colors.primaryTextColor,
        textAlign: 'center'
    }
});
