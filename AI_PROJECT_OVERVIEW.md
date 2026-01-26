# 🤖 AI-Readable Project Overview
## Website Builder SaaS Platform - Complete Context

**Document Purpose:** Provide comprehensive project understanding for AI assistants, code analysis tools, and automated systems.

**Last Updated:** January 26, 2026  
**Project Status:** Production-Ready MVP  
**Codebase Size:** ~15,000 lines of code

---

## 🎯 Project Mission Statement

**What:** A multi-tenant SaaS platform that enables small businesses to create professional websites without coding.

**Who:** Small business owners (bakeries, car dealerships, restaurants, local services) who need an online presence but lack technical skills or budget for custom development.

**Why:** Existing solutions (Wix, Squarespace) are generic and expensive. This platform offers industry-specific templates optimized for local businesses at 50% lower cost.

**How:** Template-based website builder with drag-and-drop editing, SEO optimization, and automated deployment on custom subdomains.

---

## 📐 Core Concepts

### 1. Multi-Tenancy Model

**Definition:** Single application instance serves multiple customers (tenants), each with isolated data.

**Implementation:**
```
Tenant Isolation Method: Subdomain-based routing
Example: bakery.yoursaas.com, cardealership.yoursaas.com

Data Isolation: Database-level (siteId foreign key on all tables)
Routing: Middleware intercepts requests and rewrites based on subdomain
```

**Benefits:**
- Single codebase for all customers
- Easy to deploy updates
- Cost-effective infrastructure
- Scalable architecture

---

### 2. Template System

**Concept:** Pre-designed website layouts optimized for specific industries.

**Available Templates:**
1. **Bakery Template**
   - Sections: Hero, About, Products (cakes/pastries), Gallery, Testimonials, Contact
   - Unique Features: Custom order form, dietary information, delivery zones
   - Color Scheme: Warm tones (orange, brown, cream)

2. **Car Dealership Template**
   - Sections: Hero, Inventory (vehicles), Services, Financing, Testimonials, Contact
   - Unique Features: Vehicle comparison, finance calculator, trade-in estimator
   - Color Scheme: Professional (blue, gray, white)

3. **Restaurant Template**
   - Sections: Hero, Menu, About, Gallery, Reviews, Contact
   - Unique Features: Menu categories, online ordering, reservations
   - Color Scheme: Appetizing (red, green, warm tones)

4. **Generic Business Template**
   - Sections: Hero, About, Services, Portfolio, Testimonials, Contact
   - Unique Features: Flexible sections, customizable layout
   - Color Scheme: Customizable

**Template Selection:** During onboarding, customer chooses industry → system applies appropriate template → customer customizes content.

---

### 3. Component-Based Architecture

**Philosophy:** Website is composed of reusable, self-contained components.

**Component Hierarchy:**
```
Site (Root)
├── Navbar (Navigation)
├── Hero (Landing section)
├── About (Company story)
├── Services (What you offer)
├── Products (Items for sale)
├── Gallery (Photo showcase)
├── Testimonials (Customer reviews)
├── FAQ (Questions & answers)
├── Contact (Contact form + info)
└── Footer (Links, social media)
```

**Component Props:**
```typescript
interface ComponentProps {
  id?: string;           // For anchor links
  title: string;         // Section heading
  content?: string;      // Text content
  brandColor: string;    // Theming
  items?: Array<any>;    // Dynamic data (products, services, etc.)
}
```

**Data Flow:**
```
Database (PostgreSQL)
      ↓
Prisma ORM (type-safe queries)
      ↓
Server Component (Next.js)
      ↓
Props passed to UI Component
      ↓
Rendered HTML sent to client
```

---

## 🗄️ Data Model

### Entity Relationship Overview

```
Site (1) ──┬── (Many) Products
           ├── (Many) Services
           ├── (Many) Testimonials
           ├── (Many) FAQs
           ├── (Many) NavLinks
           ├── (Many) Banners
           ├── (Many) BusinessHours
           ├── (Many) Locations
           ├── (Many) Tags
           └── (Many) Leads
```

### Key Entities

