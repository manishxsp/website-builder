# Website Builder SaaS

A multi-tenant SaaS platform for creating and managing beautiful websites without coding. Built with Next.js 14, Prisma, PostgreSQL, and Tailwind CSS.

## 🎯 Goal

Build a comprehensive multi-tenant SaaS platform that empowers users to create professional websites effortlessly. The platform provides:

- **No-code website building** with customizable sections
- **Multi-tenant architecture** supporting subdomains and custom domains
- **SEO-optimized** sites with dynamic metadata
- **Scalable backend** with PostgreSQL and Prisma ORM
- **Modern UI** with responsive design and smooth animations
- **Admin panel** for managing sites and content

## 🔧 How It Works

### Architecture Overview

The application uses a **multi-tenant architecture** where each customer gets their own subdomain (e.g., `coffee-shop.localhost:3000`). The middleware intercepts requests and rewrites them to dynamic routes that fetch content from the database.

### 📊 Content Flow: Database → Display

Here's how "Our Story" and "What We Offer" sections appear on your website:

#### 1. **Database Storage** (`prisma/schema.prisma`)
```prisma
model Site {
  // About Section
  aboutTitle   String?  @default("About Us")
  aboutContent String?
  aboutImage   String?
  
  // Services Section
  servicesTitle String? @default("Our Services")
  services      Service[]
}

model Service {
  title       String
  description String
  icon        String?
  order       Int
}
```

#### 2. **Seed Data** (`prisma/seed.ts`)
```typescript
const coffeeSite = await prisma.site.create({
  data: {
    // About Section → "Our Story"
    aboutTitle: "Our Story",
    aboutContent: "Founded in 2020, Artisan Coffee Co. has been dedicated...",
    
    // Services Section → "What We Offer"
    servicesTitle: "What We Offer",
    services: {
      create: [
        {
          title: "Specialty Roasts",
          description: "Hand-selected beans roasted to perfection",
          icon: "☕",
          order: 1
        }
      ]
    }
  }
});
```

#### 3. **Data Fetching** (`src/app/(client)/[domain]/page.tsx`)
```typescript
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
      testimonials: { orderBy: { order: 'asc' } },
      navLinks: { orderBy: { order: 'asc' } }
    }
  });
  return site;
}
```

#### 4. **Rendering Components**
```typescript
// About Section → "Our Story"
{site.showAbout && site.aboutTitle && (
  <About
    id="about"
    title={site.aboutTitle}        // "Our Story"
    content={site.aboutContent}    // "Founded in 2020..."
    image={site.aboutImage}
    brandColor={site.brandColor}
  />
)}

// Services Section → "What We Offer"
{site.showServices && site.services.length > 0 && (
  <Services
    id="services"
    title={site.servicesTitle}     // "What We Offer"
    services={site.services}        // Array of services
    brandColor={site.brandColor}
  />
)}
```

#### 5. **Component Display** (`src/components/sections/About.tsx`)
```typescript
export default function About({ title, content, image, brandColor }) {
  return (
    <section id="about">
      <h2 style={{ color: brandColor }}>{title}</h2>
      <p>{content}</p>
      {image && <img src={image} alt={title} />}
    </section>
  );
}
```

### Request Flow

```
User visits → http://coffee-shop.localhost:3000
     ↓
Middleware detects subdomain "coffee-shop"
     ↓
Rewrites to → /(client)/coffee-shop
     ↓
Page component calls getSiteData("coffee-shop")
     ↓
Database query fetches site + services + testimonials
     ↓
Components render with fetched data
     ↓
User sees → "Our Story" (aboutTitle) + "What We Offer" (servicesTitle)
```

## ✨ Features

