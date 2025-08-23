'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signUpUser } from '@/actions/auth-actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUpSchema } from '@/schemas/auth';

export const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const [state, action, isLoading] = useActionState(signUpUser, {
    fields: {},
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(async () => {
      await action(formData);
    });
  }

  useEffect(() => {
    if (state?.errors) {
      Object.entries(state.errors).forEach(([field, message]) => {
        if (field !== 'global' && message) {
          form.setError(field as keyof z.infer<typeof signUpSchema>, {
            message,
          });
        }
      });
    }
  }, [state, form]);

  return (
    <div className='w-full max-w-md bg-neutral-900 text-white rounded-xl shadow-lg p-6 sm:p-8 border border-neutral-800'>
      <h1 className='text-2xl font-bold text-center text-indigo-400 mb-6'>
        Create Account
      </h1>

      {state?.errors?.global && (
        <div className='bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-md mb-6'>
          {state.errors.global}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='John Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='email@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='••••••••' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='w-full p-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded'
            disabled={isLoading || isPending}
          >
            {isLoading || isPending ? (
              <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mx-auto'></div>
            ) : (
              'Sign Up'
            )}
          </Button>

          <div className='text-center text-sm text-neutral-400'>
            Already have an account?&nbsp;
            <Link
              href='/sign-in'
              className='text-indigo-400 hover:text-indigo-300'
            >
              Sign in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
