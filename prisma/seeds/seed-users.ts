import { PrismaClient, Prisma } from '@prisma/client';

export async function seedUsers(prisma: PrismaClient) {
  const _user1: Prisma.UserCreateInput = {
    email: 'example1@example.com',
    name: 'テスト 太郎',
    password: '1234',
    channelName: ''
  }
  const _user2: Prisma.UserCreateInput = {
    email: 'example2@example.com',
    name: 'テスト 次郎',
    password: '1234',
    channelName: ''
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