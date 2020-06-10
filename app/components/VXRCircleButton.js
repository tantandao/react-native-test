import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View
} from 'react-native';
import _ from 'lodash';
import colors from '../configs/colors';

export default ({style, enable, icon, onPress}) => {
    const valid = enable === true || enable === undefined;
    const containerStyle = valid ? styles.enableContainer : styles.disableContainer;
    const onPressDebounce = _.debounce(onPress, 300, {leading: true, trailing: false});
    return (
        <View style={[styles.container, {shadowColor: valid ? colors.primaryFirstColor : colors.lineColor}, style]}>
            <TouchableOpacity
                style={containerStyle}
                disabled={!valid}
                pointerEvents={valid ? 'auto' : 'none'}
                onPress={onPressDebounce}>
                {icon ? <Image style={styles.icon} source={icon}/> : null}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 30,
        shadowColor: colors.primaryFirstColor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 10,
        shadowOpacity: 0.5
    },
    enableContainer: {
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primaryFirstColor,
        borderRadius: 30,
        elevation: 2
    },
    disableContainer: {
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lineColor,
        borderRadius: 30,
        elevation: 2
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
});
