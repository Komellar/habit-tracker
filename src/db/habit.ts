import prisma from '@/lib/db';
import { ColorKey } from '@/utils/colors';

export async function addHabit(data: {
  title: string;
  description?: string;
  goal?: number;
  color: ColorKey;
}) {
  return prisma.habit.create({
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
  return prisma.habit.delete({
    where: { id },
  });
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
