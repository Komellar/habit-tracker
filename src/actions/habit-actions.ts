'use server';

import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';

import { removeHabitCompletions } from '@/db/habit-completion-db';
import { addHabit, editHabit, removeHabit } from '@/db/habit-db';
import { createUpdateHabitSchema } from '@/schemas/habit';
import { getCurrentUser } from '@/utils/auth/current-user';
import { ColorKey } from '@/utils/colors';
import { trimValue } from '@/utils/common';
import { handleZodErrors } from '@/utils/formHelpers';

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
  _prevState: FormState,
  formData: unknown
): Promise<FormState> {
  if (!(formData instanceof FormData)) {
    throw new Error('Invalid form data');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string | null;
  const goal = formData.get('goal') as string | null;
  const color = formData.get('color') as string;

  const fields = {
    title: title ? trimValue(title) || undefined : undefined,
    description: description ? trimValue(description) || undefined : undefined,
    goal: goal ? Number(goal) : undefined,
    color: color as ColorKey,
  };

  const { data, success, error } = createUpdateHabitSchema.safeParse(fields);

  if (!success) {
    return handleZodErrors(error, fields);
  }

  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    await addHabit({ ...data, userId: user.id });
    revalidatePath('/habits');
  } catch (error) {
    console.error('Error creating habit:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Database error: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred while creating the habit.');
    }
  }
  redirect('/habits');
}

export async function updateHabit(
  habitId: string,
  _prevState: FormState,
  formData: unknown
): Promise<FormState> {
  if (!(formData instanceof FormData)) {
    throw new Error('Invalid form data');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string | null;
  const goal = formData.get('goal') as string | null;
  const color = formData.get('color') as string;

  const fields = {
    title: title ? trimValue(title) || undefined : undefined,
    description: description ? trimValue(description) || undefined : undefined,
    goal: goal ? Number(goal) : undefined,
    color: color as ColorKey,
  };

  const { success, error, data } = createUpdateHabitSchema.safeParse(fields);

  if (!success) {
    return handleZodErrors(error, fields);
  }

  try {
    await editHabit(habitId, data);
    revalidatePath('/habits');
  } catch (error) {
    console.error('Error updating habit:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Database error: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred while updating the habit.');
    }
  }
  redirect(`/habits/${habitId}`, RedirectType.replace);
}

export async function deleteHabit(
  habitId: string,
  withRedirection = false,
  _prevState: unknown
) {
  try {
    await removeHabit(habitId);
    await removeHabitCompletions(habitId);
    revalidatePath('/habits');
  } catch (error) {
    console.error('Error removing habit:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Database error: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred while removing the habit.');
    }
  } finally {
    if (withRedirection) {
      redirect('/habits', RedirectType.replace);
    }
  }
}
