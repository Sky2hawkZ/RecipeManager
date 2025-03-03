import { Button, Text, View } from "react-native";
import React from "react";
import Styles from './FavoritesStyles';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export function FavoritesScreen() {

    const styles = Styles('#fff', 20, '#f9c2ff', 18);
    const width = useSharedValue(100);

    const handlePress = () => {
        width.value = withSpring(width.value + 25);
    };

    return (
        <View style={styles.container}>
            <Text>Favorites Screen</Text>
            <Text>These are your favorite recipes!</Text>
            <Animated.View style={{ ...styles.box, width: width }}/>
            <Button onPress={handlePress} title="Click me" />
            <Button onPress={() => { width.value = withSpring(100); }} title="Reset" />
        </View>
    );
}