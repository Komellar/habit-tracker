import prisma from '@/lib/db';
import { Prisma } from '@/prisma/client';
import { getCurrentUser } from '@/utils/auth/current-user';

export async function addHabit(data: Prisma.HabitUncheckedCreateInput) {
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
  data: Prisma.HabitUncheckedUpdateInput
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

export async function getHabits() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not found');
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

export async function getHabitsCount(search = '') {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not found');
  }

  return await prisma.habit.count({
    where: {
      userId: user.id,
      OR: [
        { title: { contains: search } },
        { description: { contains: search } },
      ],
    },
  });
}

export async function getPaginatedHabits(search = '', page = 1, limit = 5) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not found');
  }

  return await prisma.habit.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      completions: true,
    },
    where: {
      userId: user.id,
      OR: [
        { title: { contains: search } },
        { description: { contains: search } },
      ],
    },
    skip: (page - 1) * limit,
    take: limit,
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
