const publicLinks = [
  { href: '/about', label: 'About' },
  { href: '/sign-in', label: 'Sign In' },
];

const privateLinks = [
  { href: '/habits', label: 'Habits' },
  { href: '/habits/create', label: 'Create Habit' },
  { href: '/about', label: 'About' },
  { label: 'Sign Out' },
];

export const getNavLinks = (isLoggedIn: boolean) =>
  isLoggedIn ? privateLinks : publicLinks;
