export type User = {
    userId: number;
    userName: string | null;
    userPreferences: string | null;
    isOnboarded: boolean | null;
};

export type RecipeData = {
    name: string;
    image: string;
    description: string;
    numberOfServings: number;
    prepTime: number;
    cookTime: number;
    calories: number;
    favorite: boolean;
    userId: number;
};

export type IngredientData = {
    ingredient: string;
    amount: number;
    measurement: string;
    inStock: boolean;
    recipe: number;
};
