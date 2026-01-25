# 🚀 Quick Reference Guide - All New Features

## Component Import Statements

```typescript
import BannerCarousel from '@/components/sections/BannerCarousel';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import BusinessHours from '@/components/sections/BusinessHours';
import Tags from '@/components/sections/Tags';
import Locations from '@/components/sections/Locations';
import Footer from '@/components/sections/Footer';
```

## Database Query (Include All Relations)

```typescript
const site = await prisma.site.findFirst({
  where: { subdomain: domain },
  include: {
    navLinks: { orderBy: { order: 'asc' } },
    banners: { orderBy: { order: 'asc' }, where: { isActive: true } },
    services: { orderBy: { order: 'asc' } },
    products: { orderBy: { order: 'asc' }, where: { isActive: true } },
    businessHours: { orderBy: { order: 'asc' } },
    locations: { orderBy: { order: 'asc' } },
    tags: { orderBy: { order: 'asc' } },
    testimonials: { orderBy: { order: 'asc' } }
  }
});
```

## Component Usage

### 1. Banner Carousel
```tsx
{site.showBanners && site.banners.length > 0 && (
  <BannerCarousel
    banners={site.banners}
    brandColor={site.brandColor}
  />
)}
```

### 2. Featured Products
```tsx
{site.showProducts && site.products.length > 0 && (
  <FeaturedProducts
    id="products"
    title={site.productsTitle || "Featured Products"}
    products={site.products}
    brandColor={site.brandColor}
  />
)}
```

### 3. Business Hours
```tsx
{site.showBusinessHours && site.businessHours.length > 0 && (
  <BusinessHours
    id="hours"
    hours={site.businessHours}
    brandColor={site.brandColor}
  />
)}
```

### 4. Tags
```tsx
{site.tags.length > 0 && (
  <Tags
    id="tags"
    title="Tags"
    tags={site.tags}
    brandColor={site.brandColor}
  />
)}
```

### 5. Locations
```tsx
{site.showLocations && site.locations.length > 0 && (
  <Locations
    id="locations"
    title="Our Locations"
    locations={site.locations}
    brandColor={site.brandColor}
  />
)}
```

### 6. Footer
```tsx
<Footer
  siteName={site.name}
  brandColor={site.brandColor}
  facebookUrl={site.facebookUrl}
  instagramUrl={site.instagramUrl}
  twitterUrl={site.twitterUrl}
  linkedinUrl={site.linkedinUrl}
  youtubeUrl={site.youtubeUrl}
  whatsappUrl={site.whatsappUrl}
  contactEmail={site.contactEmail}
  contactPhone={site.contactPhone}
  contactAddress={site.contactAddress}
  categories={site.categories}
  paymentMethods={site.paymentMethods}
/>
```

## Creating Data Examples

### Create Banner
```typescript
await prisma.banner.create({
  data: {
    title: "New Product Launch",
    subtitle: "Get 20% off on pre-orders",
    image: "https://example.com/banner.jpg",
    ctaText: "Shop Now",
    ctaLink: "/products",
    order: 1,
    isActive: true,
    siteId: site.id
  }
});
```

### Create Product
```typescript
await prisma.product.create({
  data: {
    name: "Product Name",
    description: "Product description",
    image: "https://example.com/product.jpg",
    price: "Starting at ₹99,999",
    ctaText: "View Details",
    ctaLink: "/products/product-name",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3"
    ],
    order: 1,
    isActive: true,
    siteId: site.id
  }
});
```

### Create Business Hours
```typescript
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
await prisma.businessHour.createMany({
  data: days.map((day, index) => ({
    day,
    openTime: "10:00 AM",
    closeTime: "08:00 PM",
    isClosed: false,
    order: index + 1,
    siteId: site.id
  }))
});
```

### Create Location
```typescript
await prisma.location.create({
  data: {
    name: "Store Name in City",
    city: "City Name",
    state: "State Name",
    address: "Full Address",
    mapLink: "https://maps.google.com/?q=address",
    order: 1,
    siteId: site.id
  }
});
```

### Create Tag
```typescript
await prisma.tag.create({
  data: {
    name: "Tag Name",
    link: "/products/tag-name",
    order: 1,
    siteId: site.id
  }
});
```

## Update Site Fields

```typescript
await prisma.site.update({
  where: { id: site.id },
  data: {
    // Enable features
    showBanners: true,
    showProducts: true,
    showBusinessHours: true,
    showLocations: true,
    
    // Set titles
    productsTitle: "Featured Products",
    
    // Add categories
    categories: [
      "Category 1",
      "Category 2",
      "Category 3"
    ],
    
    // Add payment methods
    paymentMethods: [
      "Cash",
      "Credit Card",
      "Debit Card",
      "UPI"
    ],
    
    // Add parking info
    parkingInfo: "Free parking available",
    
    // Add social links
    youtubeUrl: "https://youtube.com/channel",
    whatsappUrl: "https://wa.me/1234567890"
  }
});
```

## TypeScript Interfaces

```typescript
interface Banner {
  id: string;
  title?: string;
  subtitle?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  order: number;
  isActive: boolean;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price?: string;
  ctaText: string;
  ctaLink?: string;
  features: string[];
  order: number;
  isActive: boolean;
}

interface BusinessHour {
  id: string;
  day: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
  order: number;
}

interface Location {
  id: string;
  name: string;
  city?: string;
  state?: string;
  address?: string;
  mapLink?: string;
  order: number;
}

interface Tag {
  id: string;
  name: string;
  link?: string;
  order: number;
}
```

## Commands

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed Samsung example
npx tsx prisma/seed-samsung.ts

# Open Prisma Studio
npx prisma studio

# Run dev server
npm run dev
```

## URLs

- **Admin Dashboard**: http://localhost:3000/dashboard
- **Samsung Example**: http://samsung-plaza.localhost:3000
- **Prisma Studio**: http://localhost:5555

## Toggle Features

All features can be toggled on/off:

- `showBanners` - Show carousel
- `showProducts` - Show products section
- `showBusinessHours` - Show business hours
- `showLocations` - Show locations
- `showHero` - Show hero section
- `showAbout` - Show about section
- `showServices` - Show services section
- `showGallery` - Show gallery
- `showTestimonials` - Show testimonials
- `showContact` - Show contact section

Set to `true` to show, `false` to hide.
