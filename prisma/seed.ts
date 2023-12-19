import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/seed-users';

const prisma = new PrismaClient();

async function main() {
  const { user1, user2 } = await seedUsers(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });