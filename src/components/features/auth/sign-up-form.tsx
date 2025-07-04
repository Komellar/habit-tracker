'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import { signUpUser } from '@/actions/auth-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const SignUpForm = () => {
  const [state, action, isLoading] = useActionState(signUpUser, {
    fields: {},
  });

  return (
    <div className='w-full max-w-md bg-neutral-900 text-white rounded-xl shadow-lg p-6 sm:p-8 border border-neutral-800'>
      <h1 className='text-2xl font-bold text-center text-indigo-400 mb-6'>
        Create Account
      </h1>

      {state?.errors?.global && (
        <div className='bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-md mb-6'>
          {state?.errors.global}
        </div>
      )}

      <form action={action} className='space-y-5'>
        <div className='space-y-2'>
          <Label htmlFor='name' className='font-medium text-neutral-200'>
            Full Name
          </Label>
          <Input
            id='name'
            name='name'
            type='text'
            placeholder='John Doe'
            required
            className='w-full bg-neutral-800 text-white border border-neutral-700 placeholder-neutral-500'
            disabled={isLoading}
            defaultValue={state?.fields?.name || ''}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email' className='font-medium text-neutral-200'>
            Email
          </Label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='email@example.com'
            required
            className='w-full bg-neutral-800 text-white border border-neutral-700 placeholder-neutral-500'
            disabled={isLoading}
            defaultValue={state?.fields?.email || ''}
          />
          {state?.errors?.email && (
            <p className='text-sm text-red-400'>{state.errors.email}</p>
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
            minLength={8}
            className='w-full bg-neutral-800 text-white border border-neutral-700 placeholder-neutral-500'
            disabled={isLoading}
            defaultValue={state?.fields?.password || ''}
          />
          {state?.errors?.password && (
            <p className='text-sm text-red-400'>{state.errors.password}</p>
          )}
        </div>

        <Button
          type='submit'
          className='w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md transition-colors'
          disabled={isLoading}
        >
          {isLoading ? (
            <div className='flex items-center justify-center'>
              <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2'></div>
              Creating account...
            </div>
          ) : (
            'Sign Up'
          )}
        </Button>

        <div className='text-center text-neutral-400 text-sm mt-6'>
          Already have an account?&nbsp;
          <Link
            href='/sign-in'
            className='text-indigo-400 hover:text-indigo-300'
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};
