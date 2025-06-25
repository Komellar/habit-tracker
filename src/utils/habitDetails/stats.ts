import { HabitCompletion } from '@/prisma';

import { formatDate } from '../dates';

export const getSuccessRate = (
  createdAt: Date,
  completions: HabitCompletion[]
) => {
  const daysSinceCreation = Math.floor(
    (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24) + 1
  );

  const successRate = Math.round(
    (completions.length / daysSinceCreation) * 100
  );

  return successRate;
};

export const getCurrentStreak = (
  habitStreak: number,
  completions: HabitCompletion[]
) => {
  let currentStreak = habitStreak;
  if (completions.length > 1) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const lastCompletionDate = completions[completions.length - 2].date;
    if (formatDate(lastCompletionDate) !== formatDate(yesterday)) {
      currentStreak = 0;
    }
  }

  return currentStreak;
};
