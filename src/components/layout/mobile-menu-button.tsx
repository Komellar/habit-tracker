'use client';

import Link from 'next/link';
import { useState } from 'react';

export function MobileMenuButton() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='md:hidden'>
      <button
        className='text-neutral-200 hover:text-white transition-colors focus:outline-none'
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-expanded={mobileMenuOpen}
        aria-label='Toggle navigation menu'
      >
        {mobileMenuOpen ? (
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        ) : (
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        )}
      </button>

      {mobileMenuOpen && (
        <div className='md:hidden absolute left-0 right-0 top-[72px] bg-neutral-800 border-b border-neutral-700 shadow-lg animate-fadeIn'>
          <div className='flex flex-col p-4 space-y-3'>
            <Link
              href='/habits'
              className='text-neutral-200 hover:text-white transition-colors py-2 px-4 rounded-md hover:bg-neutral-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              My Habits
            </Link>
            <Link
              href='/habits/create'
              className='text-neutral-200 hover:text-white transition-colors py-2 px-4 rounded-md hover:bg-neutral-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Habit
            </Link>
            <Link
              href='/about'
              className='text-neutral-200 hover:text-white transition-colors py-2 px-4 rounded-md hover:bg-neutral-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
