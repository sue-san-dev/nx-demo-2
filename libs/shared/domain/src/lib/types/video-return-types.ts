import { Prisma } from '@prisma/client';

const videoWithUploader = Prisma.validator<Prisma.VideoDefaultArgs>()({
  include: {
    uploader: true,
  }
});

export type VideoMetadata = Prisma.VideoGetPayload<typeof videoWithUploader>;

export type VideoMetadataDetail = VideoMetadata & {
  // コメント数
  commentCount: number,
  // いいね数
  likeCount: number,
  uploader: {
    // チャンネル登録者数
    channelSubscriberCount: number,
  }
};