**Site (Tenant)**
- **Purpose:** Represents one customer's website
- **Key Fields:** name, subdomain, customDomain, brandColor, fontFamily
- **Unique Constraints:** subdomain (unique), customDomain (unique)
- **Relationships:** Has many products, services, testimonials, etc.

**Product**
- **Purpose:** Items for sale (vehicles, baked goods, menu items)
- **Key Fields:** name, description, price, image, slug
- **Industry-Specific Fields:**
  - Vehicles: make, model, year, vin, mileage, fuelType
  - Bakery: ingredients, allergens, servingSize, dietaryInfo
- **Relationships:** Belongs to Site

**Lead**
- **Purpose:** Customer inquiries from contact form
- **Key Fields:** name, email, phone, message
- **Relationships:** Belongs to Site
- **Use Case:** Site owner reviews leads in admin panel, contacts customers

**FAQ**
- **Purpose:** Frequently asked questions for SEO and user experience
- **Key Fields:** question, answer, order, isActive
- **SEO Benefit:** Generates FAQ schema for rich snippets in Google

---

## 🔄 Request/Response Flow

### Client Site Request (Detailed)

```
1. USER ACTION
   User types: http://bakery.localhost:3000
   Browser sends HTTP GET request

2. DNS RESOLUTION
   localhost resolves to 127.0.0.1
   Request reaches Next.js server

3. MIDDLEWARE INTERCEPTION
   File: src/middleware.ts
   - Extracts hostname: "bakery.localhost:3000"
   - Parses subdomain: "bakery"
   - Checks if it's admin route: No
   - Rewrites URL: /(client)/bakery → /bakery

4. ROUTE MATCHING
   Next.js matches: src/app/(client)/[domain]/page.tsx
   - [domain] = "bakery" (dynamic segment)
   - Calls page component with params: { domain: "bakery" }

5. DATA FETCHING (Server-Side)
   async function getSiteData(domain: string) {
     const site = await prisma.site.findFirst({
       where: {
         OR: [
           { subdomain: domain },
           { customDomain: domain }
         ]
       },
       include: {
         services: { orderBy: { order: 'asc' } },
         products: { orderBy: { order: 'asc' }, where: { isActive: true } },
         testimonials: { orderBy: { order: 'asc' } },
         faqs: { orderBy: { order: 'asc' }, where: { isActive: true } },
         // ... other relations
       }
     });
     return site;
   }

6. DATABASE QUERY
   Prisma generates SQL:
   SELECT * FROM "Site" 
   WHERE subdomain = 'bakery' OR customDomain = 'bakery'
   
   Joins with related tables:
   - LEFT JOIN "Service" ON "Service"."siteId" = "Site"."id"
   - LEFT JOIN "Product" ON "Product"."siteId" = "Site"."id"
   - ... (other joins)
   
   Returns: Site object with nested relations

7. COMPONENT RENDERING (Server-Side)
   - Generates HTML with site data
   - Injects SEO metadata (title, description, Open Graph)
   - Adds JSON-LD structured data
   - Applies brand colors via CSS variables

8. RESPONSE
   - Status: 200 OK
   - Content-Type: text/html
   - Body: Fully rendered HTML
   - Headers: Cache-Control, ETag, etc.

9. CLIENT HYDRATION
   - Browser receives HTML
   - React hydrates (attaches event listeners)
   - Page becomes interactive

10. SUBSEQUENT NAVIGATION
    - Client-side routing (no full page reload)
    - Smooth transitions between sections
```

**Performance:**
- First Load: 300-500ms (server-side rendering)
- Cached Load: 50-100ms (edge caching)
- Client Navigation: <50ms (instant)

---

### Admin Panel Request (Detailed)

