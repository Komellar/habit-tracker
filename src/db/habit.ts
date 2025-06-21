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
  });
}

export async function removeHabit(id: string) {
  return prisma.habit.delete({
    where: { id },
  });
}
