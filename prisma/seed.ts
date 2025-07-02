import { Prisma, PrismaClient } from '../generated/prisma';
import { hashPassword } from '../src/utils/auth/hash-password';

const prisma = new PrismaClient();

const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

const userId = 'clx3v1k2d0000z8l1h7n5l7f';

const initialUser: Prisma.UserCreateArgs['data'] = {
  id: userId,
  email: 'test@test.com',
  name: 'User One',
  role: 'user',
  password: 'password1',
  salt: '6c17c8b86ff3864dcaf0717ae4d248ee',
};

const initialHabits: Prisma.HabitCreateArgs['data'][] = [
  {
    id: 'clx3v1k2d0000z8l1h9b2q7w1',
    title: 'Drink Water',
    description: 'Drink at least 2 liters of water daily',
    color: 'blue',
    createdAt: daysAgo(3),
    userId: userId,
  },
  {
    id: 'clx3v1k2d0001z8l1v7n4m8e2',
    title: 'Exercise',
    description: '30 minutes of exercise every day',
    goal: 30,
    color: 'cyan',
    streak: 2,
    bestStreak: 2,
    createdAt: daysAgo(2),
    userId: userId,
  },
  {
    id: 'clx3v1k2d0002z8l1j5k6p3r3',
    title: 'Read Books',
    description: 'Read at least one book per month',
    goal: 1,
    color: 'red',
    streak: 3,
    bestStreak: 3,
    createdAt: daysAgo(3),
    userId: userId,
  },
];

const initialCompletions: Prisma.HabitCompletionCreateArgs['data'][] = [
  {
    date: daysAgo(3),
    habitId: 'clx3v1k2d0002z8l1j5k6p3r3',
  },
  {
    date: daysAgo(2),
    habitId: 'clx3v1k2d0002z8l1j5k6p3r3',
  },
  {
    date: daysAgo(1),
    habitId: 'clx3v1k2d0002z8l1j5k6p3r3',
  },
  {
    date: daysAgo(2),
    habitId: 'clx3v1k2d0001z8l1v7n4m8e2',
  },
  {
    date: daysAgo(1),
    habitId: 'clx3v1k2d0001z8l1v7n4m8e2',
  },
];

async function main() {
  await prisma.habitCompletion.deleteMany({});
  await prisma.habit.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Database cleared.');

  const hashedPassword = await hashPassword(
    initialUser.password,
    initialUser.salt
  );
  const newUser = await prisma.user.create({
    data: { ...initialUser, password: hashedPassword },
  });
  console.log('Created user:', newUser);

  for (const habit of initialHabits) {
    const newHabit = await prisma.habit.upsert({
      create: habit,
      where: { id: habit.id },
      update: {},
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