```
1. USER ACTION
   Admin navigates to: http://localhost:3000/sites/abc123/edit

2. ROUTE MATCHING
   Next.js matches: src/app/(admin)/sites/[id]/page.tsx
   - [id] = "abc123" (site ID)

3. DATA FETCHING
   const site = await prisma.site.findUnique({
     where: { id: params.id },
     include: {
       services: { orderBy: { order: 'asc' } },
       products: { orderBy: { order: 'asc' } },
       faqs: { orderBy: { order: 'asc' } },
       // ... all relations
     }
   });

4. RENDER EDITOR
   - SiteEditor component receives site data
   - Initializes form state with current values
   - Renders preview iframe with live site

5. USER EDITS
   - Changes brand color: #3B82F6 → #F59E0B
   - Updates hero title: "Welcome" → "Fresh Baked Daily"
   - Adds new product: "Chocolate Cake - $25"

6. SAVE ACTION
   - User clicks "Save All Changes"
   - Client sends PATCH request to /api/sites/abc123
   - Request body: { brandColor: "#F59E0B", heroTitle: "Fresh Baked Daily", products: [...] }

7. API ROUTE PROCESSING
   File: src/app/api/sites/[id]/route.ts
   
   export async function PATCH(req, { params }) {
     const body = await req.json();
     
     // Separate scalar fields from relations
     const { services, products, faqs, ...siteData } = body;
     
     // Update site + relations in transaction
     const updated = await prisma.site.update({
       where: { id: params.id },
       data: {
         ...siteData,
         products: {
           deleteMany: {},  // Delete existing
           create: products // Create new
         }
       }
     });
     
     return Response.json(updated);
   }

8. DATABASE UPDATE
   BEGIN TRANSACTION;
   UPDATE "Site" SET "brandColor" = '#F59E0B', "heroTitle" = 'Fresh Baked Daily' WHERE id = 'abc123';
   DELETE FROM "Product" WHERE "siteId" = 'abc123';
   INSERT INTO "Product" (name, price, siteId) VALUES ('Chocolate Cake', '$25', 'abc123');
   COMMIT;

9. RESPONSE
   - Status: 200 OK
   - Body: Updated site object

10. CLIENT UPDATE
    - Form state updated
    - Preview iframe refreshed
    - Success message displayed
```

---

## 🧩 Key Algorithms & Logic

### 1. Subdomain Extraction

```typescript
// src/middleware.ts
function extractSubdomain(hostname: string): string | null {
  // hostname examples:
  // - "bakery.localhost:3000" → "bakery"
  // - "localhost:3000" → null (root domain)
  // - "bakery.yoursaas.com" → "bakery"
  
  if (hostname.includes('.localhost')) {
    return hostname.split('.localhost')[0];
  }
  
  if (hostname.includes('localhost')) {
    return null; // Root domain
  }
  
  // Production: extract subdomain from custom domain
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'yoursaas.com';
  if (hostname.includes(rootDomain)) {
    return hostname.replace(`.${rootDomain}`, '');
  }
  
  return null;
}
```

**Edge Cases:**
- `localhost:3000` → null (admin panel)
- `app.localhost:3000` → "app" (could be admin subdomain)
- `bakery.localhost:3000` → "bakery" (client site)
- `127.0.0.1:3000` → null (IP address, not subdomain)

---

### 2. SEO Metadata Generation

```typescript
// src/app/(client)/[domain]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const site = await getSiteData(params.domain);
  
  if (!site) {
    return {
      title: 'Site Not Found',
      robots: { index: false, follow: false }
    };
  }
  
  // Combine primary keywords for meta description
  const keywords = [
    ...site.primaryKeywords,
    ...site.secondaryKeywords,
    ...site.localModifiers
  ].join(', ');
  
  return {
    title: site.metaTitle || `${site.name} - ${site.description}`,
    description: site.metaDescription || site.description,
    keywords,
    authors: [{ name: site.name }],
    
    // Open Graph
    openGraph: {
      title: site.metaTitle || site.name,
      description: site.metaDescription || site.description,
      images: [site.heroImage || site.logo],
      siteName: site.name,
      locale: 'en_US',
      type: 'website',
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: site.metaTitle || site.name,
      description: site.metaDescription || site.description,
      images: [site.heroImage || site.logo],
    },
    
    // Search Console Verification
    verification: {
      google: site.googleSiteVerification,
      other: {
        'msvalidate.01': site.bingWebmasterVerification,
      }
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    }
  };
}
```

