import { PrismaClient } from '@prisma/client';
import { createMockUser } from '../../libs/shared/testing/src';

export async function seedUsers(prisma: PrismaClient) {
  // レコード作成数
  const length = 20;

  await Promise.all(
    Array.from({ length }).map((_, i) => {
      if (i === 0) {
        // ログインユーザ
        return createMockUser(
          prisma,
          {
            email: 'admin@test.com',
            password: 'xxxxxxxxxxxxxxxxxx',
            accountName: 'シャフト太郎',
          }
        );
      } else {
        return createMockUser(
          prisma,
        );
      }
    })
  );
}