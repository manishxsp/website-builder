# 🎨 New Features Documentation

## Overview

Your website builder now includes comprehensive features for creating professional business websites with:

- 🎠 **Banner Carousel** - Multiple rotating hero banners
- 🏷️ **Tags** - Product/service tags with optional links
- ⏰ **Business Hours** - Operating hours display
- 🌟 **Featured Products** - Product showcase with images, prices, and CTAs
- 📍 **Locations** - Multiple store/office locations
- 👥 **Social Links** - Complete social media integration in footer
- 💳 **Payment Methods** - Display accepted payment options
- 📂 **Categories** - Organize your offerings

## Database Schema

### New Tables

#### 1. **Banner** (Carousel Slides)
```prisma
model Banner {
  id       String   // Unique ID
  title    String?  // Banner headline
  subtitle String?  // Banner subtext
  image    String   // Banner image URL
  ctaText  String?  // Button text (e.g., "Shop Now")
  ctaLink  String?  // Button link
  order    Int      // Display order
  isActive Boolean  // Show/hide banner
  siteId   String   // Related site
}
```

**Example:**
```typescript
{
  title: "New MG Hector Arrives",
  subtitle: "Experience luxury and performance",
  image: "https://example.com/banner.jpg",
  ctaText: "Book Test Drive",
  ctaLink: "/test-drive",
  order: 1
}
```

#### 2. **Product** (Featured Products)
```prisma
model Product {
  id          String    // Unique ID
  name        String    // Product name
  description String?   // Product description
  image       String?   // Product image
  price       String?   // Display price
  ctaText     String    // Button text
  ctaLink     String?   // Button link
  features    String[]  // Array of features
  order       Int       // Display order
  isActive    Boolean   // Show/hide product
  siteId      String    // Related site
}
```

**Example:**
```typescript
{
  name: "MG Hector",
  description: "LED Headlamps and DRLs...",
  image: "https://example.com/hector.jpg",
  price: "Starting Price ₹ 11,99,000",
  ctaText: "View Details",
  ctaLink: "/products/hector",
  features: [
    "LED Headlamps and DRLs",
    "Diamond Cut Multispoke Alloy Wheels",
    "Chrome DLO Garnish"
  ],
  order: 1
}
```

#### 3. **BusinessHour**
```prisma
model BusinessHour {
  id        String   // Unique ID
  day       String   // "Monday", "Tuesday", etc.
  openTime  String   // "10:00 AM"
  closeTime String   // "08:00 PM"
  isClosed  Boolean  // Is closed on this day
  order     Int      // Display order
  siteId    String   // Related site
}
```

**Example:**
```typescript
{
  day: "Monday",
  openTime: "11:00 AM",
  closeTime: "08:00 PM",
  isClosed: false,
  order: 1
}
```

#### 4. **Location** (Stores/Offices)
```prisma
model Location {
  id      String   // Unique ID
  name    String   // "Samsung SmartPlaza in Haryana"
  city    String?  // "Gurugram"
  state   String?  // "Haryana"
  address String?  // Full address
  mapLink String?  // Google Maps link
  order   Int      // Display order
  siteId  String   // Related site
}
```

**Example:**
```typescript
{
  name: "Samsung SmartPlaza in Haryana",
  city: "Gurugram",
  state: "Haryana",
  address: "7JWV+G28+HQ, Gurugram, Haryana, India",
  mapLink: "https://maps.google.com/...",
  order: 1
}
```

#### 5. **Tag**
```prisma
model Tag {
  id     String   // Unique ID
  name   String   // "Galaxy S25", "Galaxy S25 Ultra"
  link   String?  // Optional link
  order  Int      // Display order
  siteId String   // Related site
}
```

**Example:**
```typescript
{
  name: "Galaxy S25",
  link: "/products/galaxy-s25",
  order: 1
}
```

### Updated Site Model

New fields added to the `Site` table:

