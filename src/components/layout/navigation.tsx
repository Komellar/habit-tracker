import Link from 'next/link';

import { getCurrentUser } from '@/utils/auth/current-user';
import { getNavLinks } from '@/utils/nav-links';

import { MobileMenuButton } from './mobile-menu-button';
import { SignOutButton } from './sign-out-button';

export async function Navbar() {
  const user = await getCurrentUser({ withFullUser: true });
  const isLoggedIn = !!user;

  const links = getNavLinks(isLoggedIn);

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
          {links.map((link) => {
            if (link.label === 'Sign Out') {
              return <SignOutButton key='sign-out' />;
            }

            return (
              <Link
                href={link.href || '#'}
                className='text-neutral-200 hover:text-white transition-colors'
                key={link.label}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <MobileMenuButton links={links} />
      </div>
    </nav>
  );
}
