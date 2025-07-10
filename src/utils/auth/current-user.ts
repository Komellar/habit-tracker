import { cookies } from 'next/headers';
import { cache } from 'react';

import prisma from '@/lib/db';

import { getUserFromSession } from './session/session';

type FullUser = Exclude<Awaited<ReturnType<typeof getUserFromDb>>, undefined>;

type User = Exclude<Awaited<ReturnType<typeof getUserFromSession>>, undefined>;

function _getCurrentUser(options: {
  withFullUser: true;
}): Promise<FullUser | null>;
function _getCurrentUser(options?: {
  withFullUser?: false;
}): Promise<User | null>;
async function _getCurrentUser({ withFullUser = false } = {}) {
  const user = await getUserFromSession(await cookies());

  if (user == null) {
    return null;
  }

  if (withFullUser) {
    const fullUser = await getUserFromDb(user.id);
    if (fullUser == null) throw new Error('User not found in database');
    return fullUser;
  }

  return user;
}

export const getCurrentUser = cache(_getCurrentUser);

function getUserFromDb(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
    },
  });
}
