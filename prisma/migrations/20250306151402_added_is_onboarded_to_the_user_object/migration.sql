/*
  Warnings:

  - Added the required column `isOnboarded` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "userPreference" TEXT NOT NULL,
    "isOnboarded" BOOLEAN NOT NULL
);
INSERT INTO "new_User" ("userId", "userName", "userPreference") SELECT "userId", "userName", "userPreference" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
