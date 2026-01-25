# 📊 Content Flow Explanation

## How "Our Story" and "What We Offer" Appear on Your Website

### Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    1. DATABASE (PostgreSQL)                      │
│                                                                  │
│  Site Table:                                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ id: "cm123..."                                            │  │
│  │ name: "Artisan Coffee Co."                                │  │
│  │ subdomain: "coffee-shop"                                  │  │
│  │ aboutTitle: "Our Story"          ← This becomes heading   │  │
│  │ aboutContent: "Founded in 2020..." ← This becomes text    │  │
│  │ servicesTitle: "What We Offer"   ← This becomes heading   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Service Table (related to Site):                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ title: "Specialty Roasts"        ← Service card title     │  │
│  │ description: "Hand-selected..."  ← Service card text      │  │
│  │ icon: "☕"                        ← Service card icon      │  │
│  │ order: 1                          ← Display order         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              2. SEED DATA (prisma/seed.ts)                       │
│                                                                  │
│  const coffeeSite = await prisma.site.create({                  │
│    data: {                                                       │
│      aboutTitle: "Our Story",        ← Sets the title           │
│      aboutContent: "Founded in...",  ← Sets the content         │
│      servicesTitle: "What We Offer", ← Sets the title           │
│      services: {                                                 │
│        create: [                                                 │
│          {                                                       │
│            title: "Specialty Roasts",                            │
│            description: "Hand-selected beans...",                │
│            icon: "☕"                                             │
│          }                                                       │
│        ]                                                         │
│      }                                                           │
│    }                                                             │
│  });                                                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│         3. USER VISITS WEBSITE                                   │
│                                                                  │
│  Browser → http://coffee-shop.localhost:3000                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│         4. MIDDLEWARE (src/middleware.ts)                        │
│                                                                  │
│  - Detects subdomain: "coffee-shop"                             │
│  - Rewrites URL to: /(client)/coffee-shop                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│    5. PAGE COMPONENT (src/app/(client)/[domain]/page.tsx)       │
│                                                                  │
│  async function getSiteData(domain: string) {                   │
│    const site = await prisma.site.findFirst({                   │
│      where: { subdomain: domain },  ← Finds "coffee-shop"       │
│      include: {                                                  │
│        services: true,              ← Includes services         │
│        testimonials: true,                                       │
│        navLinks: true                                            │
│      }                                                           │
│    });                                                           │
│    return site;                                                  │
│  }                                                               │
│                                                                  │
│  Returns:                                                        │
│  {                                                               │
│    aboutTitle: "Our Story",                                      │
│    aboutContent: "Founded in 2020...",                           │
│    servicesTitle: "What We Offer",                               │
│    services: [                                                   │
│      { title: "Specialty Roasts", ... }                          │
│    ]                                                             │
│  }                                                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│         6. RENDER COMPONENTS                                     │
│                                                                  │
│  {site.showAbout && (                                            │
│    <About                                                        │
│      title={site.aboutTitle}      ← "Our Story"                 │
│      content={site.aboutContent}  ← "Founded in 2020..."        │
│    />                                                            │
│  )}                                                              │
│                                                                  │
│  {site.showServices && (                                         │
│    <Services                                                     │
│      title={site.servicesTitle}   ← "What We Offer"             │
│      services={site.services}     ← Array of services           │
│    />                                                            │
│  )}                                                              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│    7. COMPONENT RENDERS (src/components/sections/About.tsx)     │
│                                                                  │
│  export default function About({ title, content }) {             │
│    return (                                                      │
│      <section>                                                   │
│        <h2>{title}</h2>        ← Displays "Our Story"           │
│        <p>{content}</p>        ← Displays "Founded in 2020..."  │
│      </section>                                                  │
│    );                                                            │
│  }                                                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│         8. USER SEES ON SCREEN                                   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Our Story                              │  │
│  │                                                           │  │
│  │  Founded in 2020, Artisan Coffee Co. has been            │  │
│  │  dedicated to sourcing the finest beans...               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  What We Offer                            │  │
│  │                                                           │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │  │
│  │  │     ☕      │  │     📦      │  │     🎓      │      │  │
│  │  │ Specialty   │  │   Coffee    │  │  Brewing    │      │  │
│  │  │   Roasts    │  │Subscriptions│  │   Classes   │      │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Key Points

### 1. **Database Fields Map to UI Elements**

| Database Field | UI Element | Example |
|----------------|------------|---------|
| `aboutTitle` | Section Heading | "Our Story" |
| `aboutContent` | Paragraph Text | "Founded in 2020..." |
| `servicesTitle` | Section Heading | "What We Offer" |
| `services[].title` | Service Card Title | "Specialty Roasts" |
| `services[].description` | Service Card Text | "Hand-selected beans..." |
| `services[].icon` | Service Card Icon | ☕ |

### 2. **Visibility Toggles**

Each section has a boolean flag in the database:

```typescript
showAbout: true      // If false, "Our Story" won't appear
showServices: true   // If false, "What We Offer" won't appear
showGallery: false   // Gallery is hidden
```

### 3. **Customization Per Site**

Each site in the database can have different content:

**Coffee Shop:**
- aboutTitle: "Our Story"
- servicesTitle: "What We Offer"

**Gym:**
- aboutTitle: "Why Choose Iron Works"
- servicesTitle: "Membership Benefits"

**Car Dealer:**
- aboutTitle: "About Our Dealership"
- servicesTitle: "Our Services"

### 4. **How to Change Content**

#### Option A: Through Admin Dashboard (Future)
1. Go to http://localhost:3000/sites
2. Click "Edit" on a site
3. Update fields in the form
4. Click "Save"

#### Option B: Through Prisma Studio (Current)
1. Run `npm run db:studio`
2. Open http://localhost:5555
3. Click on "Site" table
4. Edit the row for your site
5. Click "Save"

#### Option C: Through Seed File
1. Edit `prisma/seed.ts`
2. Change the values:
   ```typescript
   aboutTitle: "Your New Title",
   aboutContent: "Your new content...",
   ```
3. Run `npm run db:seed`

## Example: Adding a New Service

### 1. In Seed File (`prisma/seed.ts`)
```typescript
services: {
  create: [
    {
      title: "New Service",
      description: "Description of new service",
      icon: "🎉",
      order: 4  // Display order
    }
  ]
}
```

### 2. In Database (Prisma Studio)
- Open Site record
- Scroll to "services" relation
- Click "Add new Service"
- Fill in: title, description, icon, order
- Save

### 3. Result on Website
A new card appears in the "What We Offer" section with your title, description, and icon.

## Summary

The content flows like this:

**Database** → **Seed/API** → **Page Query** → **Component Props** → **Rendered HTML** → **User Sees**

Every piece of text, image, or setting you see on the website comes from the database, making it fully dynamic and customizable!
