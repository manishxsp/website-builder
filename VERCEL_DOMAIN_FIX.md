# Dynamic Domain Fix for Vercel Deployment

## Problem
The application was showing hardcoded `localhost:3000` domains on Vercel, causing:
1. Site URLs displaying as `samsung-plaza.localhost:3000` instead of `samsung-plaza.website-builder-ktg4.vercel.app`
2. Middleware treating the main Vercel domain as a client subdomain
3. Admin routes (`/sites/new`) not working on Vercel

## Root Causes
1. **Hardcoded localhost URLs** in admin pages
2. **Middleware not recognizing Vercel URLs** as the root domain
3. **No environment-aware domain generation**

## Solutions Implemented

### 1. Middleware Fix (`src/middleware.ts`)
- Added detection for `.vercel.app` domains
- Now recognizes both production and preview Vercel URLs as root domain
- Prevents incorrect rewrites of admin routes

```typescript
const isVercelDeployment = hostname.endsWith('.vercel.app');
if (isRootDomain || isVercelDeployment) {
  return NextResponse.next(); // Serve admin app
}
```

### 2. Domain Utility (`src/lib/domain.ts`)
Created helper functions for environment-aware domain generation:
- `getBaseDomain()` - Returns current domain (localhost or Vercel)
- `getSiteUrl()` - Generates full site URLs
- `getDomainSuffix()` - Returns domain suffix for display

### 3. Updated Admin Pages
Converted to client components with dynamic domains:
- `/sites` - Sites listing page
- `/sites/new` - Create new site form
- `/dashboard` - Dashboard overview

All now show correct domains based on environment:
- **Local**: `subdomain.localhost:3000`
- **Vercel**: `subdomain.website-builder-ktg4.vercel.app`

## How It Works

### Development (localhost)
- Domain: `localhost:3000`
- Site URL: `http://subdomain.localhost:3000`

### Vercel Production
- Domain: `website-builder-ktg4.vercel.app`
- Site URL: `https://subdomain.website-builder-ktg4.vercel.app`

### Vercel Preview
- Domain: `website-builder-ktg4-abc123.vercel.app`
- Site URL: `https://subdomain.website-builder-ktg4-abc123.vercel.app`

## Environment Variables

### Optional (for custom domains)
```env
NEXT_PUBLIC_ROOT_DOMAIN=yourdomain.com
```

If not set, the app automatically detects:
- `localhost:3000` in development
- `*.vercel.app` in production/preview

## Testing
1. Deploy to Vercel
2. Visit your Vercel URL (e.g., `website-builder-ktg4.vercel.app`)
3. Admin routes should work (`/sites/new`, `/dashboard`)
4. Site URLs should show correct Vercel domains

## Note on Subdomains
Vercel doesn't support dynamic subdomains on `*.vercel.app` URLs. The middleware uses rewrites to simulate subdomain routing:
- User visits: `samsung-plaza.website-builder-ktg4.vercel.app`
- Middleware rewrites to: `/samsung-plaza/...`
- Next.js serves: `app/(client)/[domain]/page.tsx`

For true subdomain support, add a custom domain and configure DNS wildcard records.
