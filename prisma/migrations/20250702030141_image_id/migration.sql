/*
  Warnings:

  - Added the required column `ID_img_cloudinary` to the `Navio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_img_cloudinary` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Navio" (
    "ID_navio" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NO_navio" TEXT NOT NULL,
    "URL_img_navio" TEXT NOT NULL,
    "ID_img_cloudinary" TEXT NOT NULL,
    "DS_bandeira" TEXT NOT NULL,
    "DT_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DT_atualizacao" DATETIME NOT NULL
);
INSERT INTO "new_Navio" ("DS_bandeira", "DT_atualizacao", "DT_criacao", "ID_navio", "NO_navio", "URL_img_navio") SELECT "DS_bandeira", "DT_atualizacao", "DT_criacao", "ID_navio", "NO_navio", "URL_img_navio" FROM "Navio";
DROP TABLE "Navio";
ALTER TABLE "new_Navio" RENAME TO "Navio";
CREATE TABLE "new_Pessoa" (
    "ID_pessoa" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NO_pessoa" TEXT NOT NULL,
    "DS_nacionalidade" TEXT NOT NULL,
    "URL_foto_pessoa" TEXT NOT NULL,
    "ID_img_cloudinary" TEXT NOT NULL,
    "DT_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DT_atualizacao" DATETIME NOT NULL
);
INSERT INTO "new_Pessoa" ("DS_nacionalidade", "DT_atualizacao", "DT_criacao", "ID_pessoa", "NO_pessoa", "URL_foto_pessoa") SELECT "DS_nacionalidade", "DT_atualizacao", "DT_criacao", "ID_pessoa", "NO_pessoa", "URL_foto_pessoa" FROM "Pessoa";
DROP TABLE "Pessoa";
ALTER TABLE "new_Pessoa" RENAME TO "Pessoa";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
