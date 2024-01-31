import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/seed-users';
import { seedVideos } from './seeds/seed-videos';
import { seedComments } from './seeds/seed-comments';
import { seedChildComments } from './seeds/seed-child-comments';

const prisma = new PrismaClient();

async function main() {
  // 全テーブルtruncate
  await truncateAllTables();
  // seed users
  await seedUsers(prisma);
  // seed videos
  await seedVideos(prisma);
  // seed comments
  await seedComments(prisma);
  // seed child comments
  await seedChildComments(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function truncateAllTables() {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${ name }"`)
    .join(', ');

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${ tables } RESTART IDENTITY CASCADE;`);
  } catch (error) {
    console.log({ error });
  }
}