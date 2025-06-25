import { Prisma, PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

const initialHabits: Prisma.HabitCreateInput[] = [
  {
    id: 'clx3v1k2d0000z8l1h9b2q7w1',
    title: 'Drink Water',
    description: 'Drink at least 2 liters of water daily',
    color: 'blue',
    createdAt: daysAgo(3),
  },
  {
    id: 'clx3v1k2d0001z8l1v7n4m8e2',
    title: 'Exercise',
    description: '30 minutes of exercise every day',
    goal: 30,
    color: 'cyan',
    streak: 2,
    createdAt: daysAgo(2),
  },
  {
    id: 'clx3v1k2d0002z8l1j5k6p3r3',
    title: 'Read Books',
    description: 'Read at least one book per month',
    goal: 1,
    color: 'red',
    streak: 3,
    createdAt: daysAgo(3),
  },
];

const initialCompletions: Prisma.HabitCompletionCreateInput[] = [
  {
    date: daysAgo(3),
    habit: {
      connect: { id: 'clx3v1k2d0002z8l1j5k6p3r3' },
    },
  },
  {
    date: daysAgo(2),
    habit: {
      connect: { id: 'clx3v1k2d0002z8l1j5k6p3r3' },
    },
  },
  {
    date: daysAgo(1),
    habit: {
      connect: { id: 'clx3v1k2d0002z8l1j5k6p3r3' },
    },
  },
  {
    date: daysAgo(2),
    habit: {
      connect: { id: 'clx3v1k2d0001z8l1v7n4m8e2' },
    },
  },
  {
    date: daysAgo(1),
    habit: {
      connect: { id: 'clx3v1k2d0001z8l1v7n4m8e2' },
    },
  },
];

async function main() {
  await prisma.habitCompletion.deleteMany({});
  await prisma.habit.deleteMany({});

  console.log('Database cleared.');

  for (const habit of initialHabits) {
    const newHabit = await prisma.habit.create({
      data: habit,
    });

    console.log('Created habit:', newHabit);
  }

  // const today = new Date();
  for (const completion of initialCompletions) {
    const newCompletion = await prisma.habitCompletion.create({
      data: completion,
    });

    console.log('Created habit completion:', newCompletion);
  }
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
