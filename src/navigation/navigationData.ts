export type BottomTabParamList = {
  Home: undefined;
  Recipes: { screen: string, name: string };
  newRecipes: undefined;
  Favorites: undefined;
};

export type RecipeStackParamList = {
    RecipeList: { screen: string, name?: string };
    Recipe: undefined;
    NewRecipe: undefined;
};
