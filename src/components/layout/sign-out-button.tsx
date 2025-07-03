'use client';

import { useActionState } from 'react';

import { signOutUser } from '@/actions/auth-actions';

import { Button } from '../ui/button';

export const SignOutButton = () => {
  const [, action, isLoading] = useActionState(signOutUser, null);

  return (
    <form action={action}>
      <Button
        className='bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2'
        disabled={isLoading}
      >
        {isLoading ? (
          <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-1'></div>
        ) : (
          <p>Sign Out</p>
        )}
      </Button>
    </form>
  );
};
