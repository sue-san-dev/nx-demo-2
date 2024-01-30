import { Injectable } from '@nestjs/common';
import { ApiPrismaService } from '@nx-demo/api-prisma';
import { VideoMetadata, VideoMetadataDetail } from '@nx-demo/shared-domain';

@Injectable()
export class ApiWatchService {

  constructor(
    private apiPrismaService: ApiPrismaService,
  ) { }

  async getVideoMetadata(videoKey: string): Promise<VideoMetadataDetail | null> {
    const video = await this.apiPrismaService.video.findUnique({
      where: {
        uuid: videoKey,
      },
      include: {
        _count: {
          select: {
            // コメント数
            comments: true,
            // いいね数
            reactions: {
              where: {
                kind: 'LIKE',
              }
            },
          }
        },
        uploader: {
          include: {
            _count: {
              select: {
                // チャンネル登録者数
                channelSubscribers: true,
              }
            }
          }
        },
      }
    });

    if (video == null) return null;

    return {
      ...video,
      commentCount: video._count.comments,
      likeCount: video._count.reactions,
      uploader: {
        ...video.uploader,
        channelSubscriberCount: video.uploader._count.channelSubscribers,
      },
    };
  }

  async getRelatedVideos(videoKey: string, offset: number): Promise<VideoMetadata[] | null> {
    // TODO: 将来的に機械学習で関連動画を取得するようにする
    const videos = await this.apiPrismaService.video.findMany({
      include: {
        uploader: true,
      },
    });

    return videos;
  }
}