---

### 3. Aggregate Rating Calculation

```typescript
// src/lib/seo-utils.ts
export async function updateSiteRating(siteId: string) {
  // Fetch all testimonials with ratings
  const testimonials = await prisma.testimonial.findMany({
    where: {
      siteId,
      rating: { gt: 0 } // Only count testimonials with ratings
    },
    select: { rating: true }
  });
  
  if (testimonials.length === 0) {
    // No ratings, clear aggregate
    await prisma.site.update({
      where: { id: siteId },
      data: {
        aggregateRating: null,
        totalReviews: 0
      }
    });
    return;
  }
  
  // Calculate average rating
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
  const average = sum / testimonials.length;
  
  // Round to 1 decimal place
  const rounded = Math.round(average * 10) / 10;
  
  // Update site
  await prisma.site.update({
    where: { id: siteId },
    data: {
      aggregateRating: rounded,
      totalReviews: testimonials.length
    }
  });
  
  return { rating: rounded, count: testimonials.length };
}
```

**Usage:**
- Called after creating/updating/deleting testimonials
- Used in JSON-LD structured data for SEO
- Displayed on site as star rating

---

## 🎨 Styling System

### Tailwind CSS Utility-First Approach

**Concept:** Instead of writing custom CSS, compose styles using pre-defined utility classes.

**Example:**
```tsx
// Traditional CSS
<div className="hero-section">
  <h1 className="hero-title">Welcome</h1>
</div>

// CSS file
.hero-section {
  padding: 5rem 1.5rem;
  background-color: #f3f4f6;
}
.hero-title {
  font-size: 3rem;
  font-weight: bold;
  color: #1f2937;
}

// Tailwind approach
<div className="py-20 px-6 bg-gray-100">
  <h1 className="text-5xl font-bold text-gray-800">Welcome</h1>
</div>
```

**Benefits:**
- No CSS file needed
- No naming conflicts
- Responsive design built-in: `md:text-6xl` (medium screens and up)
- Hover states: `hover:bg-blue-600`
- Dark mode: `dark:bg-gray-900`

### Dynamic Theming

**Problem:** Each site has custom brand color.

**Solution:** CSS variables + inline styles

```tsx
// Component receives brandColor prop
<section 
  className="py-20"
  style={{ '--brand-color': brandColor } as any}
>
  <h2 
    className="text-4xl font-bold"
    style={{ color: brandColor }}
  >
    {title}
  </h2>
  
  <button 
    className="px-6 py-3 rounded-lg hover:opacity-90"
    style={{ backgroundColor: brandColor }}
  >
    {ctaText}
  </button>
</section>
```

**Result:** Same component, different colors per site.

---

## 🔐 Security Considerations

### 1. SQL Injection Prevention

**Threat:** Malicious user inputs SQL commands to access/modify database.

**Protection:** Prisma ORM uses parameterized queries.

```typescript
// UNSAFE (vulnerable to SQL injection)
const site = await prisma.$queryRaw`SELECT * FROM Site WHERE subdomain = '${userInput}'`;

// SAFE (Prisma automatically escapes)
const site = await prisma.site.findFirst({
  where: { subdomain: userInput }
});
```

---

### 2. XSS (Cross-Site Scripting) Prevention

**Threat:** Malicious user injects JavaScript into site content.

**Protection:** React automatically escapes HTML.

```tsx
// User input: "<script>alert('XSS')</script>"

// SAFE (React escapes)
<p>{userInput}</p>
// Renders: &lt;script&gt;alert('XSS')&lt;/script&gt;

// UNSAFE (dangerouslySetInnerHTML)
<p dangerouslySetInnerHTML={{ __html: userInput }} />
// Executes script!
```

**Rule:** Never use `dangerouslySetInnerHTML` with user input.

---

### 3. CSRF (Cross-Site Request Forgery) Prevention

**Threat:** Malicious site tricks user into making unwanted requests.

**Protection:** SameSite cookies + CSRF tokens (future with NextAuth).

```typescript
// Future implementation
export const authOptions = {
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  }
};
```

