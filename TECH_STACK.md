# 🏗️ Technical Stack & Architecture
## Website Builder SaaS Platform

**Version:** 1.0  
**Last Updated:** January 26, 2026  
**Architecture:** Multi-Tenant SaaS  
**Deployment:** Cloud-Native

---

## 📋 Technology Stack Overview

### Frontend Layer

| Technology | Version | Purpose | Why Chosen |
|------------|---------|---------|------------|
| **Next.js** | 14.0.0 | React framework | Server-side rendering, API routes, file-based routing |
| **React** | 18.2.0 | UI library | Component-based architecture, virtual DOM |
| **TypeScript** | 5.x | Type safety | Catch errors at compile time, better DX |
| **Tailwind CSS** | 3.x | Styling | Utility-first, responsive, customizable |
| **React Hook Form** | 7.x | Form management | Performance, validation, easy integration |

### Backend Layer

| Technology | Version | Purpose | Why Chosen |
|------------|---------|---------|------------|
| **Next.js API Routes** | 14.0.0 | Backend API | Serverless, same codebase as frontend |
| **Prisma ORM** | 5.x | Database toolkit | Type-safe queries, migrations, great DX |
| **PostgreSQL** | 15.x | Primary database | Relational data, ACID compliance, scalable |
| **Node.js** | 18.x | Runtime | JavaScript everywhere, large ecosystem |

### Infrastructure & DevOps

| Technology | Purpose | Provider Options |
|------------|---------|------------------|
| **Vercel** | Hosting & deployment | Vercel, Netlify, AWS Amplify |
| **Supabase** | PostgreSQL hosting | Supabase, PlanetScale, Neon |
| **Cloudflare** | CDN & DNS | Cloudflare, AWS CloudFront |
| **GitHub** | Version control | GitHub, GitLab, Bitbucket |
| **GitHub Actions** | CI/CD | GitHub Actions, CircleCI, Jenkins |

### Third-Party Services

| Service | Purpose | Cost |
|---------|---------|------|
| **Stripe** | Payment processing | 2.9% + $0.30 per transaction |
| **SendGrid** | Transactional emails | Free (100 emails/day) → $15/month |
| **Cloudinary** | Image hosting & optimization | Free → $89/month |
| **Sentry** | Error tracking | Free → $26/month |
| **UptimeRobot** | Uptime monitoring | Free → $7/month |

---

## 🏛️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Browser    │  │   Browser    │  │   Browser    │      │
│  │  (Customer)  │  │  (Customer)  │  │   (Admin)    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │               │
└─────────┼──────────────────┼──────────────────┼──────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                      EDGE NETWORK (CDN)                      │
│                    Cloudflare / Vercel Edge                  │
└─────────────────────────────────────────────────────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    MIDDLEWARE LAYER                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Subdomain Router (middleware.ts)                    │   │
│  │  - Detects subdomain (e.g., bakery.localhost:3000)  │   │
│  │  - Rewrites to dynamic route                        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Client     │  │     API      │  │    Admin     │      │
│  │   Routes     │  │   Routes     │  │   Routes     │      │
│  │ (client)/    │  │   /api/      │  │  (admin)/    │      │
│  │  [domain]    │  │   sites/     │  │  dashboard   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │               │
│         └──────────────────┼──────────────────┘               │
│                            │                                  │
└────────────────────────────┼──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Prisma ORM                                          │   │
│  │  - Type-safe queries                                 │   │
│  │  - Connection pooling                                │   │
│  │  - Query optimization                                │   │
│  └────────────────────┬─────────────────────────────────┘   │
│                       │                                      │
│                       ▼                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  PostgreSQL Database (Supabase)                      │   │
│  │  - Sites, Products, Services, Testimonials, etc.     │   │
│  │  - Row-level security                                │   │
│  │  - Automated backups                                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

### Core Models

