'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import { signInUser } from '@/actions/auth-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const SignInForm = () => {
  const [state, action, isLoading] = useActionState(signInUser, {
    fields: {},
  });

  return (
    <div className='w-full max-w-md bg-neutral-900 text-white rounded-xl shadow-lg p-6 sm:p-8 border border-neutral-800'>
      <h1 className='text-2xl font-bold text-center text-indigo-400 mb-6'>
        Sign In
      </h1>

      {state?.errors?.global && (
        <div className='bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-md mb-6'>
          {state?.errors.global}
        </div>
      )}

      <form action={action} className='space-y-5'>
        <div className='space-y-2'>
          <Label htmlFor='email' className='font-medium text-neutral-200'>
            Email
          </Label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='your.email@example.com'
            className='w-full bg-neutral-800 text-white border border-neutral-700 placeholder-neutral-500'
            defaultValue={state?.fields?.email || ''}
            required
          />
          {state?.errors?.email && (
            <p className='text-sm text-red-400 text-left'>
              {state.errors.email}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password' className='font-medium text-neutral-200'>
            Password
          </Label>
          <Input
            id='password'
            name='password'
            type='password'
            placeholder='••••••••'
            required
            className='w-full bg-neutral-800 text-white border border-neutral-700 placeholder-neutral-500'
            defaultValue={state?.fields?.password || ''}
          />
          {state?.errors?.password && (
            <p className='text-sm text-red-400 text-left'>
              {state.errors.password}
            </p>
          )}
        </div>

        <Button
          type='submit'
          className='w-full p-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded'
          disabled={isLoading}
        >
          {isLoading ? (
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
    </div>
  );
};
