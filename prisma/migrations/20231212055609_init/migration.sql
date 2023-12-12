-- CreateEnum
CREATE TYPE "ReactionKind" AS ENUM ('LIKE', 'DISLIKE');

-- CreateEnum
CREATE TYPE "PrivacyKind" AS ENUM ('PRIVATE', 'PUBLIC');

-- CreateEnum
CREATE TYPE "Resolution" AS ENUM ('p144', 'p240', 'p360', 'p480', 'p720', 'p1080');

-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "uploaderId" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "VideoResolution" (
    "videoUuid" TEXT NOT NULL,
    "resolution" "Resolution" NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Comment" (
    "content" TEXT NOT NULL,
    "commenterId" INTEGER NOT NULL,
    "videoUuid" TEXT NOT NULL,
    "parentCommentId" INTEGER,
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVideoReaction" (
    "kind" "ReactionKind" NOT NULL,
    "videoUuid" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Playlist" (
    "name" TEXT NOT NULL,
    "privacyKind" "PrivacyKind" NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaylistVideo" (
    "playlistId" INTEGER NOT NULL,
    "videoUuid" TEXT NOT NULL,
    "sequenceNo" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ChannelSubscription" (
    "creatorId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "subscriptionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Video_uploaderId_idx" ON "Video"("uploaderId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoResolution_videoUuid_resolution_key" ON "VideoResolution"("videoUuid", "resolution");

-- CreateIndex
CREATE INDEX "Comment_videoUuid_idx" ON "Comment"("videoUuid");

-- CreateIndex
CREATE INDEX "UserVideoReaction_videoUuid_idx" ON "UserVideoReaction"("videoUuid");

-- CreateIndex
CREATE UNIQUE INDEX "UserVideoReaction_videoUuid_userId_key" ON "UserVideoReaction"("videoUuid", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_creatorId_name_key" ON "Playlist"("creatorId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "PlaylistVideo_playlistId_sequenceNo_key" ON "PlaylistVideo"("playlistId", "sequenceNo");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelSubscription_creatorId_userId_key" ON "ChannelSubscription"("creatorId", "userId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoResolution" ADD CONSTRAINT "VideoResolution_videoUuid_fkey" FOREIGN KEY ("videoUuid") REFERENCES "Video"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commenterId_fkey" FOREIGN KEY ("commenterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_videoUuid_fkey" FOREIGN KEY ("videoUuid") REFERENCES "Video"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVideoReaction" ADD CONSTRAINT "UserVideoReaction_videoUuid_fkey" FOREIGN KEY ("videoUuid") REFERENCES "Video"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVideoReaction" ADD CONSTRAINT "UserVideoReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistVideo" ADD CONSTRAINT "PlaylistVideo_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistVideo" ADD CONSTRAINT "PlaylistVideo_videoUuid_fkey" FOREIGN KEY ("videoUuid") REFERENCES "Video"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelSubscription" ADD CONSTRAINT "ChannelSubscription_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelSubscription" ADD CONSTRAINT "ChannelSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
