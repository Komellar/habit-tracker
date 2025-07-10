import { jwtVerify, SignJWT } from 'jose';
import z from 'zod';

import { Cookies } from '@/models/cookies';
import { redisClient } from '@/redis';
import { sessionSchema } from '@/schemas/auth';

import {
  COOKIE_SESSION_KEY,
  JWT_SECRET,
  SESSION_EXPIRATION_SECONDS,
} from '../constants';

type UserSession = z.infer<typeof sessionSchema>;

export const createToken = async (user: UserSession, sessionId: string) =>
  new SignJWT({ ...user, sessionId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(JWT_SECRET));

export const setCookie = (token: string, cookies: Pick<Cookies, 'set'>) => {
  cookies.set(COOKIE_SESSION_KEY, token, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
};

export const storeSessionInRedis = async (
  sessionId: string,
  user: UserSession
) => {
  await redisClient.set(
    `session:${sessionId}`,
    JSON.stringify(sessionSchema.parse(user)),
    'EX',
    SESSION_EXPIRATION_SECONDS
  );
};

export const getUserSessionById = async (token: string) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    const sessionId = payload.sessionId as string;

    const rawUser = await redisClient.get(`session:${sessionId}`);
    if (!rawUser) return null;

    return JSON.parse(rawUser);
  } catch (error) {
    console.error('Session validation failed:', error);
    return null;
  }
};

export const getSessionIdFromToken = async (token: string) => {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(JWT_SECRET)
  );
  return payload.sessionId as string;
};
