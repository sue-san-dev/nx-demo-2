import { Test, TestingModule } from '@nestjs/testing';
import { ApiWatchService } from './api-watch.service';
import { ApiPrismaService } from '@nx-demo/api-prisma';

describe('ApiWatchService', () => {
  let service: ApiWatchService;
  let mockApiPrismaService: any;

  beforeEach(async () => {
    mockApiPrismaService = {
      video: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
      },
      comment: {
        findMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiWatchService,
        {
          provide: ApiPrismaService,
          useValue: mockApiPrismaService,
        },
      ],
    }).compile();

    service = module.get<ApiWatchService>(ApiWatchService);
  });

  it('getVideoMetadataのテスト', async () => {
    const videoKey = 'some-video-uuid';
    const video = {
      uploader: {
        _count: {
          channelSubscribers: 100
        }
      },
      _count: {
        comments: 10,
        reactions: 5
      }
    };

    const expectedData = {
      ...video,
      commentCount: video._count.comments,
      likeCount: video._count.reactions,
      uploader: {
        ...video.uploader,
        channelSubscriberCount: video.uploader._count.channelSubscribers,
      },
    }

    mockApiPrismaService.video.findUnique.mockResolvedValue(video);

    const result = await service.getVideoMetadata(videoKey);
    expect(result).toEqual(expectedData);
  });

  it('getVideoCommentsのテスト', async () => {
    const videoKey = 'some-video-uuid';
    const videoComments = 
    [
      {
        video: {
          _count: {
            reactions: 100
          }
        },
        _count: {
          childComments: 20
        }
      },
      {
        video: {
          _count: {
            reactions: 120
          }
        },
        _count: {
          childComments: 21
        }
      },
    ]

    const expectedData = videoComments.map(videoComment => {
      return {
        ...videoComment,
        likeCount: videoComment.video._count.reactions,
        childCommentCount: videoComment._count.childComments,
      };
    });

    mockApiPrismaService.comment.findMany.mockResolvedValue(videoComments);

    const result = await service.getVideoComments(videoKey, 0, 0);
    expect(result).toEqual(expectedData);
  });

  it('getRelatedVideosのテスト', async () => {
    const videoKey = 'some-video-uuid';
    const videos = 
    [
      {
        uploader: {
          id: 11
        },
      },
      {
        uploader: {
          id: 12
        },
      },
    ]

    const expectedData = videos;

    mockApiPrismaService.video.findMany.mockResolvedValue(videos);

    const result = await service.getRelatedVideos(videoKey, 0);
    expect(result).toEqual(expectedData);
  });
});