'use server';

import { addHabit } from '@/db/habit';
import { createHabitSchema } from '@/models/habit';

import { Prisma } from '../../generated/prisma';

interface Errors {
  title?: string;
  description?: string;
  goal?: string;
}

interface Fields {
  title?: string;
  description?: string;
  goal?: number;
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

    const data = {
      title: title.length ? title : undefined,
      description: description.length ? description : undefined,
      goal: goal ? Number(goal) : undefined,
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

    console.log('GIT JEST GITEM');
    return { fields: {} };
  } catch (error) {
    console.log('kurdebele!!!!!!!');
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Database error: ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while creating the habit.');
    }
  }
}
