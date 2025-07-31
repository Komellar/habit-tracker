import { z } from 'zod';

import { UserRole } from '@/prisma/client';

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty('Email is required')
    .email('Invalid email format')
    .max(255, 'Email must be less than 255 characters'),
  password: z
    .string()
    .trim()
    .nonempty('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be less than 255 characters'),
});

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty('Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .trim()
    .nonempty('Email is required')
    .max(255, 'Email must be less than 255 characters')
    .email('Invalid email format'),
  password: z
    .string()
    .trim()
    .nonempty('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be less than 255 characters'),
});

export const sessionSchema = z.object({
  id: z.string().nonempty('Session ID is required'),
  role: z.enum(Object.values(UserRole) as [string, ...string[]]),
});
