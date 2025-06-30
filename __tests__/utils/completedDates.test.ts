import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { Habit, HabitCompletion } from '@/prisma';
import {
  getAllCompletedDays,
  getCompletedToday,
} from '@/utils/completed-dates';
import { formatDate } from '@/utils/dates';

describe('utils/completedDates', () => {
  const RealDate = global.Date;

  beforeEach(() => {
    const mockDate = new Date(2023, 4, 15);
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    // Reset modules to clear any cached imports
    vi.resetModules();
  });

  afterEach(() => {
    vi.useRealTimers();
    global.Date = RealDate;
  });

  describe('getAllCompletedDays', () => {
    it('should return an array of arrays containing formatted dates for each habit', async () => {
      const mockHabits = [
        {
          id: '1',
          title: 'Habit 1',
          completions: [
            { id: '1', date: new Date(2023, 4, 10) },
            { id: '2', date: new Date(2023, 4, 11) },
          ],
        },
        {
          id: '2',
          title: 'Habit 2',
          completions: [
            { id: '3', date: new Date(2023, 4, 12) },
            { id: '4', date: new Date(2023, 4, 15) },
          ],
        },
      ] as (Habit & { completions: HabitCompletion[] })[];

      const result = getAllCompletedDays(mockHabits);

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveLength(2);
      expect(result[1]).toHaveLength(2);

      expect(result[0]).toEqual([
        formatDate(new Date(2023, 4, 10)),
        formatDate(new Date(2023, 4, 11)),
      ]);
      expect(result[1]).toEqual([
        formatDate(new Date(2023, 4, 12)),
        formatDate(new Date(2023, 4, 15)),
      ]);
    });

    it('should handle habits with no completions', async () => {
      const mockHabits = [
        {
          id: '1',
          title: 'Habit with completions',
          completions: [{ id: '1', date: new Date(2023, 4, 10) }],
        },
        {
          id: '2',
          title: 'Habit without completions',
          completions: [],
        },
      ] as (Habit & { completions: HabitCompletion[] })[];

      const result = getAllCompletedDays(mockHabits);

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveLength(1);
      expect(result[1]).toHaveLength(0);
    });

    it('should handle empty habits array', async () => {
      const result = getAllCompletedDays([]);

      expect(result).toEqual([]);
    });
  });

  describe('getCompletedToday', () => {
    it('should return the count of completions for today', async () => {
      const today = formatDate(new Date(2023, 4, 15));
      const yesterday = formatDate(new Date(2023, 4, 14));

      const mockCompletedDates = [[today, yesterday], [today], [yesterday]];

      const result = getCompletedToday(mockCompletedDates);

      expect(result).toBe(2);
    });

    it('should return 0 when no habits are completed today', async () => {
      const yesterday = formatDate(new Date(2023, 4, 14));
      const twoDaysAgo = formatDate(new Date(2023, 4, 13));

      const mockCompletedDates = [[yesterday, twoDaysAgo], [yesterday]];

      const result = getCompletedToday(mockCompletedDates);

      expect(result).toBe(0);
    });

    it('should handle empty arrays', async () => {
      expect(getCompletedToday([])).toBe(0);
      expect(getCompletedToday([[], []])).toBe(0);
    });
  });
});
