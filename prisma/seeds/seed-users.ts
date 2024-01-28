import { PrismaClient } from '@prisma/client';
import { createMockUser } from '../../libs/shared/testing/src';

export async function seedUsers(prisma: PrismaClient) {
  // レコード作成数
  const length = 10;

  await Promise.all(
    Array.from({ length }).map(() => {
      return createMockUser(
        prisma,
      );
    })
  );
}