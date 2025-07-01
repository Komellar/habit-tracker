'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Here you would implement your authentication logic
    // For now, we'll just simulate a loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className='w-full max-w-md bg-neutral-900 text-white rounded-xl shadow-lg p-6 sm:p-8 border border-neutral-800'>
      <h1 className='text-2xl font-bold text-center text-indigo-400 mb-6'>
        Sign In
      </h1>

      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='space-y-2'>
          <Label htmlFor='email' className='font-medium text-neutral-200'>
            Email
          </Label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='your.email@example.com'
            required
            className='w-full bg-neutral-800 text-white border border-neutral-700 placeholder-neutral-500'
          />
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='password' className='font-medium text-neutral-200'>
              Password
            </Label>
            <Link
              href='/forgot-password'
              className='text-sm text-indigo-400 hover:text-indigo-300'
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id='password'
            name='password'
            type='password'
            placeholder='••••••••'
            required
            className='w-full bg-neutral-800 text-white border border-neutral-700 placeholder-neutral-500'
          />
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
          Don&apos;t have an account?{' '}
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
