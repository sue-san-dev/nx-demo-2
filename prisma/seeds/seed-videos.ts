import { PrismaClient, Prisma, User } from '@prisma/client';

export async function seedVideos(prisma: PrismaClient, user1: User, user2: User) {
  const _video1: Prisma.VideoCreateInput = {
    uuid: '2a22dee3-42ea-142f-d898-4b26540ab1c3',
    description: '説明1',
    title: 'タイトル1',
    thumbnailUrl: 'https://i.ytimg.com/vi/pxn0wL_uSm4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA5-R0ttQXH147mk3eZZWR0eHpcpQ',
    uploader: {
      connect: {
        id: user1.id,
      }
    },
  }
  const _video2: Prisma.VideoCreateInput = {
    uuid: '2d5d1d7f-5aef-f214-9fd3-7adae37ef0b8',
    description: '説明2',
    title: 'タイトル2',
    thumbnailUrl: 'https://i.ytimg.com/vi/B83nmCSwRuw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCtqJhoe9k1ruNHbtK5L0rgbPr72w',
    uploader: {
      connect: {
        id: user2.id,
      }
    },
  }
  const _video3: Prisma.VideoCreateInput = {
    uuid: '0f0b5dd3-37b6-4f99-5ea8-3e8b3915aa99',
    description: '説明3',
    title: 'タイトル3',
    thumbnailUrl: 'https://i.ytimg.com/vi/B83nmCSwRuw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCtqJhoe9k1ruNHbtK5L0rgbPr72w',
    uploader: {
      connect: {
        id: user1.id,
      }
    },
  }
  const _video4: Prisma.VideoCreateInput = {
    uuid: '39183d8e-d7e4-ed14-9a29-1e82a7c13f2c',
    description: '説明4',
    title: 'タイトル4',
    thumbnailUrl: 'https://i.ytimg.com/vi/B83nmCSwRuw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCtqJhoe9k1ruNHbtK5L0rgbPr72w',
    uploader: {
      connect: {
        id: user2.id,
      }
    },
  }
  const _video5: Prisma.VideoCreateInput = {
    uuid: '2638f3f7-c444-5543-6e0c-43a6d7596233',
    description: '説明5',
    title: 'タイトル5',
    thumbnailUrl: 'https://i.ytimg.com/vi/B83nmCSwRuw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCtqJhoe9k1ruNHbtK5L0rgbPr72w',
    uploader: {
      connect: {
        id: user1.id,
      }
    },
  }

  const [video1, video2, video3, video4, video5] = [_video1, _video2, _video3, _video4, _video5]
    .map(async video => {
      return await prisma.video.upsert({
        where: { uuid: video.uuid },
        update: video,
        create: video,
      })
    })

  return {
    video1,
    video2,
    video3,
    video4,
    video5,
  }
}