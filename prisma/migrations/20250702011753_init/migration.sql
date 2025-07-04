-- CreateTable
CREATE TABLE "Navio" (
    "ID_navio" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NO_navio" TEXT NOT NULL,
    "URL_img_navio" TEXT NOT NULL,
    "DS_bandeira" TEXT NOT NULL,
    "DT_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DT_atualizacao" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Pessoa" (
    "ID_pessoa" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NO_pessoa" TEXT NOT NULL,
    "DS_nacionalidade" TEXT NOT NULL,
    "URL_foto_pessoa" TEXT NOT NULL,
    "DT_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DT_atualizacao" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Passageiro" (
    "ID_passageiro" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ID_pessoa" INTEGER NOT NULL,
    CONSTRAINT "Passageiro_ID_pessoa_fkey" FOREIGN KEY ("ID_pessoa") REFERENCES "Pessoa" ("ID_pessoa") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tripulante" (
    "ID_tripulante" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DS_sid" TEXT NOT NULL,
    "ID_pessoa" INTEGER NOT NULL,
    CONSTRAINT "Tripulante_ID_pessoa_fkey" FOREIGN KEY ("ID_pessoa") REFERENCES "Pessoa" ("ID_pessoa") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DUV" (
    "ID_duv" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NO_duv" TEXT NOT NULL,
    "DT_viagem" DATETIME NOT NULL,
    "DT_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DT_atualizacao" DATETIME NOT NULL,
    "ID_navio" INTEGER NOT NULL,
    CONSTRAINT "DUV_ID_navio_fkey" FOREIGN KEY ("ID_navio") REFERENCES "Navio" ("ID_navio") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DUV_Pessoa" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DUV_Pessoa_A_fkey" FOREIGN KEY ("A") REFERENCES "DUV" ("ID_duv") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DUV_Pessoa_B_fkey" FOREIGN KEY ("B") REFERENCES "Pessoa" ("ID_pessoa") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Passageiro_ID_pessoa_key" ON "Passageiro"("ID_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "Tripulante_ID_pessoa_key" ON "Tripulante"("ID_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "_DUV_Pessoa_AB_unique" ON "_DUV_Pessoa"("A", "B");

-- CreateIndex
CREATE INDEX "_DUV_Pessoa_B_index" ON "_DUV_Pessoa"("B");
