const publicLinks = [
  { href: '/sign-in', label: 'Sign In' },
  { href: '/sign-up', label: 'Sign Up' },
  { href: '/about', label: 'About' },
];

const privateLinks = [
  { href: '/habits', label: 'Habits' },
  { href: '/habits/create', label: 'Create Habit' },
  { href: '/about', label: 'About' },
  { label: 'Sign Out' },
];

export const getNavLinks = (isLoggedIn: boolean) =>
  isLoggedIn ? privateLinks : publicLinks;
