import Link from 'next/link';

import { MobileMenuButton } from './mobile-menu-button';

export function Navbar() {
  return (
    <nav className='bg-neutral-900 border-b border-neutral-800 py-4 px-6 sticky top-0 z-50 h-[65px]'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <Link href='/' className='flex items-center space-x-2'>
          <div className='bg-indigo-900/30 p-1 rounded-full'>
            <svg
              className='w-6 h-6 text-indigo-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
              />
            </svg>
          </div>
          <span className='text-xl font-bold text-white'>Habit Tracker</span>
        </Link>

        <div className='hidden md:flex items-center space-x-6'>
          <Link
            href='/sign-in'
            className='text-neutral-200 hover:text-white transition-colors'
          >
            Sign in
          </Link>
          <Link
            href='/sign-up'
            className='text-neutral-200 hover:text-white transition-colors'
          >
            Sign up
          </Link>
          <Link
            href='/habits'
            className='text-neutral-200 hover:text-white transition-colors'
          >
            My Habits
          </Link>
          <Link
            href='/habits/create'
            className='text-neutral-200 hover:text-white transition-colors'
          >
            Create Habit
          </Link>
          <Link
            href='/about'
            className='text-neutral-200 hover:text-white transition-colors'
          >
            About
          </Link>
        </div>

        <MobileMenuButton />
      </div>
    </nav>
  );
}