```prisma
model Site {
  // ... existing fields ...
  
  // Carousel
  banners      Banner[]
  showBanners  Boolean @default(false)
  
  // Products
  productsTitle String?  @default("Featured Products")
  products      Product[]
  showProducts  Boolean  @default(false)
  
  // Business Hours
  businessHours     BusinessHour[]
  showBusinessHours Boolean @default(false)
  
  // Locations
  locations     Location[]
  showLocations Boolean @default(false)
  
  // Tags & Categories
  tags       Tag[]
  categories String[] // Array of category names
  
  // Payment & Parking
  paymentMethods String[] // ["Cash", "Credit Card", "UPI"]
  parkingInfo    String?  // "Paid parking on site"
  
  // Social Media (Extended)
  youtubeUrl   String?
  whatsappUrl  String?
  
  // Hero CTA Link
  heroCTALink  String?
}
```

## Components

### 1. BannerCarousel
**File:** `src/components/sections/BannerCarousel.tsx`

**Features:**
- Auto-play with 5-second intervals
- Navigation arrows
- Dot indicators
- Pause on hover
- Smooth transitions

**Usage:**
```tsx
<BannerCarousel
  banners={site.banners}
  brandColor={site.brandColor}
/>
```

### 2. FeaturedProducts
**File:** `src/components/sections/FeaturedProducts.tsx`

**Features:**
- Product cards with images
- Price display
- Feature list (checkmarks)
- CTA buttons
- Hover effects

**Usage:**
```tsx
<FeaturedProducts
  id="products"
  title={site.productsTitle}
  products={site.products}
  brandColor={site.brandColor}
/>
```

### 3. BusinessHours
**File:** `src/components/sections/BusinessHours.tsx`

**Features:**
- Day-wise hours display
- Closed day indication
- Clock icon
- Responsive grid

**Usage:**
```tsx
<BusinessHours
  id="hours"
  hours={site.businessHours}
  brandColor={site.brandColor}
/>
```

### 4. Tags
**File:** `src/components/sections/Tags.tsx`

**Features:**
- Pill-style tags
- Optional links
- Hover effects
- Brand color theming

**Usage:**
```tsx
<Tags
  id="tags"
  title="Tags"
  tags={site.tags}
  brandColor={site.brandColor}
/>
```

### 5. Locations
**File:** `src/components/sections/Locations.tsx`

**Features:**
- Location cards
- Address display
- Map links
- City/state info

**Usage:**
```tsx
<Locations
  id="locations"
  title="Our Locations"
  locations={site.locations}
  brandColor={site.brandColor}
/>
```

### 6. Footer
**File:** `src/components/sections/Footer.tsx`

**Features:**
- Social media icons (Facebook, Instagram, Twitter, LinkedIn, YouTube, WhatsApp)
- Contact information
- Categories list
- Payment methods
- Copyright

**Usage:**
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

## How to Use

### Creating a Site with All Features

