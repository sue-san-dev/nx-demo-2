import { PrismaClient } from '@prisma/client';
import { fakerJA as faker } from '@faker-js/faker';
import { createMockComment } from '../../libs/shared/testing/src';

export async function seedChildComments(prisma: PrismaClient) {
  // レコード作成数
  const length = 2000;
  // ユーザ全件取得
  const users = await prisma.user.findMany();
  // ビデオ全件取得
  const videos = await prisma.video.findMany();
  // コメント全件取得
  const comments = await prisma.comment.findMany();

  await Promise.all(
    Array.from({ length }).map(() => {
      return createMockComment(
        prisma,
        // ランダムでユーザをピック
        faker.helpers.arrayElement(users),
        // ランダムでビデオをピック
        faker.helpers.arrayElement(videos),
        // ランダムでコメントをピック
        faker.helpers.arrayElement(comments),
      );
    })
  );
}