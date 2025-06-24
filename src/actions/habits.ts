'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { addHabit, createHabitCompletion, removeHabit } from '@/db/habit';
import { createHabitSchema } from '@/models/habit';
import { ColorKey } from '@/utils/colors';

import { Prisma } from '../../generated/prisma';

interface Errors {
  title?: string;
  description?: string;
  goal?: string;
  color?: string;
}

interface Fields {
  title?: string;
  description?: string;
  goal?: number;
  color?: ColorKey;
}

interface FormState {
  fields: Fields;
  errors?: Errors;
}

export async function createHabit(
  _prevState: unknown,
  formData: FormData
): Promise<FormState> {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const goal = formData.get('goal') as string | null;
    const color = formData.get('color') as string;

    const data = {
      title: title.length ? title : undefined,
      description: description.length ? description : undefined,
      goal: goal ? Number(goal) : undefined,
      color: color as ColorKey,
    };

    const result = createHabitSchema.safeParse(data);

    if (!result.success) {
      const errors: Errors = {};

      result.error.errors.forEach((err) => {
        if (err.path[0] && typeof err.path[0] === 'string') {
          errors[err.path[0] as keyof Errors] = err.message;
        }
      });
      return { errors, fields: data };
    }

    await addHabit(result.data);
  } catch (error) {
    console.log('Error creating habit:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Database error: ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while creating the habit.');
    }
  } finally {
    revalidatePath('/habits');
    redirect('/habits');
  }
}

export async function deleteHabit(_prevState: unknown, habitId: string) {
  try {
    await removeHabit(habitId);
    revalidatePath('/habits');
  } catch (error) {
    console.error('Error removing habit:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Database error: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred while removing the habit.');
    }
  }
}

export async function addHabitCompletion(_prevState: unknown, habitId: string) {
  try {
    await createHabitCompletion(habitId, new Date());
    revalidatePath(`/habits`);
  } catch (error) {
    console.error('Error adding habit completion:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Database error: ${error.message}`);
    } else {
      throw new Error(
        'An unexpected error occurred while adding the habit completion.'
      );
    }
  }
}
