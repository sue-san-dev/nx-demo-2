import { fakerJA as faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

export const createMockUser = (
  prisma: PrismaClient,
) => {

  const user: Prisma.UserCreateInput = {
    email: faker.internet.email(),
    accountName: faker.person.fullName(),
    password: faker.internet.password(),
    channelHandle: faker.string.alpha(10),
    channelAvatarUrl: faker.internet.avatar(),
  };

  return prisma.user.create({
    data: user,
  });
};