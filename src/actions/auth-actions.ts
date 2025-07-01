'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import prisma from '@/lib/db';
import { signUpSchema } from '@/schemas/auth';
import { generateSalt, hashPassword } from '@/utils/auth/hashPassword';
import { createUserSession } from '@/utils/auth/session';

interface Errors {
  email?: string;
  password?: string;
  name?: string;
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

// export async function signInUser(email: string, password: string) {
//   try {
//     const response = await fetch('/api/auth/signin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to sign in');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error signing in:', error);
//     throw error;
//   }
// }

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
    const errors: Errors = {};
    error.errors.forEach((err) => {
      if (err.path[0] && typeof err.path[0] === 'string') {
        errors[err.path[0] as keyof Errors] = err.message;
      }
    });
    return { errors, fields };
  }

  const { email, password } = data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser !== null) {
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
        errors: { email: 'Failed to create user' },
        fields,
      };
    }

    await createUserSession({ id: user.id, role: user.role }, await cookies());

    console.log(hashedPassword);
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
  redirect('/habits');
}
