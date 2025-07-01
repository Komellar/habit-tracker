import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { HabitCompletion } from '@/prisma';
import { getCurrentStreak, getSuccessRate } from '@/utils/habit-details/stats';

describe('utils/habit-details/stats', () => {
  const RealDate = global.Date;

  beforeEach(() => {
    const mockDate = new Date(2023, 4, 15);
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    vi.resetModules();
  });

  afterEach(() => {
    vi.useRealTimers();
    global.Date = RealDate;
  });

  describe('utils/habitDetails/getSuccessRate', () => {
    it('should calculate correct success rate for habits', async () => {
      const createdAt = new Date(2023, 4, 5);
      const completions = Array(5)
        .fill(null)
        .map((_, i) => ({
          id: `${i}`,
          date: new Date(2023, 4, 10 + i),
        })) as HabitCompletion[];

      const result = getSuccessRate(createdAt, completions);

      expect(result).toBe(45); // (5/11) * 100 = 45.45... = 45%
    });

    it('should handle 100% success rate', async () => {
      const createdAt = new Date(2023, 4, 15);
      const completions = [
        {
          id: '1',
          date: new Date(2023, 4, 15),
        },
      ] as HabitCompletion[];

      const result = getSuccessRate(createdAt, completions);

      expect(result).toBe(100); // 1/1 = 100%
    });

    it('should handle 0% success rate', async () => {
      const createdAt = new Date(2023, 4, 10);
      const completions = [] as HabitCompletion[];

      const result = getSuccessRate(createdAt, completions);

      expect(result).toBe(0);
    });
  });

  describe('getCurrentStreak', () => {
    it('should return the habit streak when yesterday was completed', async () => {
      const completions = [
        { id: '1', date: new Date(2023, 4, 13) },
        { id: '2', date: new Date(2023, 4, 14) },
      ] as HabitCompletion[];

      const habitStreak = 2;

      const result = getCurrentStreak(habitStreak, completions);

      expect(result).toBe(2);
    });

    it('should return 0 when yesterday was not completed', async () => {
      const completions = [
        { id: '1', date: new Date(2023, 4, 12) },
        { id: '2', date: new Date(2023, 4, 13) },
      ] as HabitCompletion[];

      const habitStreak = 10;

      const result = getCurrentStreak(habitStreak, completions);

      expect(result).toBe(0);
    });

    it('should return the habit streak when there is only one completion and it was yesterday', async () => {
      const completions = [
        { id: '1', date: new Date(2023, 4, 14) },
      ] as HabitCompletion[];

      const habitStreak = 1;

      const result = getCurrentStreak(habitStreak, completions);

      expect(result).toBe(1);
    });

    it('should handle empty completions array', async () => {
      const completions = [] as HabitCompletion[];
      const habitStreak = 0;

      const result = getCurrentStreak(habitStreak, completions);

      expect(result).toBe(0);
    });

    it('should check if either of the last two completions was yesterday', async () => {
      const completions = [
        { id: '1', date: new Date(2023, 4, 10) },
        { id: '2', date: new Date(2023, 4, 12) },
        { id: '3', date: new Date(2023, 4, 14) },
      ] as HabitCompletion[];

      const habitStreak = 1;

      const result = getCurrentStreak(habitStreak, completions);

      expect(result).toBe(1);
    });
  });
});
