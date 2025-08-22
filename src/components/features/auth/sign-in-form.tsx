'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signInUser } from '@/actions/auth-actions';
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
import { signInSchema } from '@/schemas/auth';

export const SignInForm = () => {
  const [isPending, startTransition] = useTransition();
  const [state, action, isLoading] = useActionState(signInUser, {
    fields: {},
  });

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);

    startTransition(async () => {
      await action(formData);
    });
  }

  return (
    <div className='w-full max-w-md bg-neutral-900 text-white rounded-xl shadow-lg p-6 sm:p-8 border border-neutral-800'>
      <h1 className='text-2xl font-bold text-center text-indigo-400 mb-6'>
        Sign In
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
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email'
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
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
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
              'Sign In'
            )}
          </Button>

          <div className='text-center text-sm text-neutral-400'>
            Don&apos;t have an account?&nbsp;
            <Link
              href='/sign-up'
              className='text-indigo-400 hover:text-indigo-300'
            >
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
