import { int, integer, sqliteTable, text, real} from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
  userId: int().primaryKey({ autoIncrement: true }),
  userName: text(),
  firstName: text(),
  lastName: text(),
  userPreferences: text(),
  isOnboarded: integer({ mode: 'boolean'}),
});

export const activeUser = sqliteTable('activeUser', {
  userId: int().primaryKey(),
});

export const recipe = sqliteTable('recipe', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text(),
  image: text(),
  description: text(),
  numberOfServings: int(),
  prepTime: int(),
  cookTime: int(),
  calories: int(),
  favorite: integer({ mode: 'boolean'}),
  user: int().references(() => user.userId),
});

export const ingredient = sqliteTable('ingredient', {
  id: int().primaryKey({ autoIncrement: true }),
  ingredient: text(),
  amount: real(),
  measurement: text(),
  inStock: integer({ mode: 'boolean'}),
  // Define foreign key relationship
  recipe: int().references(() => recipe.id),
});