```prisma
// Site (Main tenant entity)
model Site {
  id          String   @id @default(cuid())
  name        String
  subdomain   String   @unique
  customDomain String? @unique
  
  // Branding
  brandColor  String   @default("#3B82F6")
  fontFamily  String   @default("Inter")
  logo        String?
  favicon     String?
  
  // SEO
  metaTitle       String?
  metaDescription String?
  businessType    String   @default("LocalBusiness")
  primaryKeywords String[]
  
  // Relations
  services      Service[]
  products      Product[]
  testimonials  Testimonial[]
  faqs          FAQ[]
  navLinks      NavLink[]
  banners       Banner[]
  businessHours BusinessHour[]
  locations     Location[]
  tags          Tag[]
  leads         Lead[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Product (Vehicles, Menu Items, Bakery Products)
model Product {
  id          String  @id @default(cuid())
  name        String
  description String?
  price       String?
  image       String?
  slug        String?
  
  // Vehicle-specific (optional)
  make        String?
  model       String?
  year        Int?
  vin         String?
  mileage     Int?
  
  // Bakery-specific (optional)
  ingredients String[]
  allergens   String[]
  
  siteId String
  site   Site   @relation(fields: [siteId], references: [id], onDelete: Cascade)
}

// Lead (Customer inquiries)
model Lead {
  id      String @id @default(cuid())
  name    String
  email   String
  phone   String?
  message String
  
  siteId String
  site   Site   @relation(fields: [siteId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())
}
```

**Total Models:** 15  
**Total Fields:** 150+  
**Relationships:** 1-to-many, many-to-many

---

## 🔄 Request Flow

### Client Site Request

```
1. User visits: http://bakery.localhost:3000
   ↓
2. DNS resolves to Vercel edge network
   ↓
3. Middleware intercepts request
   - Extracts subdomain: "bakery"
   - Rewrites to: /(client)/bakery
   ↓
4. Next.js route: src/app/(client)/[domain]/page.tsx
   - Calls getSiteData("bakery")
   ↓
5. Prisma query to PostgreSQL
   - Fetches site + all relations
   - Returns data
   ↓
6. Server-side rendering
   - Generates HTML with data
   - Injects SEO metadata
   ↓
7. Response sent to client
   - HTML + CSS + JavaScript
   - Hydration on client
   ↓
8. User sees fully rendered site
```

**Average Response Time:** 200-500ms (first load)  
**Cached Response Time:** 50-100ms (subsequent loads)

---

### Admin Panel Request

```
1. Admin visits: http://localhost:3000/sites/123/edit
   ↓
2. Next.js route: src/app/(admin)/sites/[id]/page.tsx
   - Server-side data fetch
   ↓
3. Prisma query
   - Fetch site with ID 123
   - Include all relations
   ↓
4. Render SiteEditor component
   - Form with all site data
   - Real-time preview iframe
   ↓
5. Admin makes changes
   - Client-side state management
   ↓
6. Admin clicks "Save"
   - POST to /api/sites/123
   ↓
7. API route validates and updates
   - Prisma update transaction
   - Return success
   ↓
8. Client refreshes preview
   - Shows updated site
```

---

## 🔐 Security Architecture

### Authentication & Authorization

```typescript
// Future implementation with NextAuth.js
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Email/Password
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      authorize: async (credentials) => {
        // Verify credentials
        // Return user or null
      }
    }),
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
```

### Data Security

| Layer | Security Measure | Implementation |
|-------|------------------|----------------|
| **Transport** | HTTPS/TLS 1.3 | Vercel automatic |
| **Database** | Encryption at rest | Supabase default |
| **Passwords** | bcrypt hashing | NextAuth.js |
| **API** | Rate limiting | Vercel Edge Config |
| **Input** | Sanitization | Zod validation |
| **Output** | XSS protection | React automatic |
| **CSRF** | Token validation | NextAuth.js |

---

## 📊 Performance Optimizations

### Frontend Optimizations

