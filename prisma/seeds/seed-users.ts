import { PrismaClient } from '@prisma/client';
import { createMockUser } from '../../libs/shared/testing/src';

export async function seedUsers(prisma: PrismaClient) {
  // レコード作成数
  let length = 20;

  // ログインユーザ作成
  await createMockUser(
    prisma,
    {
      email: 'admin@test.com',
      // '1qazxsw2'のハッシュ値
      password: '$2b$10$lxbHjNQEVFVHJf7kApGywu9eBcT6KDahfgwchvnmdT9i0.2MeVD4m',
      accountName: 'シャフト太郎',
    }
  );
  length--;

  await Promise.all(
    Array.from({ length }).map(() => {
      return createMockUser(
        prisma,
      );
    })
  );
}