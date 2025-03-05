/*
  Warnings:

  - You are about to drop the column `userPreferences` on the `User` table. All the data in the column will be lost.
  - Added the required column `userPreference` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "userPreference" TEXT NOT NULL
);
INSERT INTO "new_User" ("userId", "userName") SELECT "userId", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
