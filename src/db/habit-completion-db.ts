import prisma from '@/lib/db';

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

export async function removeHabitCompletions(id: string) {
  return prisma.habitCompletion.deleteMany({
    where: { id },
  });
}
