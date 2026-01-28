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
  const path = url.pathname;

  // Skip middleware for API routes and static files
  if (
    path.startsWith('/api') ||
    path.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  // Public routes that don't need rewriting
  const publicRoutes = ['/', '/login', '/signup', '/dashboard', '/sites', '/settings'];

  if (publicRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  // For any other path like /samsung-plaza, /skoda-india, etc.
  // Extract the brand/site slug from the path
  const pathSegments = path.split('/').filter(Boolean);

  if (pathSegments.length > 0) {
    const brandSlug = pathSegments[0];

    // Rewrite /samsung-plaza to the [domain] dynamic route
    // This serves the client site from app/(client)/[domain]/page.tsx
    return NextResponse.rewrite(new URL(`/${brandSlug}`, req.url));
  }

  return NextResponse.next();
}
