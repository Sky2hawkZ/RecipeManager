import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';

const LandingScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Landing Page</Text>
            <Text>Click on the button below to navigate to the Preferences Screen</Text>
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

export default LandingScreen;
