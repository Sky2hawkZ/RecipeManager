import { Text, View } from "react-native";
import React from "react";
import Styles from './FavoritesStyles';

export function FavoritesScreen() {

  const styles = Styles('#fff', 20, '#f9c2ff', 18);

    return (
        <View style={styles.container}>
            <Text>Favorites Screen</Text>
            <Text>These are your favorite recipes!</Text>
        </View>
    );
}
