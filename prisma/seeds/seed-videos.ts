import { PrismaClient } from '@prisma/client';
import { fakerJA as faker } from '@faker-js/faker';
import { createMockVideo } from '../../libs/shared/testing/src';

export async function seedVideos(prisma: PrismaClient) {
  // レコード作成数
  const length = 50;
  // ユーザ全件取得
  const users = await prisma.user.findMany();

  await Promise.all(
    Array.from({ length }).map(() => {
      return createMockVideo(
        prisma,
        // ランダムでユーザをピック
        faker.helpers.arrayElement(users),
      );
    })
  );
}