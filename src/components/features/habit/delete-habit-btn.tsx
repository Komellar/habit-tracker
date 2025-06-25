'use client';

import { useActionState } from 'react';

import { deleteHabit } from '@/actions/habitActions';

interface Props {
  habitId: string;
  redirection?: boolean;
}

export const DeleteHabitButton = ({ habitId, redirection }: Props) => {
  const [, deleteAction, deleteLoading] = useActionState(
    deleteHabit.bind(null, habitId, redirection),
    null
  );

  return (
    <form action={deleteAction} className='flex items-center'>
      {deleteLoading ? (
        <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white'></div>
      ) : (
        <button
          className='p-2 rounded bg-neutral-800 hover:bg-red-700 transition text-neutral-300 hover:text-white'
          title='Delete habit'
          type='submit'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h10'
            />
          </svg>
        </button>
      )}
    </form>
  );
};
