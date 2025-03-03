// useAppNavitgation.ts
import { NavigationProp, useNavigation } from '@react-navigation/native';

// Define the type for your navigation stack
export type RecipeStackParamList = {
    RecipeList: undefined;
    Recipe: undefined;
    NewRecipe: undefined;
};

export const useAppNavigation = useNavigation<NavigationProp<RecipeStackParamList>>;
