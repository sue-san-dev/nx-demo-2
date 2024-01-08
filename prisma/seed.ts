import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/seed-users';
import { seedVideos } from './seeds/seed-videos';

const prisma = new PrismaClient();

async function main() {
  const { user1, user2 } = await seedUsers(prisma);
  const { video1, video2 } = await seedVideos(prisma, user1, user2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });