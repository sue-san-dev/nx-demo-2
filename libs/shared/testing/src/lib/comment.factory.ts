import { fakerJA as faker } from '@faker-js/faker';
import { Prisma, PrismaClient, User, Video, Comment } from '@prisma/client';

export const createMockComment = (
  prisma: PrismaClient,
  commenter: User,
  video: Video,
  parentComment?: Comment,
) => {

  const comment: Prisma.CommentCreateInput = {
    content: faker.lorem.sentences({ min: 1, max: 5 }),

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

  if (parentComment) {
    comment.parentComment = {
      connect: {
        id: parentComment.id,
      },
    };
  }

  return prisma.comment.create({
    data: comment,
  });
};