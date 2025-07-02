'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import prisma from '@/lib/db';
import { signInSchema, signUpSchema } from '@/schemas/auth';
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from '@/utils/auth/hash-password';
import { createUserSession, removeUserFromSession } from '@/utils/auth/session';
import { handleZodErrors } from '@/utils/formHelpers';

interface Errors {
  email?: string;
  password?: string;
  name?: string;
  global?: string;
}

interface Fields {
  email?: string;
  password?: string;
  name?: string;
}

interface FormState {
  fields: Fields;
  errors?: Errors;
}

export async function signInUser(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!(formData instanceof FormData)) {
    throw new Error('Invalid form data');
  }

  const fields = Object.fromEntries(formData.entries());
  const { data, success, error } = signInSchema.safeParse(fields);

  if (!success) {
    return handleZodErrors(error, fields);
  }

  const { email, password } = data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user == null) {
      return {
        errors: { global: 'Unable to log in' },
        fields,
      };
    }

    const isCorrectPassword = await comparePasswords({
      password,
      hashedPassword: user.password,
      salt: user.salt,
    });

    if (!isCorrectPassword) {
      return {
        errors: { global: 'Incorrect email or password' },
        fields,
      };
    }

    await createUserSession({ id: user.id, role: user.role }, await cookies());
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
  redirect('/habits');
}

export async function signUpUser(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!(formData instanceof FormData)) {
    throw new Error('Invalid form data');
  }

  const fields = Object.fromEntries(formData.entries());

  const { data, success, error } = signUpSchema.safeParse(fields);

  if (!success) {
    return handleZodErrors(error, fields);
  }

  const { email, password } = data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser != null) {
      return {
        errors: { email: 'Email already exists' },
        fields,
      };
    }

    const salt = generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        salt,
        name: data.name,
      },
    });

    if (!user) {
      return {
        errors: { global: 'Failed to create user' },
        fields,
      };
    }

    await createUserSession({ id: user.id, role: user.role }, await cookies());
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
  redirect('/habits');
}

export async function signOutUser() {
  try {
    await removeUserFromSession(await cookies());
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
  redirect('/sign-in');
}
