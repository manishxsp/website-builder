import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /_static (Inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Define your production and local domains
  const rootDomain = process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'your-saas-platform.vercel.app'
    : 'localhost:3000';

  const path = url.pathname;

  // 1. Handle the main dashboard and landing page
  if (hostname === rootDomain || hostname === 'localhost:3000') {
    return NextResponse.next();
  }

  // 2. Extract the subdomain (e.g., 'skoda-india')
  const currentHost = hostname.replace(`.${rootDomain}`, '');

  console.log('Middleware Debug:', {
    hostname,
    rootDomain,
    currentHost,
    path,
    rewriteTo: `/(client)/${currentHost}${path}`
  });

  // 3. Rewrite to the dynamic [domain] route
  // We rewrite to /${currentHost}${path} which matches [domain]/page.tsx
  // The (client) route group is transparent
  return NextResponse.rewrite(new URL(`/${currentHost}${path}`, req.url));
}
