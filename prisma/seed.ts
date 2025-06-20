import { Prisma, PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const initialHabits: Prisma.HabitCreateInput[] = [
  {
    title: 'Drink Water',
    description: 'Drink at least 2 liters of water daily',
  },
  {
    title: 'Exercise',
    description: '30 minutes of exercise every day',
    goal: 30,
  },
  {
    title: 'Read Books',
    description: 'Read at least one book per month',
    goal: 1,
  },
];

async function main() {
  for (const habit of initialHabits) {
    const newHabit = await prisma.habit.create({
      data: habit,
    });

    console.log('Created habit:', newHabit);
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
