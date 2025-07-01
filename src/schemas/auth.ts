import { z } from 'zod';

import { UserRole } from '@/prisma/client';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email(),
  password: z.string().min(4),
});

export const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(Object.values(UserRole) as [string, ...string[]]),
});