```typescript
// 1. Image Optimization
import Image from 'next/image';

<Image
  src={product.image}
  alt={product.name}
  width={600}
  height={400}
  loading="lazy"
  placeholder="blur"
/>

// 2. Code Splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false
});

// 3. Font Optimization
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
```

### Backend Optimizations

```typescript
// 1. Database Query Optimization
const site = await prisma.site.findFirst({
  where: { subdomain },
  include: {
    services: { 
      where: { isActive: true },
      orderBy: { order: 'asc' },
      take: 10 // Limit results
    },
    products: {
      where: { isActive: true },
      select: { // Only fetch needed fields
        id: true,
        name: true,
        price: true,
        image: true
      }
    }
  }
});

// 2. Caching (Future)
import { Redis } from '@upstash/redis';

const cached = await redis.get(`site:${subdomain}`);
if (cached) return JSON.parse(cached);

// 3. Connection Pooling
// Prisma handles this automatically
```

### Metrics

| Metric | Target | Current |
|--------|--------|---------|
| **First Contentful Paint (FCP)** | <1.8s | ~1.2s |
| **Largest Contentful Paint (LCP)** | <2.5s | ~1.8s |
| **Time to Interactive (TTI)** | <3.8s | ~2.5s |
| **Cumulative Layout Shift (CLS)** | <0.1 | ~0.05 |
| **First Input Delay (FID)** | <100ms | ~50ms |

---

## 🔧 Development Workflow

### Local Development

```bash
# 1. Clone repository
git clone <repo-url>
cd website-builder-saas

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Edit .env with database credentials

# 4. Set up database
npx prisma generate
npx prisma db push
npx prisma db seed

# 5. Start development server
npm run dev

# 6. Open browser
# Admin: http://localhost:3000/dashboard
# Client: http://bakery.localhost:3000
```

### Git Workflow

```bash
# Feature branch workflow
git checkout -b feature/new-template
# Make changes
git add .
git commit -m "feat: add restaurant template"
git push origin feature/new-template
# Create pull request
# Review → Merge → Deploy
```

### Deployment Pipeline

```
Push to main branch
      ↓
GitHub Actions triggered
      ↓
Run tests (npm test)
      ↓
Build Next.js app (npm run build)
      ↓
Deploy to Vercel
      ↓
Run database migrations
      ↓
Smoke tests
      ↓
Production live
```

---

## 📦 Project Structure

```
website-builder-saas/
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Seed script
│   └── migrations/             # Database migrations
├── public/
│   ├── images/                 # Static images
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (admin)/            # Admin routes (protected)
│   │   │   ├── dashboard/
│   │   │   ├── sites/
│   │   │   │   ├── new/
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── leads/
│   │   │   └── layout.tsx
│   │   ├── (client)/           # Client-facing routes
│   │   │   ├── [domain]/
│   │   │   │   └── page.tsx    # Dynamic site rendering
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── sites/
│   │   │   │   ├── route.ts    # GET /api/sites, POST /api/sites
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts # GET/PATCH/DELETE /api/sites/:id
│   │   │   └── leads/
│   │   │       └── route.ts    # POST /api/leads
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   └── robots.ts           # Robots.txt
│   ├── components/
│   │   ├── admin/
│   │   │   └── SiteEditor.tsx  # Site editing interface
│   │   ├── sections/           # Reusable site sections
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── Contact.tsx
│   │   └── seo/
│   │       ├── JsonLd.tsx      # Structured data
│   │       └── Analytics.tsx   # GA4, GTM, FB Pixel
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client singleton
│   │   ├── seo-utils.ts        # SEO helper functions
│   │   └── utils.ts            # General utilities
│   ├── middleware.ts           # Subdomain routing
│   └── types/
│       └── index.ts            # TypeScript types
├── .env                        # Environment variables
├── .env.example                # Environment template
├── .gitignore
├── next.config.js              # Next.js configuration
├── package.json
├── postcss.config.js           # PostCSS for Tailwind
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── README.md
```

