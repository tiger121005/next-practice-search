-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "descript" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);
