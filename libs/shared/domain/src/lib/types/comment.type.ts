import { Prisma } from '@prisma/client';

const commentWithCommenter = Prisma.validator<Prisma.CommentDefaultArgs>()({
  include: {
    commenter: true,
  }
});

export type IComment = Prisma.CommentGetPayload<typeof commentWithCommenter> & {
  // いいね数
  likeCount: number,
  // 子コメント数
  childCommentCount: number,
};
