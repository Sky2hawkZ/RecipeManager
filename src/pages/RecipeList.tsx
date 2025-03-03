import { Text, View } from "react-native";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RecipeStackParamList } from "../hooks/useAppNavigation";

function RecipeListScreen() {
    const navigation = useNavigation<NavigationProp<RecipeStackParamList>>();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text onPress={() => navigation.navigate('Recipe')}>Recipe Screen</Text>
            <Text>We have the best Recipes!</Text>
            <Text>You should come back and try a few!</Text>
            <Text>When This page has been built!</Text>
        </View>
    );
}

export default RecipeListScreen;
