-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Passageiro" (
    "ID_passageiro" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ID_pessoa" INTEGER NOT NULL,
    CONSTRAINT "Passageiro_ID_pessoa_fkey" FOREIGN KEY ("ID_pessoa") REFERENCES "Pessoa" ("ID_pessoa") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Passageiro" ("ID_passageiro", "ID_pessoa") SELECT "ID_passageiro", "ID_pessoa" FROM "Passageiro";
DROP TABLE "Passageiro";
ALTER TABLE "new_Passageiro" RENAME TO "Passageiro";
CREATE UNIQUE INDEX "Passageiro_ID_pessoa_key" ON "Passageiro"("ID_pessoa");
CREATE TABLE "new_Tripulante" (
    "ID_tripulante" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DS_sid" TEXT NOT NULL,
    "ID_pessoa" INTEGER NOT NULL,
    CONSTRAINT "Tripulante_ID_pessoa_fkey" FOREIGN KEY ("ID_pessoa") REFERENCES "Pessoa" ("ID_pessoa") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tripulante" ("DS_sid", "ID_pessoa", "ID_tripulante") SELECT "DS_sid", "ID_pessoa", "ID_tripulante" FROM "Tripulante";
DROP TABLE "Tripulante";
ALTER TABLE "new_Tripulante" RENAME TO "Tripulante";
CREATE UNIQUE INDEX "Tripulante_ID_pessoa_key" ON "Tripulante"("ID_pessoa");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
