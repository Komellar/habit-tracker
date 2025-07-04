'use client';

import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

interface Props {
  search?: string;
  limit?: number;
}

export const SearchInput = ({ search, limit }: Props) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    if (limit) {
      router.push(`/habits?limit=${limit}&page=1`);
    } else {
      router.push('/habits');
    }
  };

  return (
    <Form action='/habits' className='flex-1 max-w-md'>
      <div className='relative flex-1'>
        {/* Hidden input to preserve limit parameter */}
        {limit && <input type='hidden' name='limit' value={limit} />}

        <input
          name='search'
          ref={inputRef}
          className='w-full px-4 py-2 pl-10 pr-12 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition-colors'
          placeholder='Search habits'
          defaultValue={search || ''}
        />
        <svg
          className='absolute left-3 top-2.5 h-5 w-5 text-neutral-400'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>

        {search && (
          <button
            type='button'
            onClick={handleClear}
            className='absolute right-12 top-2 p-1 rounded-md hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors'
            aria-label='Clear search'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}

        <button
          type='submit'
          className='absolute right-2 top-1.5 p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white transition-colors'
          aria-label='Search'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='h-4 w-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
      </div>
    </Form>
  );
};
