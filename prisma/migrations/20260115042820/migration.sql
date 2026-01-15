-- CreateTable
CREATE TABLE "fortune_results" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "lifePathNumber" INTEGER NOT NULL,
    "aspirationQ1" TEXT NOT NULL,
    "aspirationQ2" TEXT NOT NULL,
    "aspirationQ3" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
