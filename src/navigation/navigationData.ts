export type BottomTabParamList = {
  HomeScreen: {screen: string};
  Recipes: {screen: string; name: string};
  newRecipes: undefined;
  Favorites: undefined;
  Landing: undefined;
};

export type RecipeStackParamList = {
  RecipeList: {screen: string; name?: string};
  Recipe: { recipeId?: number };
  NewRecipe: undefined;
};
