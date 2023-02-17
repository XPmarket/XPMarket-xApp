import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';

import { routeGuard } from '@system/auth/authorization';
import { COOKIE_STORAGE } from '@system/constants';

// Server-side route guard
export const middleware = (request: NextRequest): NextResponse | undefined => {
  const { pathname } = request.nextUrl;
  const redirect = (redirectTo: string, code = StatusCodes.MOVED_TEMPORARILY) =>
    NextResponse.redirect(new URL(redirectTo, request.url), code);

  return routeGuard({
    asPath: pathname,
    referrer: request.referrer,
    onRedirect: redirect,
    stringifiedUser: request.cookies.get(COOKIE_STORAGE.user)?.value,
    session: request.cookies.get(COOKIE_STORAGE.session)?.value,
  });
};
