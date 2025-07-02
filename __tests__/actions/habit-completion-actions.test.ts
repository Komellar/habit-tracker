import { revalidatePath } from 'next/cache';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { addHabitCompletion } from '@/actions/habit-completion-actions';
import {
  createHabitCompletion,
  getHabitCompletions,
} from '@/db/habit-completion-db';
import { editHabit } from '@/db/habit-db';
import { Prisma } from '@/prisma';

// Mock dependencies
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('@/db/habit-completion-db', () => ({
  createHabitCompletion: vi.fn(),
  getHabitCompletions: vi.fn(),
}));

vi.mock('@/db/habit-db', () => ({
  editHabit: vi.fn(),
}));

describe('actions/habit-completion-actions', () => {
  const habitId = 'test-habit-id';

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(vi.fn());
  });

  describe('addHabitCompletion', () => {
    it('should add a habit completion for the first time', async () => {
      vi.mocked(createHabitCompletion).mockResolvedValue({
        id: '123',
        date: new Date(),
        habitId,
      });
      vi.mocked(getHabitCompletions).mockResolvedValue([
        { id: '1', date: new Date(), habitId },
      ]);

      await addHabitCompletion(habitId, 0, 0, {});

      expect(createHabitCompletion).toHaveBeenCalledWith({
        habitId,
        date: expect.any(Date),
      });

      expect(getHabitCompletions).toHaveBeenCalledWith(habitId);

      expect(editHabit).toHaveBeenCalledWith(habitId, {
        streak: 1,
        bestStreak: { increment: 1 },
      });

      expect(revalidatePath).toHaveBeenCalledWith('/habits');
    });

    it('should increment streak when completed yesterday', async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      vi.mocked(createHabitCompletion).mockResolvedValue({
        id: '123',
        date: today,
        habitId,
      });
      vi.mocked(getHabitCompletions).mockResolvedValue([
        { id: '1', date: yesterday, habitId },
        { id: '2', date: today, habitId },
      ]);

      await addHabitCompletion(habitId, 1, 1, {});

      expect(editHabit).toHaveBeenCalledWith(habitId, {
        streak: { increment: 1 },
        bestStreak: { increment: 1 },
      });
    });

    it('should reset streak when not completed yesterday', async () => {
      const today = new Date();
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      vi.mocked(createHabitCompletion).mockResolvedValue({
        id: '123',
        date: today,
        habitId,
      });
      vi.mocked(getHabitCompletions).mockResolvedValue([
        { id: '1', date: twoDaysAgo, habitId },
        { id: '2', date: today, habitId },
      ]);

      await addHabitCompletion(habitId, 10, 5, {});

      expect(editHabit).toHaveBeenCalledWith(habitId, {
        streak: 1,
        bestStreak: undefined,
      });
    });

    it('should update bestStreak when current streak equals bestStreak and is incremented', async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      vi.mocked(createHabitCompletion).mockResolvedValue({
        id: '123',
        date: today,
        habitId,
      });
      vi.mocked(getHabitCompletions).mockResolvedValue([
        { id: '1', date: yesterday, habitId },
        { id: '2', date: today, habitId },
      ]);

      await addHabitCompletion(habitId, 5, 5, {});

      expect(editHabit).toHaveBeenCalledWith(habitId, {
        streak: { increment: 1 },
        bestStreak: { increment: 1 },
      });
    });

    it('should not update bestStreak when current streak is less than bestStreak', async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      vi.mocked(createHabitCompletion).mockResolvedValue({
        id: '123',
        date: today,
        habitId,
      });
      vi.mocked(getHabitCompletions).mockResolvedValue([
        { id: '1', date: yesterday, habitId },
        { id: '2', date: today, habitId },
      ]);

      await addHabitCompletion(habitId, 10, 3, {});

      expect(editHabit).toHaveBeenCalledWith(habitId, {
        streak: { increment: 1 },
        bestStreak: undefined,
      });
    });

    it('should handle database errors from createHabitCompletion', async () => {
      const dbError = new Prisma.PrismaClientKnownRequestError(
        'Database error',
        { code: 'P2002', clientVersion: '4.0.0' }
      );
      vi.mocked(createHabitCompletion).mockRejectedValue(dbError);

      await expect(addHabitCompletion(habitId, 5, 3, {})).rejects.toThrow(
        'Database error'
      );

      expect(console.error).toHaveBeenCalledWith(
        'Error adding habit completion:',
        expect.any(Error)
      );

      expect(getHabitCompletions).not.toHaveBeenCalled();
    });

    it('should handle database errors from getHabitCompletions', async () => {
      vi.mocked(createHabitCompletion).mockResolvedValue({
        id: '123',
        date: new Date(),
        habitId,
      });

      const dbError = new Prisma.PrismaClientKnownRequestError(
        'Database error',
        { code: 'P2002', clientVersion: '4.0.0' }
      );
      vi.mocked(getHabitCompletions).mockRejectedValue(dbError);

      await expect(addHabitCompletion(habitId, 5, 3, {})).rejects.toThrow(
        'Database error'
      );

      expect(console.error).toHaveBeenCalledWith(
        'Error adding habit completion:',
        expect.any(Error)
      );

      expect(editHabit).not.toHaveBeenCalled();
    });

    it('should handle unexpected errors', async () => {
      const unexpectedError = new Error('Unexpected error');
      vi.mocked(createHabitCompletion).mockRejectedValue(unexpectedError);

      await expect(addHabitCompletion(habitId, 5, 3, {})).rejects.toThrow(
        'An unexpected error occurred while adding the habit completion.'
      );

      expect(console.error).toHaveBeenCalledWith(
        'Error adding habit completion:',
        expect.any(Error)
      );
    });
  });
});
