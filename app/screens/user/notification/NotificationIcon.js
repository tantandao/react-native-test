import React, {useState, useEffect} from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import EventRegister from '../../../controls/EventRegister';
import colors from '../../../configs/colors';
import dimens from '../../../configs/dimens';

export default ({onPress}) => {
    async function getCount() {
        const value = await AsyncStorage.getItem('@app_unread_notification');
        setCount(Number(value));
    }

    const [count, setCount] = useState('UnreadNotification');
    useEffect(() => {
        getCount();
        const event = EventRegister.addEventListener('SYNC_UNREAD_NOTIFICATION', getCount);
        return () => EventRegister.removeEventListener(event);
    }, []);
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image style={styles.icon} source={require('../../../assets/images/ic_notification.png')}/>
            {
                count > 0 ?
                    <View style={styles.badge}>
                        <Text style={styles.text}>{count > 99 ? '99+' : count}</Text>
                    </View>
                    : null
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
    badge: {
        position: 'absolute',
        top: 0,
        left: '50%',
        backgroundColor: colors.badgerColor,
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 20
    },
    text: {
        fontSize: dimens.smallText,
        color: colors.white
    }
});
