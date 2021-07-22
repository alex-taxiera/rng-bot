-- CreateTable
CREATE TABLE "Drawing" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "guildId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amountOfWinners" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "discordId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "__UserEnteredDrawings" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "__UserWonDrawings" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.discordId_unique" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "__UserEnteredDrawings_AB_unique" ON "__UserEnteredDrawings"("A", "B");

-- CreateIndex
CREATE INDEX "__UserEnteredDrawings_B_index" ON "__UserEnteredDrawings"("B");

-- CreateIndex
CREATE UNIQUE INDEX "__UserWonDrawings_AB_unique" ON "__UserWonDrawings"("A", "B");

-- CreateIndex
CREATE INDEX "__UserWonDrawings_B_index" ON "__UserWonDrawings"("B");

-- AddForeignKey
ALTER TABLE "__UserEnteredDrawings" ADD FOREIGN KEY ("A") REFERENCES "Drawing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__UserEnteredDrawings" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__UserWonDrawings" ADD FOREIGN KEY ("A") REFERENCES "Drawing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__UserWonDrawings" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
