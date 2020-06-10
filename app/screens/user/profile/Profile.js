import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import VXRView from '../../../components/VXRView';
import VXRHandler from '../../../handlers/VXRHandler';
import {strings} from '../../../controls/i18n';
import colors from '../../../configs/colors';
import dimens from '../../../configs/dimens';

import Base from '../../Base';

export default class Profile extends Base {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.load();
    }

    load() {
        this.setState({
            user: this.defaultParam?.user || null
        });
    }

    onViewProfile = () => {
        const {user} = this.state;
        VXRHandler.openUrl(user?.linkedin);
    };

    render() {
        const {user} = this.state;
        return (
            <VXRView ref={ref => this.parentView = ref} style={styles.container}>
                <ScrollView style={styles.content} contentContainerStyle={{paddingBottom: 15}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    <View style={styles.header}>
                        <View style={styles.avatar}>
                            <Image style={{width: 110, height: 110, borderRadius: 55}} source={{uri: user?.avatar}}/>
                        </View>
                        <Text style={[styles.text, {marginTop: 15}]}>{user?.name}</Text>
                        <Text style={styles.subtext}>{user?.description}</Text>
                        <TouchableOpacity style={[styles.row, {marginTop: 15}]} onPress={this.onViewProfile}>
                            <Text style={styles.action}>{strings('action_view_profile')}</Text>
                        </TouchableOpacity>
                    </View>
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
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        paddingVertical: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        backgroundColor: colors.white,
        width: 110,
        height: 110,
        borderRadius: 55,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 2
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
