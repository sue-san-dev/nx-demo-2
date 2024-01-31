import { PrismaClient } from '@prisma/client';
import { fakerJA as faker } from '@faker-js/faker';
import { createMockComment } from '../../libs/shared/testing/src';

export async function seedComments(prisma: PrismaClient) {
  // レコード作成数
  const length = 1000;
  // ユーザ全件取得
  const users = await prisma.user.findMany();
  // ビデオ全件取得
  const videos = await prisma.video.findMany();

  await Promise.all(
    Array.from({ length }).map(() => {
      return createMockComment(
        prisma,
        // ランダムでユーザをピック
        faker.helpers.arrayElement(users),
        // ランダムでビデオをピック
        faker.helpers.arrayElement(videos),
      );
    })
  );
}