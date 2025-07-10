import crypto from 'crypto';

import { z } from 'zod';

import { Cookies } from '@/models/cookies';
import { redisClient } from '@/redis';
import { sessionSchema } from '@/schemas/auth';

import { COOKIE_SESSION_KEY } from '../constants';

import {
  createToken,
  getSessionIdFromToken,
  getUserSessionById,
  setCookie,
  storeSessionInRedis,
} from './helpers';

type UserSession = z.infer<typeof sessionSchema>;

export const getUserFromSession = async (cookies: Pick<Cookies, 'get'>) => {
  const token = cookies.get(COOKIE_SESSION_KEY)?.value;
  return token ? await getUserSessionById(token) : null;
};

export const createUserSession = async (
  user: UserSession,
  cookies: Pick<Cookies, 'set'>
) => {
  const sessionId = crypto.randomBytes(64).toString('hex');
  const validUser = sessionSchema.parse(user);

  await storeSessionInRedis(sessionId, validUser);
  const token = await createToken(validUser, sessionId);
  setCookie(token, cookies);
};

export const updateUserSessionData = async (
  user: UserSession,
  cookies: Pick<Cookies, 'get'>
) => {
  try {
    const token = cookies.get(COOKIE_SESSION_KEY)?.value;
    if (!token) return null;

    const sessionId = await getSessionIdFromToken(token);

    await storeSessionInRedis(sessionId, sessionSchema.parse(user));
  } catch (error) {
    console.error('Failed to update session data:', error);
    return null;
  }
};

export const updateUserSessionExpiration = async (
  cookies: Pick<Cookies, 'get' | 'set'>
) => {
  const token = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!token) return null;

  const user = await getUserSessionById(token);
  if (!user) return null;

  try {
    const sessionId = await getSessionIdFromToken(token);

    await storeSessionInRedis(sessionId, user);
    const newToken = await createToken(user, sessionId);
    setCookie(newToken, cookies);
  } catch (error) {
    console.error('Failed to update session expiration:', error);
  }
};

export const removeUserFromSession = async (
  cookies: Pick<Cookies, 'get' | 'delete'>
) => {
  try {
    const token = cookies.get(COOKIE_SESSION_KEY)?.value;
    if (!token) return null;

    const sessionId = await getSessionIdFromToken(token);

    await redisClient.del(`session:${sessionId}`);
    cookies.delete(COOKIE_SESSION_KEY);
  } catch (error) {
    console.error('Failed to remove session:', error);
    cookies.delete(COOKIE_SESSION_KEY);
  }
};
