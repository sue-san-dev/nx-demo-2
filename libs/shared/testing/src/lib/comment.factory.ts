import { fakerJA as faker } from '@faker-js/faker';
import { Prisma, PrismaClient, User, Video } from '@prisma/client';

export const createMockComment = (
  prisma: PrismaClient,
  commenter: User,
  video: Video,
) => {

  const comment: Prisma.CommentCreateInput = {
    content: faker.lorem.sentences({ min: 1, max: 3 }),

    commenter: {
      connect: {
        id: commenter.id,
      }
    },
    video: {
      connect: {
        uuid: video.uuid,
      }
    },
  };

  return prisma.comment.create({
    data: comment,
  });
};