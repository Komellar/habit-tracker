import { Prisma, PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const initialHabits: Prisma.HabitCreateInput[] = [
  {
    id: 'clx3v1k2d0000z8l1h9b2q7w1',
    title: 'Drink Water',
    description: 'Drink at least 2 liters of water daily',
    color: 'blue',
  },
  {
    id: 'clx3v1k2d0001z8l1v7n4m8e2',
    title: 'Exercise',
    description: '30 minutes of exercise every day',
    goal: 30,
    color: 'cyan',
  },
  {
    id: 'clx3v1k2d0002z8l1j5k6p3r3',
    title: 'Read Books',
    description: 'Read at least one book per month',
    goal: 1,
    color: 'red',
  },
];

const initialCompletions: Prisma.HabitCompletionCreateInput[] = [
  {
    date: new Date('2025-06-21'),
    habit: {
      connect: { id: 'clx3v1k2d0002z8l1j5k6p3r3' },
    },
  },
  {
    date: new Date('2025-06-22'),
    habit: {
      connect: { id: 'clx3v1k2d0002z8l1j5k6p3r3' },
    },
  },
  {
    date: new Date('2025-06-23'),
    habit: {
      connect: { id: 'clx3v1k2d0002z8l1j5k6p3r3' },
    },
  },
  {
    date: new Date('2025-06-21'),
    habit: {
      connect: { id: 'clx3v1k2d0001z8l1v7n4m8e2' },
    },
  },
  {
    date: new Date('2025-06-22'),
    habit: {
      connect: { id: 'clx3v1k2d0001z8l1v7n4m8e2' },
    },
  },
];

async function main() {
  for (const habit of initialHabits) {
    const newHabit = await prisma.habit.create({
      data: habit,
    });

    console.log('Created habit:', newHabit);
  }

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
