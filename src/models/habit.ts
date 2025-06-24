import { z } from 'zod';

import { COLOR_KEYS } from '@/utils/colors';

export const createUpdateHabitSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  goal: z.number().int().positive().optional(),
  color: z.enum(COLOR_KEYS),
});
