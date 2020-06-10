import React from 'react';
import {
    SafeAreaView,
    StyleSheet
} from 'react-native';

export default ({style, children}) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