### Current Features
- ✅ Multi-tenant subdomain routing
- ✅ Dynamic content rendering from database
- ✅ Sticky navigation with smooth scroll
- ✅ Reusable section components (Hero, About, Services, Gallery, Testimonials, Contact, Navbar)
- ✅ Responsive design with Tailwind CSS
- ✅ Modern animations and transitions
- ✅ SEO-friendly metadata generation
- ✅ Database seeding with sample sites
- ✅ API endpoints for site management
- ✅ Admin dashboard for creating/editing sites
- ✅ Live preview in site editor
- ✅ TypeScript for type safety
- ✅ Modern Next.js 14 with App Router

### Section Components
Each section is a reusable React component that accepts props from the database:

| Component | Database Fields | Purpose |
|-----------|----------------|---------|
| **Navbar** | `navLinks[]` | Sticky navigation with smooth scroll |
| **Hero** | `heroTitle`, `heroSubtitle`, `heroImage`, `heroCTA` | Eye-catching landing section |
| **About** | `aboutTitle`, `aboutContent`, `aboutImage` | Company story/mission |
| **Services** | `servicesTitle`, `services[]` | What you offer |
| **Gallery** | `galleryTitle`, `galleryImages[]` | Photo showcase |
| **Testimonials** | `testimonialsTitle`, `testimonials[]` | Customer reviews |
| **Contact** | `contactTitle`, `contactEmail`, `contactPhone`, `contactAddress` | Contact form & info |

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Middleware**: Custom subdomain routing
- **Deployment**: Vercel/Netlify ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or Supabase)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website-builder-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create `.env` file:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/website_builder_saas"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Test the application**

   Open these URLs in your browser:
   - **Admin Dashboard**: http://localhost:3000/dashboard
   - **Coffee Shop**: http://coffee-shop.localhost:3000
   - **Gym**: http://iron-gym.localhost:3000
   - **Photography**: http://emma-photos.localhost:3000
   - **Car Dealer**: http://premium-auto.localhost:3000

   **Note**: Do a hard refresh (Ctrl+Shift+R) to see the styled version.

## 📁 File Structure

```
website-builder-saas/
├── prisma/
│   ├── schema.prisma          # Database models (Site, Service, Testimonial, NavLink)
│   ├── seed.ts                # Sample data seeding script
│   └── seed-car-dealer.ts     # Car dealer specific seed
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── (admin)/           # Admin panel routes
│   │   │   ├── dashboard/     # Dashboard overview
│   │   │   ├── sites/         # Site management
│   │   │   │   ├── new/       # Create new site
│   │   │   │   └── [id]/      # Edit site with live preview
│   │   │   └── layout.tsx     # Admin layout with sidebar
│   │   ├── (client)/
│   │   │   ├── [domain]/
│   │   │   │   └── page.tsx   # Dynamic site rendering
│   │   │   └── layout.tsx     # Client layout
│   │   ├── api/
│   │   │   └── sites/
│   │   │       ├── route.ts   # GET/POST sites
│   │   │       └── [id]/
│   │   │           └── route.ts # GET/PATCH/DELETE site
│   │   ├── globals.css        # Tailwind + custom animations
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── admin/
│   │   │   └── SiteEditor/    # Site editor with live preview
│   │   └── sections/          # Reusable site sections
│   │       ├── Navbar.tsx     # Sticky navigation
│   │       ├── Hero.tsx       # Hero section
│   │       ├── About.tsx      # About section
│   │       ├── Services.tsx   # Services grid
│   │       ├── Gallery.tsx    # Image gallery
│   │       ├── Testimonials.tsx # Customer reviews
│   │       └── Contact.tsx    # Contact form
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton
│   │   └── auth.ts            # Auth utilities (future)
│   ├── middleware.ts          # Multi-tenant routing
│   └── types/                 # TypeScript types
├── .env                       # Environment variables
├── package.json               # Dependencies and scripts
├── postcss.config.js          # PostCSS for Tailwind
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript config
└── README.md                  # This file
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sites` | List all sites |
| POST | `/api/sites` | Create new site |
| GET | `/api/sites/[id]` | Get site by ID |
| PATCH | `/api/sites/[id]` | Update site |
| DELETE | `/api/sites/[id]` | Delete site |

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 🎨 Customization

