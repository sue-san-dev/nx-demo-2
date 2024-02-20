import { PrismaClient } from '@prisma/client';
import { fakerJA as faker } from '@faker-js/faker';
import { createMockComment } from '../../libs/shared/testing/src';

export async function seedChildComments(prisma: PrismaClient) {
  // レコード作成数
  const length = 2000;
  // ユーザ全件取得
  const users = await prisma.user.findMany();
  // コメント全件取得
  const comments = await prisma.comment.findMany({
    include: {
      video: true,
    }
  });

  await Promise.all(
    Array.from({ length }).map(() => {
      // ランダムでコメントをピック
      const parentComment = faker.helpers.arrayElement(comments);
      return createMockComment(
        prisma,
        // ランダムでユーザをピック
        faker.helpers.arrayElement(users),
        parentComment.video,
        parentComment,
      );
    })
  );
}