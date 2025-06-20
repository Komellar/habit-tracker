import prisma from '@/lib/db';

export async function addHabit(data: {
  title: string;
  description?: string;
  goal?: number;
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
  });
}
