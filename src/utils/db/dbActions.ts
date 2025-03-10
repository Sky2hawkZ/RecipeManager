import * as SQLite from 'expo-sqlite';
import  { drizzle } from 'drizzle-orm/expo-sqlite';
import { eq } from 'drizzle-orm';
import { user } from '../../../db/schema';

// Assuming you have a db instance exported from a db fileimport { user } from '../../../db/schema';
const database = SQLite.openDatabaseSync('db.db', { enableChangeListener: true });
const db = drizzle(database);

/**
 * user Functions
 */
// Create a new user
export const createUser = async (userName: string, userPreferences: string, isOnboarded: boolean) => {
  const newUser = await db.insert(user).values({
    userName,
    userPreferences,
    isOnboarded: isOnboarded,
  }).returning();
  return newUser;
};

// Read a user by ID
export const getUserById = async (userId: number) => {
  const foundUser = await db.select().from(user).where(eq(user.userId,userId));
  return foundUser;
};

// Update a user by ID
export const updateUserById = async (userId: number, updates: Partial<{ userName: string, userPreferences: string, isOnboarded: boolean }>) => {
  const updatedUser = await db.update(user).set({
    ...updates,
    isOnboarded: updates.isOnboarded !== undefined ? updates.isOnboarded  : undefined,
  }).where(eq(user.userId, userId)).returning();
  return updatedUser;
};

// Delete a user by ID
export const deleteUserById = async (userId: number) => {
  const deletedUser = await db.delete(user).where(eq(user.userId, userId)).returning();
  return deletedUser;
};
