export type User = {
    userId: number;
    userName: string | null;
    userPreferences: string | null;
    isOnboarded: boolean | null;
};

export type RecipeFormData = {
    name: string;
    image: string;
    description: string;
    numberOfServings: number;
    prepTime: number;
    cookTime: number;
    calories: number;
    favorite: boolean;
    user: number;
};


export type RecipeData = {
    id: number;
    name: string;
    image: string;
    description: string;
    numberOfServings: number;
    prepTime: number;
    cookTime: number;
    calories: number;
    favorite: boolean;
    user: number;
};

export type IngredientData = {
    ingredient: string;
    amount: number;
    measurement: string;
    inStock: boolean;
    recipe: number;
};
