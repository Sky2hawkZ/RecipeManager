import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PreferencesScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Recipe Details</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        position: 'absolute',
        top: 40,
        left: 10,
    },
});

export default PreferencesScreen;
