/*
  Warnings:

  - You are about to drop the `VideoResolution` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `manifestUrl` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VideoResolution" DROP CONSTRAINT "VideoResolution_videoUuid_fkey";

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "manifestUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "VideoResolution";

-- DropEnum
DROP TYPE "Resolution";
