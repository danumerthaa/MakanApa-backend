-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL DEFAULT '',
    "harga" INTEGER NOT NULL DEFAULT 0,
    "kategori" TEXT NOT NULL,
    "isTersedia" BOOLEAN NOT NULL DEFAULT true,
    "tanggalDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Menu_nama_key" ON "Menu"("nama");
