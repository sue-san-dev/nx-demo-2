import { PrismaExcludeUtil } from '@nx-demo/shared-utils';
import { Prisma } from '@prisma/client';

const videoWithUploader = Prisma.validator<Prisma.VideoDefaultArgs>()({
  include: {
    uploader: {
      select: PrismaExcludeUtil.userWithoutPassword,
    },
  }
});

export type IVideoMetadata = Prisma.VideoGetPayload<typeof videoWithUploader>;

export type IVideoMetadataDetail = IVideoMetadata & {
  // コメント数
  commentCount: number,
  // いいね数
  likeCount: number,
  uploader: {
    // チャンネル登録者数
    channelSubscriberCount: number,
  }
};
