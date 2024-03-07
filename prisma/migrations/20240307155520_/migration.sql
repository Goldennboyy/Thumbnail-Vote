/*
  Warnings:

  - You are about to drop the `VoteThumbnail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VoteThumbnail" DROP CONSTRAINT "VoteThumbnail_thumbnailId_fkey";

-- DropForeignKey
ALTER TABLE "VoteThumbnail" DROP CONSTRAINT "VoteThumbnail_userId_fkey";

-- DropTable
DROP TABLE "VoteThumbnail";

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "voteCount" INTEGER NOT NULL DEFAULT 0,
    "thumbnailId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_thumbnailId_key" ON "Vote"("thumbnailId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_key" ON "Vote"("userId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Thumbnail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
