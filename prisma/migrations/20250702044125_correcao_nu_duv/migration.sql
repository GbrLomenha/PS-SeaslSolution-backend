/*
  Warnings:

  - You are about to drop the column `NO_duv` on the `DUV` table. All the data in the column will be lost.
  - Added the required column `NU_duv` to the `DUV` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DUV" (
    "ID_duv" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NU_duv" TEXT NOT NULL,
    "DT_viagem" DATETIME NOT NULL,
    "DT_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DT_atualizacao" DATETIME NOT NULL,
    "ID_navio" INTEGER NOT NULL,
    CONSTRAINT "DUV_ID_navio_fkey" FOREIGN KEY ("ID_navio") REFERENCES "Navio" ("ID_navio") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DUV" ("DT_atualizacao", "DT_criacao", "DT_viagem", "ID_duv", "ID_navio") SELECT "DT_atualizacao", "DT_criacao", "DT_viagem", "ID_duv", "ID_navio" FROM "DUV";
DROP TABLE "DUV";
ALTER TABLE "new_DUV" RENAME TO "DUV";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
