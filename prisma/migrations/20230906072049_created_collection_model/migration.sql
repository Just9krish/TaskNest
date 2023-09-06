/*
  Warnings:

  - Added the required column `name` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Collection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Collection" ("id") SELECT "id" FROM "Collection";
DROP TABLE "Collection";
ALTER TABLE "new_Collection" RENAME TO "Collection";
CREATE UNIQUE INDEX "Collection_name_userId_key" ON "Collection"("name", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
