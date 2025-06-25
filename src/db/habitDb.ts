import prisma from '@/lib/db';

import { Prisma } from '../../generated/prisma';
export async function addHabit(data: Prisma.HabitCreateInput) {
  return prisma.habit.create({
    data,
  });
}

export async function editHabit(id: string, data: Prisma.HabitUpdateInput) {
  return prisma.habit.update({
    where: { id },
    data,
  });
}

export async function getHabits() {
  return prisma.habit.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      completions: true,
    },
  });
}

export async function getHabitById(id: string) {
  return prisma.habit.findUnique({
    where: { id },
  });
}

export async function removeHabit(id: string) {
  return prisma.$transaction([
    prisma.habitCompletion.deleteMany({
      where: { habitId: id },
    }),
    prisma.habit.delete({
      where: { id },
    }),
  ]);
}

export async function getHabitCompletions(habitId: string) {
  return prisma.habitCompletion.findMany({
    where: { habitId },
    orderBy: {
      date: 'asc',
    },
  });
}

export async function createHabitCompletion(habitId: string, date: Date) {
  return prisma.habitCompletion.create({
    data: {
      habitId,
      date,
    },
  });
}

export async function removeHabitCompletion(id: string) {
  return prisma.habitCompletion.delete({
    where: { id },
  });
}
