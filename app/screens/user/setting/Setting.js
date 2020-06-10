import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import RootNavigation from '../../RootNavigation';
import VXRHeader from '../../../components/VXRHeader';
import {strings} from '../../../controls/i18n';
import colors from '../../../configs/colors';
import dimens from '../../../configs/dimens';

import Base from '../../Base';

export default class Setting extends Base {

    openDrawer = () => {
        RootNavigation.openDrawer();
    };

    renderRight = () => {
        return null;
    };

    render() {
        return (
            <View ref={ref => this.parentView = ref} style={styles.container}>
                <View style={styles.content}>
                    <VXRHeader
                        iconLeft={require('../../../assets/images/ic_menu.png')}
                        titleLeft={strings('drawer_page_setting')}
                        onPressLeft={this.openDrawer}
                        renderRight={this.renderRight}/>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.text}>{strings('drawer_page_setting')}</Text>
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
    text: {
        fontSize: dimens.largeText,
        color: colors.primaryTextColor,
        textAlign: 'center'
    }
});
