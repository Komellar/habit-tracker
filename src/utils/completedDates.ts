import { Habit, HabitCompletion } from '@/prisma';

import { formatDate } from './dates';

export const getAllCompletedDays = (
  habits: (Habit & { completions: HabitCompletion[] })[]
) => {
  const allCompletedDates: string[][] = [];
  for (const habit of habits) {
    const completedDates = habit.completions.map(({ date }) =>
      formatDate(date)
    );
    allCompletedDates.push(completedDates);
  }

  return allCompletedDates;
};

export const getCompletedToday = (allCompletedDates: string[][]) => {
  const today = formatDate(new Date());
  return allCompletedDates.flat(1).filter((date) => date === today).length;
};
