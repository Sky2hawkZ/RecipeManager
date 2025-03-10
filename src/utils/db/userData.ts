import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import { activeUser } from '../../../db/schema'; // Assuming you have an activeUser table schema
import { eq } from 'drizzle-orm';

const database = SQLite.openDatabaseSync('db.db', { enableChangeListener: true });
const db = drizzle(database);

// Function to set the active user
export const setActiveUser = async (userData: { userId: number}) => {
  try {
    await db.delete(activeUser);

    await db.insert(activeUser).values({
        userId: userData.userId,
    }).returning();
  } catch (error) {
    console.error('Error setting active user:', error);
  }
};

// Function to get the active user
export const getActiveUser = async () => {
  try {
    const activeUserRecord = await db.select().from(activeUser);
    return activeUserRecord;
  } catch (error) {
    console.error('Error getting active user:', error);
    return null;
  }
};

// Function to clear the active user
export const clearActiveUser = async (userId: number) => {
  try {
    await db.delete(activeUser).where(eq(activeUser.userId, userId)).returning({});
  } catch (error) {
    console.error('Error clearing active user:', error);
  }
};
