import { PrismaClient, Prisma } from '@prisma/client';

export async function seedUsers(prisma: PrismaClient) {
  const _user1: Prisma.UserCreateInput = {
    email: 'example1@example.com',
    accountName: 'テスト 太郎',
    password: '1234',
    channelHandle: 'test01',
    channelAvatarUrl: 'https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg',
  }
  const _user2: Prisma.UserCreateInput = {
    email: 'example2@example.com',
    accountName: 'テスト 次郎',
    password: '1234',
    channelHandle: 'test02',
    channelAvatarUrl: 'https://cdn.britannica.com/25/172925-050-DC7E2298/black-cat-back.jpg',
  }

  const user1 = await prisma.user.upsert({
    where: { email: _user1.email },
    update: _user1,
    create: _user1
  })
  const user2 = await prisma.user.upsert({
    where: { email: _user2.email },
    update: _user2,
    create: _user2
  })

  return {
    user1,
    user2,
  }
}