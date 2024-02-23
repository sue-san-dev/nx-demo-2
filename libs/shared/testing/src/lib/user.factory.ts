import { fakerJA as faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

export const createMockUser = (
  prisma: PrismaClient,
  userData: Partial<Prisma.UserCreateInput> = {},
) => {

  const user: Prisma.UserCreateInput = {
    email: faker.internet.email(),
    accountName: faker.person.fullName(),
    password: faker.internet.password(),
    channelHandle: faker.string.alpha(10),
    channelAvatarUrl: faker.image.avatar(),
    ...userData,
  };

  return prisma.user.create({
    data: user,
  });
};