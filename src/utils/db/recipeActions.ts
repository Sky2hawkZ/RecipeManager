import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { eq } from 'drizzle-orm';
import { recipe, ingredient } from '../../../db/schema';
import { IngredientData, RecipeData } from '../dataTypes';

const database = SQLite.openDatabaseSync('db.db', { enableChangeListener: true });
const db = drizzle(database);

export class RecipeActions {
    // Create a new recipe
    static async createRecipe(data: RecipeData) {
        const newRecipe = await db.insert(recipe).values(data).returning();
        return newRecipe;
    }

    // Read a recipe by ID
    static async getRecipeById(recipeId: number) {
        const foundRecipe = await db.select().from(recipe).where(eq(recipe.id, recipeId));
        return foundRecipe[0];
    }

    // Update a recipe by ID
    static async updateRecipeById(recipeId: number, updates: Partial<RecipeData>) {
        const updatedRecipe = await db.update(recipe).set(updates).where(eq(recipe.id, recipeId)).returning();
        return updatedRecipe;
    }

    // Delete a recipe by ID
    static async deleteRecipeById(recipeId: number) {
        const deletedRecipe = await db.delete(recipe).where(eq(recipe.id, recipeId)).returning();
        return deletedRecipe;
    }



    // Create a new ingredient
    static async createIngredient(data: IngredientData) {
        const newIngredient = await db.insert(ingredient).values(data).returning();
        return newIngredient;
    }

    // Read an ingredient by ID
    static async getIngredientById(ingredientId: number) {
        const foundIngredient = await db.select().from(ingredient).where(eq(ingredient.id, ingredientId));
        return foundIngredient[0];
    }

    // Update an ingredient by ID
    static async updateIngredientById(ingredientId: number, updates: Partial<IngredientData>) {
        const updatedIngredient = await db.update(ingredient).set(updates).where(eq(ingredient.id, ingredientId)).returning();
        return updatedIngredient;
    }

    // Delete an ingredient by ID
    static async deleteIngredientById(ingredientId: number) {
        const deletedIngredient = await db.delete(ingredient).where(eq(ingredient.id, ingredientId)).returning();
        return deletedIngredient;
    }
}
