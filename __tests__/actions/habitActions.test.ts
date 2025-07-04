import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ZodError } from 'zod';

import { createHabit, deleteHabit, updateHabit } from '@/actions/habit-actions';
import { removeHabitCompletions } from '@/data-access/habit-completion-db';
import { addHabit, editHabit, removeHabit } from '@/data-access/habit-db';
import { Prisma } from '@/prisma';
import { createUpdateHabitSchema } from '@/schemas/habit';
import { ColorKey } from '@/utils/colors';

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
  RedirectType: {
    replace: 'replace',
  },
}));

vi.mock('@/data-access/habit-db', () => ({
  addHabit: vi.fn(),
  editHabit: vi.fn(),
  removeHabit: vi.fn(),
}));

vi.mock('@/data-access/habit-completion-db', () => ({
  removeHabitCompletions: vi.fn(),
}));

vi.mock('@/schemas/habit', () => ({
  createUpdateHabitSchema: {
    safeParse: vi.fn(),
  },
}));

vi.mock('@/utils/auth/current-user', () => ({
  getCurrentUser: () => ({
    id: 'test-user-id',
    role: 'user',
  }),
}));

describe('actions/habit-actions', () => {
  let mockFormData: FormData;

  beforeEach(() => {
    vi.clearAllMocks();

    mockFormData = new FormData();

    vi.spyOn(console, 'error').mockImplementation(vi.fn());
  });

  describe('createHabit', () => {
    it('should create a habit with valid data and redirect', async () => {
      mockFormData.append('title', 'Test Habit');
      mockFormData.append('description', 'Test Description');
      mockFormData.append('goal', '5');
      mockFormData.append('color', 'blue');

      const validatedData = {
        title: 'Test Habit',
        description: 'Test Description',
        goal: 5,
        color: 'blue' as ColorKey,
      };

      vi.mocked(createUpdateHabitSchema.safeParse).mockReturnValue({
        success: true,
        data: validatedData,
      });

      await createHabit(
        {
          fields: {},
        },
        mockFormData
      );

      expect(createUpdateHabitSchema.safeParse).toHaveBeenCalledWith({
        title: 'Test Habit',
        description: 'Test Description',
        goal: 5,
        color: 'blue',
      });

      expect(addHabit).toHaveBeenCalledWith({
        ...validatedData,
        userId: 'test-user-id',
      });

      expect(revalidatePath).toHaveBeenCalledWith('/habits');
      expect(redirect).toHaveBeenCalledWith('/habits');
    });

    it('should handle empty fields correctly', async () => {
      mockFormData.append('title', 'Test Habit');
      mockFormData.append('description', '');
      mockFormData.append('color', 'red');

      const validatedData = {
        title: 'Test Habit',
        color: 'red' as ColorKey,
      };

      vi.mocked(createUpdateHabitSchema.safeParse).mockReturnValue({
        success: true,
        data: validatedData,
      });

      await createHabit({ fields: {} }, mockFormData);

      expect(createUpdateHabitSchema.safeParse).toHaveBeenCalledWith({
        title: 'Test Habit',
        description: undefined,
        goal: undefined,
        color: 'red',
      });
    });

    it('should return validation errors when data is invalid', async () => {
      mockFormData.append('title', ''); // Empty title (invalid)
      mockFormData.append('color', 'invalid-color'); // Invalid color
      mockFormData.append('description', '');

      const zodError = new ZodError([
        {
          path: ['title'],
          message: 'Title is required',
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
        },
        {
          path: ['color'],
          message: 'Invalid color',
          code: 'invalid_enum_value',
          options: ['red', 'blue', 'green', 'purple'],
          received: 'invalid-color',
        },
      ]);

      vi.mocked(createUpdateHabitSchema.safeParse).mockReturnValue({
        success: false,
        error: zodError,
      });

      const result = await createHabit({ fields: {} }, mockFormData);

      expect(result).toEqual({
        errors: {
          title: 'Title is required',
          color: 'Invalid color',
        },
        fields: {
          title: undefined,
          description: undefined,
          goal: undefined,
          color: 'invalid-color',
        },
      });

      expect(addHabit).not.toHaveBeenCalled();

      expect(redirect).not.toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      mockFormData.append('title', 'Test Habit');
      mockFormData.append('color', 'blue');
      mockFormData.append('description', '');

      vi.mocked(createUpdateHabitSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          title: 'Test Habit',
          color: 'blue',
        },
      });

      const dbError = new Prisma.PrismaClientKnownRequestError(
        'Database error',
        { code: 'P2002', clientVersion: '4.0.0' }
      );
      vi.mocked(addHabit).mockRejectedValue(dbError);

      await expect(createHabit({ fields: {} }, mockFormData)).rejects.toThrow(
        'Database error'
      );

      expect(console.error).toHaveBeenCalledWith(
        'Error creating habit:',
        expect.any(Error)
      );
    });

    it('should handle unexpected errors', async () => {
      mockFormData.append('title', 'Test Habit');
      mockFormData.append('color', 'blue');

      vi.mocked(createUpdateHabitSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          title: 'Test Habit',
          color: 'blue',
        },
      });

      const unexpectedError = new Error('Unexpected error');
      vi.mocked(addHabit).mockRejectedValue(unexpectedError);

      await expect(createHabit({ fields: {} }, mockFormData)).rejects.toThrow(
        'An unexpected error occurred while creating the habit.'
      );

      expect(console.error).toHaveBeenCalledWith(
        'Error creating habit:',
        expect.any(Error)
      );
    });
  });

  describe('updateHabit', () => {
    const habitId = 'test-habit-id';

    it('should update a habit with valid data and redirect', async () => {
      mockFormData.append('title', 'Updated Habit');
      mockFormData.append('description', 'Updated Description');
      mockFormData.append('goal', '10');
      mockFormData.append('color', 'green');

      const validatedData = {
        title: 'Updated Habit',
        description: 'Updated Description',
        goal: 10,
        color: 'green' as ColorKey,
      };

      vi.mocked(createUpdateHabitSchema.safeParse).mockReturnValue({
        success: true,
        data: validatedData,
      });

      await updateHabit(habitId, { fields: {} }, mockFormData);

      expect(createUpdateHabitSchema.safeParse).toHaveBeenCalledWith({
        title: 'Updated Habit',
        description: 'Updated Description',
        goal: 10,
        color: 'green',
      });

      expect(editHabit).toHaveBeenCalledWith(habitId, validatedData);

      expect(revalidatePath).toHaveBeenCalledWith('/habits');
      expect(redirect).toHaveBeenCalledWith(`/habits/${habitId}`, 'replace');
    });

    it('should handle empty fields correctly', async () => {
      mockFormData.append('title', 'Updated Habit');
      mockFormData.append('description', '');
      mockFormData.append('color', 'purple');

      const validatedData = {
        title: 'Updated Habit',
        color: 'purple' as ColorKey,
      };

      vi.mocked(createUpdateHabitSchema.safeParse).mockReturnValue({
        success: true,
        data: validatedData,
      });

      await updateHabit(habitId, { fields: {} }, mockFormData);

      expect(createUpdateHabitSchema.safeParse).toHaveBeenCalledWith({
        title: 'Updated Habit',
        description: undefined,
        goal: undefined,
        color: 'purple',
      });

      expect(editHabit).toHaveBeenCalledWith(habitId, validatedData);
    });

    it('should return validation errors when data is invalid', async () => {
      mockFormData.append('title', ''); // Empty title (invalid)
      mockFormData.append('color', 'invalid-color'); // Invalid color
      mockFormData.append('description', 'Some description');

      const zodError = new ZodError([
        {
          path: ['title'],
          message: 'Title is required',
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
        },
        {
          path: ['color'],
          message: 'Invalid color',
          code: 'invalid_enum_value',
          options: ['red', 'blue', 'green', 'purple'],
          received: 'invalid-color',
        },
      ]);

      vi.mocked(createUpdateHabitSchema.safeParse).mockReturnValue({
        success: false,
        error: zodError,
      });

      const result = await updateHabit(habitId, { fields: {} }, mockFormData);

      expect(result).toEqual({
        errors: {
          title: 'Title is required',
          color: 'Invalid color',
        },
        fields: {
          title: undefined,
          description: 'Some description',
          goal: undefined,
          color: 'invalid-color',
        },
      });

      expect(editHabit).not.toHaveBeenCalled();
      expect(redirect).not.toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      mockFormData.append('title', 'Updated Habit');
      mockFormData.append('color', 'blue');
      mockFormData.append('description', 'test');

      vi.mocked(createUpdateHabitSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          title: 'Updated Habit',
          color: 'blue',
          description: 'test',
        },
      });

      const dbError = new Prisma.PrismaClientKnownRequestError(
        'Database error',
        { code: 'P2002', clientVersion: '4.0.0' }
      );
      vi.mocked(editHabit).mockRejectedValue(dbError);

      await expect(
        updateHabit(habitId, { fields: {} }, mockFormData)
      ).rejects.toThrow('Database error');

      expect(console.error).toHaveBeenCalledWith(
        'Error updating habit:',
        expect.any(Error)
      );
    });

    it('should handle unexpected errors', async () => {
      mockFormData.append('title', 'Updated Habit');
      mockFormData.append('color', 'blue');

      vi.mocked(createUpdateHabitSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          title: 'Updated Habit',
          color: 'blue',
        },
      });

      const unexpectedError = new Error('Unexpected error');
      vi.mocked(editHabit).mockRejectedValue(unexpectedError);

      await expect(
        updateHabit(habitId, { fields: {} }, mockFormData)
      ).rejects.toThrow(
        'An unexpected error occurred while updating the habit.'
      );

      expect(console.error).toHaveBeenCalledWith(
        'Error updating habit:',
        expect.any(Error)
      );
    });
  });

  describe('deleteHabit', () => {
    const habitId = 'test-habit-id';

    it('should delete a habit successfully without redirection', async () => {
      await deleteHabit(habitId, false, {});

      expect(removeHabit).toHaveBeenCalledWith(habitId);
      expect(removeHabitCompletions).toHaveBeenCalledWith(habitId);

      expect(revalidatePath).toHaveBeenCalledWith('/habits');

      expect(redirect).not.toHaveBeenCalled();
    });

    it('should delete a habit and redirect when withRedirection is true', async () => {
      await deleteHabit(habitId, true, {});

      expect(removeHabit).toHaveBeenCalledWith(habitId);
      expect(removeHabitCompletions).toHaveBeenCalledWith(habitId);

      expect(revalidatePath).toHaveBeenCalledWith('/habits');

      expect(redirect).toHaveBeenCalledWith('/habits', 'replace');
    });

    it('should handle database errors from removeHabit', async () => {
      const dbError = new Prisma.PrismaClientKnownRequestError(
        'Database error',
        { code: 'P2002', clientVersion: '4.0.0' }
      );
      vi.mocked(removeHabit).mockRejectedValue(dbError);

      await expect(deleteHabit(habitId, false, {})).rejects.toThrow(
        'Database error'
      );

      expect(console.error).toHaveBeenCalledWith(
        'Error removing habit:',
        expect.any(Error)
      );

      expect(removeHabitCompletions).not.toHaveBeenCalled();
    });

    it('should handle database errors from removeHabitCompletions', async () => {
      const dbError = new Prisma.PrismaClientKnownRequestError(
        'Database error',
        { code: 'P2002', clientVersion: '4.0.0' }
      );
      vi.mocked(removeHabitCompletions).mockRejectedValue(dbError);

      await expect(deleteHabit(habitId, false, {})).rejects.toThrow(
        'Database error'
      );

      expect(console.error).toHaveBeenCalledWith(
        'Error removing habit:',
        expect.any(Error)
      );

      expect(removeHabit).toHaveBeenCalledWith(habitId);
    });

    it('should handle unexpected errors', async () => {
      const unexpectedError = new Error('Unexpected error');
      vi.mocked(removeHabit).mockRejectedValue(unexpectedError);

      await expect(deleteHabit(habitId, false, {})).rejects.toThrow(
        'An unexpected error occurred while removing the habit.'
      );

      expect(console.error).toHaveBeenCalledWith(
        'Error removing habit:',
        expect.any(Error)
      );
    });

    it('should always redirect when withRedirection is true, even after errors', async () => {
      const error = new Error('Test error');
      vi.mocked(removeHabit).mockRejectedValue(error);

      await expect(deleteHabit(habitId, true, {})).rejects.toThrow();

      expect(redirect).toHaveBeenCalledWith('/habits', 'replace');
    });
  });
});
