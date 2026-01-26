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
  // Handle dynamic ports in development (localhost:3000, localhost:3001, etc.)
  const isLocalhost = hostname.includes('localhost');
  const rootDomain = process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'your-saas-platform.vercel.app'
    : hostname; // Use current hostname in dev to handle any port

  const path = url.pathname;

  // 1. Handle the main dashboard and landing page
  // If we are on the root domain (e.g. app.localhost:3000 or just localhost:3000)
  // We want to serve the main app, not a client site
  // BUT: In this architecture, it seems the main app is at the root, and subdomains are client sites.
  // Let's assume 'app' subdomain or root domain is the dashboard.

  if (hostname === 'localhost:3000' || hostname === 'localhost:3001' || hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    return NextResponse.next();
  }

  // If it's the admin/dashboard app (e.g. app.localhost:3000)
  if (hostname.startsWith('app.')) {
    return NextResponse.next();
  }

  // 2. Extract the subdomain (e.g., 'skoda-india')
  let currentHost = hostname;

  if (process.env.NODE_ENV === 'production') {
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'your-saas-platform.vercel.app';
    currentHost = hostname.replace(`.${rootDomain}`, '');
  } else {
    // In development, handle localhost subdomains
    // e.g. skoda-india.localhost:3000 -> skoda-india
    if (hostname.includes('.localhost')) {
      currentHost = hostname.split('.localhost')[0];
    } else if (hostname.includes('localhost')) {
      // It's just localhost:3000, so it's the root
      return NextResponse.next();
    }
  }

  console.log('Middleware Debug:', {
    hostname,
    currentHost,
    path,
    rewriteTo: `/${currentHost}${path}`
  });

  // 3. Rewrite to the dynamic [domain] route
  return NextResponse.rewrite(new URL(`/${currentHost}${path}`, req.url));
}