### Creating a New Site

1. Go to http://localhost:3000/dashboard
2. Click "Create New Site"
3. Fill in the form:
   - **Site Name**: Your business name
   - **Subdomain**: URL slug (e.g., "my-business")
   - **Template**: Choose from Business, Car Dealer, Restaurant, Portfolio
4. Click "Create Site"
5. Visit `http://your-subdomain.localhost:3000`

### Editing Content

All content is stored in the database and can be edited through:
- **Admin Dashboard**: Visual editor (coming soon)
- **Prisma Studio**: `npm run db:studio`
- **Direct Database**: Update the `Site` table

### Styling

- **Brand Color**: Stored in `site.brandColor` (hex color)
- **Font Family**: Stored in `site.fontFamily`
- **Animations**: Defined in `src/app/globals.css`
- **Components**: Styled with Tailwind classes in `src/components/sections/`

## 🐛 Troubleshooting

### Styles Not Showing?
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Try incognito/private mode
4. Restart dev server: `npm run dev`

### Database Issues?
```bash
# Reset database
npx prisma db push --force-reset

# Regenerate client
npx prisma generate

# Reseed data
npm run db:seed
```

### Subdomain Not Working?
- Ensure you're using `localhost:3000`, not `127.0.0.1:3000`
- Check middleware logs in terminal
- Verify site exists in database: `npm run db:studio`

## 📋 Development Roadmap

### ✅ Phase 1: Foundation
- Multi-tenant middleware
- Basic template rendering
- Tailwind CSS setup

### ✅ Phase 2: Database Integration
- Prisma schema design
- API routes (CRUD)
- Dynamic rendering
- Database seeding

### ✅ Phase 3: Admin Panel
- Dashboard overview
- Site creation form
- Site listing
- Live preview editor

### 🚧 Phase 4: Advanced Features (In Progress)
- Drag-and-drop section editor
- Image upload
- Custom domain support
- User authentication

### 🔮 Phase 5: Production (Planned)
- Payment integration
- Template marketplace
- Analytics dashboard
- Multi-user support

---

## 📚 Comprehensive Documentation

This project includes extensive documentation for different audiences:

### For Business & Commercialization
- **[COMMERCIALIZATION_GUIDE.md](./COMMERCIALIZATION_GUIDE.md)** - Complete guide to selling websites
  - Business models & pricing strategies
  - Customer acquisition & retention
  - Real-world challenges & solutions
  - Scalability planning
  - Revenue projections

### For Developers & Technical Teams
- **[TECH_STACK.md](./TECH_STACK.md)** - Complete technical architecture
  - Technology stack breakdown
  - System architecture diagrams
  - Database schema details
  - Performance optimizations
  - Deployment strategies

### For AI Assistants & Code Analysis
- **[AI_PROJECT_OVERVIEW.md](./AI_PROJECT_OVERVIEW.md)** - AI-readable project context
  - Core concepts explained
  - Detailed data flow
  - Key algorithms
  - Business logic
  - Complete glossary

### For SEO & Marketing
- **[SEO_FEATURES_ANALYSIS.md](./SEO_FEATURES_ANALYSIS.md)** - SEO implementation analysis
- **[SEO_IMPLEMENTATION_SUMMARY.md](./SEO_IMPLEMENTATION_SUMMARY.md)** - SEO features summary
- **[SEO_QUICK_REFERENCE.md](./SEO_QUICK_REFERENCE.md)** - Quick SEO reference

### Quick References
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Component usage & examples
- **[ADMIN_INTERFACE_GUIDE.md](./ADMIN_INTERFACE_GUIDE.md)** - Admin panel guide

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://prisma.io/) - Database toolkit
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Unsplash](https://unsplash.com/) - Sample images

---

Built with ❤️ using Next.js and modern web technologies.
