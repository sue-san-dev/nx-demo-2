/*
  Warnings:

  - You are about to drop the column `channelName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[channelHandle]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channelHandle` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viewCount` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "channelName",
DROP COLUMN "name",
ADD COLUMN     "accountName" TEXT NOT NULL,
ADD COLUMN     "channelAvatarUrl" TEXT,
ADD COLUMN     "channelHandle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "viewCount" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "WatchHistory" (
    "uuid" TEXT NOT NULL,
    "videoUuid" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchHistory_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE INDEX "WatchHistory_userId_idx" ON "WatchHistory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_channelHandle_key" ON "User"("channelHandle");

-- AddForeignKey
ALTER TABLE "WatchHistory" ADD CONSTRAINT "WatchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
