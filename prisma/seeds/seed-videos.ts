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

  const video1 = await prisma.video.upsert({
    where: { uuid: _video1.uuid },
    update: _video1,
    create: _video1,
  })
  const video2 = await prisma.video.upsert({
    where: { uuid: _video2.uuid },
    update: _video2,
    create: _video2,
  })

  return {
    video1,
    video2,
  }
}