import { Injectable } from '@nestjs/common';
import { ApiPrismaService } from '@nx-demo/api-prisma';
import { IComment, IVideoMetadata, IVideoMetadataDetail } from '@nx-demo/shared-domain';

@Injectable()
export class ApiWatchService {

  constructor(
    private apiPrismaService: ApiPrismaService,
  ) { }

  async getVideoMetadata(videoKey: string): Promise<IVideoMetadataDetail | null> {
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

  async getVideoComments(videoKey: string, offset: number, parentCommentId?: number): Promise<IComment[]> {
    const videoComments = await this.apiPrismaService.comment.findMany({
      where: {
        videoUuid: videoKey,
        parentComment: parentCommentId ? { id: parentCommentId } : null,
      },
      include: {
        _count: {
          select: {
            childComments: true,
          }
        },
        commenter: true,
        video: {
          select: {
            _count: {
              select: {
                reactions: {
                  where: {
                    kind: 'LIKE',
                  }
                }
              }
            }
          }
        }
      },
    });

    return videoComments.map(videoComment => {
      return {
        ...videoComment,
        likeCount: videoComment.video._count.reactions,
        childCommentCount: videoComment._count.childComments,
      };
    });
  }

  async getRelatedVideos(videoKey: string, offset: number): Promise<IVideoMetadata[]> {
    // TODO: 将来的に機械学習で関連動画を取得するようにする
    const videos = await this.apiPrismaService.video.findMany({
      include: {
        uploader: true,
      },
    });

    return videos;
  }
}
