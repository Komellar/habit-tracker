import prisma from '@/lib/db';
import { Prisma } from '@/prisma/client';

export async function getHabitCompletions(habitId: string) {
  return prisma.habitCompletion.findMany({
    where: { habitId },
    orderBy: {
      date: 'asc',
    },
  });
}

export async function createHabitCompletion(
  data: Prisma.HabitCompletionUncheckedCreateInput
) {
  return prisma.habitCompletion.create({
    data,
  });
}

export async function removeHabitCompletions(id: string) {
  return prisma.habitCompletion.deleteMany({
    where: { id },
  });
}