```typescript
const site = await prisma.site.create({
  data: {
    name: "Samsung SmartPlaza",
    subdomain: "samsung-plaza",
    brandColor: "#1428A0",
    
    // Enable features
    showBanners: true,
    showProducts: true,
    showBusinessHours: true,
    showLocations: true,
    
    // Categories & Payment
    categories: [
      "Electronics Retail And Repair Shop",
      "Refrigerator Shop",
      "Washing Machine & Dryer Shop"
    ],
    paymentMethods: [
      "Cash",
      "Credit Card",
      "Debit Card",
      "UPI",
      "Online Payment"
    ],
    parkingInfo: "Paid parking on site",
    
    // Social Links
    facebookUrl: "https://facebook.com/samsungplaza",
    instagramUrl: "https://instagram.com/samsungplaza",
    youtubeUrl: "https://youtube.com/samsungplaza",
    whatsappUrl: "https://wa.me/1234567890",
    
    // Banners
    banners: {
      create: [
        {
          title: "Galaxy S25 Ultra",
          subtitle: "Pre-order now and get exclusive offers",
          image: "https://example.com/banner1.jpg",
          ctaText: "Pre-Order Now",
          ctaLink: "/pre-order",
          order: 1
        },
        {
          title: "MG ZS EV",
          subtitle: "Driving is Living",
          image: "https://example.com/banner2.jpg",
          ctaText: "Book Test Drive",
          ctaLink: "/test-drive",
          order: 2
        }
      ]
    },
    
    // Products
    products: {
      create: [
        {
          name: "MG Hector",
          description: "Premium SUV with advanced features",
          image: "https://example.com/hector.jpg",
          price: "Starting Price ₹ 11,99,000",
          ctaText: "View Details",
          ctaLink: "/products/hector",
          features: [
            "LED Headlamps and DRLs",
            "Diamond Cut Multispoke Alloy Wheels",
            "Chrome DLO Garnish",
            "Roof Rails and Side Stepper Finish"
          ],
          order: 1
        }
      ]
    },
    
    // Business Hours
    businessHours: {
      create: [
        { day: "Monday", openTime: "11:00 AM", closeTime: "08:00 PM", order: 1 },
        { day: "Tuesday", openTime: "11:00 AM", closeTime: "08:00 PM", order: 2 },
        { day: "Wednesday", openTime: "11:00 AM", closeTime: "08:00 PM", order: 3 },
        { day: "Thursday", openTime: "11:00 AM", closeTime: "08:00 PM", order: 4 },
        { day: "Friday", openTime: "11:00 AM", closeTime: "08:00 PM", order: 5 },
        { day: "Saturday", openTime: "11:00 AM", closeTime: "08:00 PM", order: 6 },
        { day: "Sunday", openTime: "11:00 AM", closeTime: "08:00 PM", order: 7 }
      ]
    },
    
    // Locations
    locations: {
      create: [
        {
          name: "Samsung SmartPlaza in Haryana",
          city: "Gurugram",
          state: "Haryana",
          address: "7JWV+G28+HQ, Gurugram, Haryana, India",
          mapLink: "https://maps.google.com/?q=7JWV+G28+HQ",
          order: 1
        },
        {
          name: "Samsung SmartPlaza in Gurugram",
          city: "Gurugram",
          state: "Haryana",
          order: 2
        }
      ]
    },
    
    // Tags
    tags: {
      create: [
        { name: "Galaxy S25", link: "/products/galaxy-s25", order: 1 },
        { name: "Galaxy S25 Ultra", link: "/products/galaxy-s25-ultra", order: 2 },
        { name: "Galaxy S25+", link: "/products/galaxy-s25-plus", order: 3 },
        { name: "Buds 3 Pro", link: "/products/buds-3-pro", order: 4 },
        { name: "Galaxy Watch7", link: "/products/galaxy-watch7", order: 5 }
      ]
    }
  }
});
```

## Field Reference

### All Available Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `showBanners` | Boolean | Show carousel | `true` |
| `showProducts` | Boolean | Show products section | `true` |
| `showBusinessHours` | Boolean | Show business hours | `true` |
| `showLocations` | Boolean | Show locations | `true` |
| `productsTitle` | String | Products section title | "Featured Products" |
| `categories` | String[] | Category names | `["Electronics", "Appliances"]` |
| `paymentMethods` | String[] | Payment options | `["Cash", "Card", "UPI"]` |
| `parkingInfo` | String | Parking details | "Free parking available" |
| `youtubeUrl` | String | YouTube link | "https://youtube.com/..." |
| `whatsappUrl` | String | WhatsApp link | "https://wa.me/1234567890" |
| `heroCTALink` | String | Hero button link | "/contact" |

## Migration Guide

If you have existing sites, run:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Reseed with new data (optional)
npm run db:seed
```

## Next Steps

1. **Update your page component** to include new sections
2. **Create seed data** with sample banners, products, etc.
3. **Test each feature** individually
4. **Customize styling** to match your brand

All components are fully responsive and follow the same design system!
