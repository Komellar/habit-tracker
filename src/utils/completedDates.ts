import { Habit, HabitCompletion } from '@/prisma';

export const getAllCompletedDays = (
  habits: (Habit & { completions: HabitCompletion[] })[]
) => {
  const allCompletedDates: string[][] = [];
  for (const habit of habits) {
    const completedDates = habit.completions.map((completion) =>
      completion.date.toISOString().slice(0, 10)
    );
    allCompletedDates.push(completedDates);
  }

  return allCompletedDates;
};

export const getCompletedToday = (allCompletedDates: string[][]) => {
  const today = new Date().toISOString().slice(0, 10);
  return allCompletedDates.flat(1).filter((date) => date === today).length;
};
