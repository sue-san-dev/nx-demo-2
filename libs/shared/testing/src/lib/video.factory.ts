import { fakerJA as faker } from '@faker-js/faker';
import { Prisma, PrismaClient, User } from '@prisma/client';

export const createMockVideo = (
  prisma: PrismaClient,
  uploader: User,
) => {

  const video: Prisma.VideoCreateInput = {
    uuid: faker.string.uuid(),
    description: faker.lorem.sentences({ min: 1, max: 3 }),
    title: faker.lorem.words({ min: 3, max: 10 }).split(' ').join(''),
    manifestUrl: 'https://nx-demo-sft.s3.ap-northeast-1.amazonaws.com/sample-video/manifest.mpd',
    thumbnailUrl: faker.image.urlLoremFlickr({ category: 'nature', width: 640, height: 360 }),
    viewCount: faker.number.int({ max: 100000 }),
    duration: faker.number.int({ min: 30, max: 2 * 60 * 60 }),
    createdAt: faker.helpers.arrayElement([
      faker.date.past({ years: 2 }),
      faker.date.recent({ days: 10 }),
      faker.date.recent({ days: 1 }),
    ]),

    uploader: {
      connect: {
        id: uploader.id,
      }
    },
  };

  return prisma.video.create({
    data: video,
  });
};