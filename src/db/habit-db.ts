import prisma from '@/lib/db';
import { getCurrentUser } from '@/utils/auth/current-user';

import { Prisma } from '../../generated/prisma';

export async function addHabit(data: Prisma.HabitCreateArgs['data']) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not found');
  }

  return prisma.habit.create({
    data,
  });
}

export async function editHabit(
  id: string,
  data: Prisma.HabitUpdateArgs['data']
) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not found');
  }

  return prisma.habit.update({
    where: { id, userId: user.id },
    data,
  });
}

export async function getHabits(query?: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not found');
  }

  if (query && query.trim().length) {
    return prisma.habit.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        completions: true,
      },
      where: {
        userId: user.id,
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
        ],
      },
    });
  }

  return prisma.habit.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      completions: true,
    },
    where: {
      userId: user.id,
    },
  });
}

export async function getHabitById(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not found');
  }

  return prisma.habit.findUnique({
    where: { id, userId: user.id },
  });
}

export async function removeHabit(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not found');
  }

  return prisma.$transaction([
    prisma.habitCompletion.deleteMany({
      where: { habitId: id },
    }),
    prisma.habit.delete({
      where: { id },
    }),
  ]);
}
