import { Prisma } from '@/prisma';

import prisma from '../../src/lib/db';

import { user } from './login';

const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

const initialHabits: Prisma.HabitCreateArgs['data'][] = [
  {
    id: 'clx3v1k2d0000z8l1h9b2q7w1',
    title: 'Drink Water',
    description: 'Drink at least 2 liters of water daily',
    color: 'blue',
    createdAt: daysAgo(3),
    userId: user.id,
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
    userId: user.id,
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
    userId: user.id,
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

export const habits = async () => {
  for (const habit of initialHabits) {
    await prisma.habit.upsert({
      create: habit,
      where: { id: habit.id },
      update: {},
    });
  }

  for (const completion of initialCompletions) {
    await prisma.habitCompletion.create({
      data: completion,
    });
  }
};