---

## 📊 Performance Optimization Strategies

### 1. Server-Side Rendering (SSR)

**Benefit:** HTML generated on server, sent to client fully rendered.

**Impact:**
- Faster First Contentful Paint (FCP)
- Better SEO (crawlers see full content)
- Improved perceived performance

**Implementation:** Next.js default for page components.

---

### 2. Static Site Generation (SSG) - Future

**Concept:** Pre-render pages at build time, serve static HTML.

**Use Case:** Sites that don't change frequently.

```typescript
// Generate static pages for all sites
export async function generateStaticParams() {
  const sites = await prisma.site.findMany({
    select: { subdomain: true }
  });
  
  return sites.map(site => ({
    domain: site.subdomain
  }));
}
```

**Benefit:** Instant page loads (no server processing).

---

### 3. Image Optimization

**Problem:** Large images slow down page load.

**Solution:** Next.js Image component.

```tsx
import Image from 'next/image';

<Image
  src={product.image}
  alt={product.name}
  width={600}
  height={400}
  loading="lazy"        // Lazy load off-screen images
  placeholder="blur"    // Show blur while loading
  quality={85}          // Compress to 85% quality
/>
```

**Automatic Optimizations:**
- WebP format (smaller file size)
- Responsive images (different sizes for different screens)
- Lazy loading (load images as user scrolls)

---

### 4. Database Query Optimization

**Problem:** Fetching unnecessary data slows down response.

**Solution:** Select only needed fields.

```typescript
// BAD: Fetches all fields
const products = await prisma.product.findMany({
  where: { siteId }
});

// GOOD: Fetches only needed fields
const products = await prisma.product.findMany({
  where: { siteId },
  select: {
    id: true,
    name: true,
    price: true,
    image: true
  },
  take: 10 // Limit results
});
```

**Impact:** 50-70% reduction in data transfer.

---

## 🚀 Deployment Architecture

### Development Environment

```
Developer's Machine
├── Node.js 18+
├── PostgreSQL (local or Supabase)
├── npm run dev (port 3000)
└── Browser (localhost:3000)
```

### Production Environment (Vercel)

```
User Request
      ↓
Cloudflare CDN (optional)
      ↓
Vercel Edge Network
├── Edge Functions (middleware)
├── Serverless Functions (API routes, SSR)
└── Static Assets (images, CSS, JS)
      ↓
Supabase PostgreSQL
└── Database (persistent storage)
```

**Benefits:**
- Global CDN (low latency worldwide)
- Auto-scaling (handles traffic spikes)
- Zero-downtime deployments
- Automatic HTTPS

---

## 🧪 Testing Philosophy

### Current State: Manual Testing

**Process:**
1. Developer makes changes
2. Tests locally (npm run dev)
3. Checks multiple scenarios
4. Deploys to production

**Limitations:**
- Time-consuming
- Human error
- No regression testing

### Future: Automated Testing

**Unit Tests:**
```typescript
// Test individual functions
test('generateSlug creates URL-friendly slug', () => {
  expect(generateSlug('Hello World!')).toBe('hello-world');
});
```

**Integration Tests:**
```typescript
// Test API endpoints
test('POST /api/sites creates new site', async () => {
  const res = await fetch('/api/sites', {
    method: 'POST',
    body: JSON.stringify({ name: 'Test', subdomain: 'test' })
  });
  expect(res.status).toBe(201);
});
```

**E2E Tests:**
```typescript
// Test user workflows
test('user can create and publish site', async () => {
  await page.goto('/sites/new');
  await page.fill('[name="name"]', 'My Site');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/sites\/[a-z0-9]+/);
});
```

---

## 📈 Business Logic

### Pricing Tiers (Planned)

| Tier | Price | Sites | Products | Support |
|------|-------|-------|----------|---------|
| Starter | $15/mo | 1 | 10 | Email |
| Pro | $30/mo | 1 | 50 | Email + Chat |
| Business | $50/mo | 3 | 200 | Priority |
| Enterprise | Custom | Unlimited | Unlimited | Dedicated |

### Revenue Model

