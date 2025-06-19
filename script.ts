import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  //   const habit = await prisma.habit.create({
  //     data: {
  //       title: 'Test Habit',
  //       description: 'This is a test habit',
  //       createdAt: new Date(),
  //     },
  //   });
  //   console.log('Created habit:', habit);
  //   const habits = await prisma.habit.findMany();
  //   console.log('All habits:', habits);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
