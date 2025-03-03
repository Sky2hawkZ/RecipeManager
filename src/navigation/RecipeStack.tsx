import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeListScreen from '../pages/RecipeList';
import RecipeScreen from '../pages/Recipe';
import { RecipeStackParamList } from '../hooks/useAppNavigation';
import NewRecipeScreen from '../pages/NewRecipe';

export const Stack = createNativeStackNavigator<RecipeStackParamList>();

const RecipeStack = () => {
    return (
        <Stack.Navigator initialRouteName="RecipeList">
            <Stack.Screen
                name="RecipeList"
                component={RecipeListScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="Recipe"
                component={RecipeScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="NewRecipe"
                component={NewRecipeScreen}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default RecipeStack;