```
Customer pays $30/month
      ↓
Stripe processes payment (2.9% + $0.30 = $1.17)
      ↓
Net revenue: $28.83/month
      ↓
Costs:
- Database: $0.05/month per customer
- Hosting: $0.10/month per customer
- Email: $0.02/month per customer
      ↓
Profit: $28.66/month per customer (99% margin)
```

**Scalability:**
- 100 customers = $2,866/month profit
- 1000 customers = $28,660/month profit
- 10,000 customers = $286,600/month profit

---

## 🔮 Future Roadmap

### Phase 1: MVP (Current)
- ✅ Multi-tenant architecture
- ✅ Template system
- ✅ Admin panel
- ✅ SEO optimization
- ✅ Contact form

### Phase 2: Growth (Next 3 months)
- ⚠️ User authentication (NextAuth.js)
- ⚠️ Payment integration (Stripe)
- ⚠️ Custom domain support
- ⚠️ Email notifications
- ⚠️ Analytics dashboard

### Phase 3: Scale (6-12 months)
- 🔄 Template marketplace
- 🔄 Drag-and-drop editor
- 🔄 Mobile app
- 🔄 White-label option
- 🔄 API access

### Phase 4: Enterprise (12+ months)
- 🔄 Multi-language support
- 🔄 Advanced integrations
- 🔄 Custom workflows
- 🔄 Team collaboration
- 🔄 Enterprise SLA

---

## 🤝 Contributing Guidelines

### Code Style

```typescript
// Use TypeScript for type safety
interface Product {
  id: string;
  name: string;
  price: string;
}

// Use async/await for async operations
async function fetchSite(id: string) {
  const site = await prisma.site.findUnique({ where: { id } });
  return site;
}

// Use descriptive variable names
const activeSites = sites.filter(s => s.isActive);

// Use comments for complex logic
// Calculate average rating from testimonials with ratings > 0
const avgRating = testimonials
  .filter(t => t.rating > 0)
  .reduce((sum, t) => sum + t.rating, 0) / testimonials.length;
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/add-blog-system

# Make changes, commit often
git add .
git commit -m "feat: add blog post model"
git commit -m "feat: add blog post editor"
git commit -m "feat: add blog post display"

# Push to remote
git push origin feature/add-blog-system

# Create pull request
# Review → Merge → Deploy
```

---

## 📚 Glossary

**Terms for AI Understanding:**

- **Tenant:** A customer/business using the platform (e.g., "Sweet Haven Bakery")
- **Subdomain:** URL prefix (e.g., "bakery" in bakery.localhost:3000)
- **Template:** Pre-designed website layout for specific industry
- **Component:** Reusable UI element (e.g., Navbar, Hero, Contact)
- **Prisma:** ORM (Object-Relational Mapping) tool for database access
- **SSR:** Server-Side Rendering (HTML generated on server)
- **SEO:** Search Engine Optimization (improving Google rankings)
- **JSON-LD:** Structured data format for search engines
- **Schema.org:** Vocabulary for structured data
- **Middleware:** Code that runs before request reaches route
- **Edge Function:** Code that runs on CDN edge servers
- **Serverless:** Code that runs on-demand without managing servers

---

## 🎓 Learning Path for New Developers

### Week 1: Understand the Stack
1. Learn Next.js basics (routing, components, API routes)
2. Learn Prisma (schema, queries, migrations)
3. Learn Tailwind CSS (utility classes, responsive design)

### Week 2: Understand the Codebase
1. Read README.md, TECH_STACK.md, this document
2. Explore file structure
3. Run locally, test all features
4. Read middleware.ts (understand routing)

### Week 3: Make First Contribution
1. Fix a bug or add small feature
2. Write tests
3. Create pull request
4. Get code review

### Week 4: Deep Dive
1. Understand database schema
2. Understand SEO implementation
3. Understand component architecture
4. Plan larger feature

---

**This document is maintained for AI assistants to provide accurate, contextual help with the codebase.**

**Last Updated:** January 26, 2026  
**Document Version:** 1.0  
**Maintained By:** Development Team
