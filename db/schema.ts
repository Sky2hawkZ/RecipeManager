import { int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
  userId: int().primaryKey({ autoIncrement: true }),
  userName: text(),
  userPreferences: text(),
  isOnboarded: integer({ mode: 'boolean'}),
});
