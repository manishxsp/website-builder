import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Define your main app domain (local and production)
  const rootDomain = process.env.NODE_ENV === 'production'
    ? 'yourplatform.com'
    : 'localhost:3000';

  const searchParams = url.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

  console.log('Middleware Debug:', {
    hostname,
    rootDomain,
    path,
    env: process.env.NODE_ENV
  });

  // 1. If it's the root domain (your marketing site/admin)
  if (hostname === rootDomain) {
    return NextResponse.next();
  }

  // 2. Extract subdomain or custom domain
  const currentHost = hostname.replace(`.${rootDomain}`, '');

  console.log('Middleware Rewrite:', {
    currentHost,
    target: `/${currentHost}${path}`
  });

  // 3. Internal Rewrite to the [domain] dynamic route
  return NextResponse.rewrite(new URL(`/${currentHost}${path}`, req.url));
}
