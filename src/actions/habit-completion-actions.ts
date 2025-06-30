'use server';

import { revalidatePath } from 'next/cache';

import {
  createHabitCompletion,
  getHabitCompletions,
} from '@/db/habit-completion-db';
import { editHabit } from '@/db/habit-db';
import { Prisma } from '@/prisma';
import { formatDate } from '@/utils/dates';

export async function addHabitCompletion(
  habitId: string,
  bestStreak: number,
  streak: number,
  _prevState: unknown
) {
  try {
    await createHabitCompletion(habitId, new Date());
    const completions = await getHabitCompletions(habitId);

    let shouldIncrementStreak = false;
    let shouldIncrementBestStreak = false;

    if (completions.length > 1) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = formatDate(yesterday);

      const previousCompletionDate = formatDate(
        completions[completions.length - 2].date
      );

      shouldIncrementStreak = previousCompletionDate === yesterdayString;
    }

    if ((streak >= bestStreak && shouldIncrementStreak) || bestStreak === 0) {
      shouldIncrementBestStreak = true;
    }

    await editHabit(habitId, {
      streak: shouldIncrementStreak ? { increment: 1 } : 1,
      bestStreak: shouldIncrementBestStreak ? { increment: 1 } : undefined,
    });
    revalidatePath(`/habits`);
  } catch (error) {
    console.error('Error adding habit completion:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Database error: ${error.message}`);
    } else {
      throw new Error(
        'An unexpected error occurred while adding the habit completion.'
      );
    }
  }
}
