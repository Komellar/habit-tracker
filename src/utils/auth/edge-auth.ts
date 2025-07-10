import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

import { JWT_SECRET, COOKIE_SESSION_KEY } from './constants';

// Function to verify session in Edge Runtime (middleware)
export async function verifySessionForEdge(request: NextRequest) {
  const sessionCookie = request.cookies.get(COOKIE_SESSION_KEY)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      sessionCookie,
      new TextEncoder().encode(JWT_SECRET)
    );

    return payload;
  } catch (error) {
    console.error('Session verification failed:', error);
    return null;
  }
}
