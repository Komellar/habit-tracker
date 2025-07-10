import { NextRequest, NextResponse } from 'next/server';

import { verifySessionForEdge } from './utils/auth/edge-auth';

const publicRoutes = ['/', '/sign-in', '/sign-up', '/about'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (
    publicRoutes.some((route) => path === route || path.startsWith(`${route}/`))
  ) {
    return NextResponse.next();
  }

  const session = await verifySessionForEdge(request);

  if (!session) {
    const url = new URL('/sign-in', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