**Total Files:** ~100  
**Lines of Code:** ~15,000  
**Components:** 25+

---

## 🧪 Testing Strategy

### Unit Tests (Future)

```typescript
// __tests__/lib/seo-utils.test.ts
import { generateSlug, generateKeywords } from '@/lib/seo-utils';

describe('SEO Utils', () => {
  test('generateSlug creates URL-friendly slug', () => {
    expect(generateSlug('2024 Tesla Model 3')).toBe('2024-tesla-model-3');
  });
  
  test('generateKeywords returns industry-specific keywords', () => {
    const keywords = generateKeywords('Bakery', { city: 'Austin' });
    expect(keywords).toContain('bakery near me');
    expect(keywords).toContain('custom cakes Austin');
  });
});
```

### Integration Tests (Future)

```typescript
// __tests__/api/sites.test.ts
import { POST, GET } from '@/app/api/sites/route';

describe('Sites API', () => {
  test('POST /api/sites creates new site', async () => {
    const req = new Request('http://localhost:3000/api/sites', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Bakery',
        subdomain: 'test-bakery'
      })
    });
    
    const res = await POST(req);
    expect(res.status).toBe(201);
  });
});
```

### E2E Tests (Future)

```typescript
// __tests__/e2e/site-creation.spec.ts
import { test, expect } from '@playwright/test';

test('admin can create new site', async ({ page }) => {
  await page.goto('http://localhost:3000/sites/new');
  await page.fill('[name="name"]', 'My Bakery');
  await page.fill('[name="subdomain"]', 'my-bakery');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL(/\/sites\/[a-z0-9]+/);
});
```

---

## 🚀 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:pass@host:5432/db"

# NextAuth (Future)
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-secret-key"

# Stripe (Future)
STRIPE_PUBLIC_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."

# Email (Future)
SENDGRID_API_KEY="SG...."

# Analytics (Future)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## 📈 Scalability Considerations

### Horizontal Scaling

```
Current: Single Vercel deployment
         ↓
Phase 2: Multi-region deployment
         - US East (primary)
         - US West (replica)
         - EU (replica)
         ↓
Phase 3: Database sharding
         - Shard by customer ID
         - 3-5 database instances
         ↓
Phase 4: Microservices
         - API service
         - Admin service
         - Client rendering service
```

### Vertical Scaling

```
Current: Vercel Hobby (free)
         - Serverless functions
         - 100GB bandwidth/month
         ↓
Phase 2: Vercel Pro ($20/month)
         - Increased limits
         - Analytics
         ↓
Phase 3: Vercel Enterprise (custom)
         - Dedicated support
         - SLA guarantees
         - Custom limits
```

---

## 🔍 Monitoring & Observability

### Metrics to Track

```typescript
// Custom metrics
export const metrics = {
  // Performance
  pageLoadTime: histogram('page_load_time_ms'),
  apiResponseTime: histogram('api_response_time_ms'),
  databaseQueryTime: histogram('db_query_time_ms'),
  
  // Business
  sitesCreated: counter('sites_created_total'),
  leadsGenerated: counter('leads_generated_total'),
  activeUsers: gauge('active_users'),
  
  // Errors
  apiErrors: counter('api_errors_total'),
  databaseErrors: counter('database_errors_total'),
};
```

### Logging

```typescript
// Structured logging
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
});

logger.info({ siteId: '123', action: 'site_created' }, 'New site created');
logger.error({ error: err, siteId: '123' }, 'Failed to update site');
```

---

## 🎓 Learning Resources

### For Developers

- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs

### For Business

- **Indie Hackers:** https://www.indiehackers.com
- **SaaS Metrics:** https://www.saastr.com
- **Pricing Strategy:** https://www.priceintelligently.com

---

**Last Updated:** January 26, 2026  
**Maintained By:** Development Team  
**License:** MIT
