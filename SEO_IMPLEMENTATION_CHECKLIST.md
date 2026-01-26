# SEO Implementation Checklist
## Quick Reference Guide

---

## ✅ PHASE 1: QUICK WINS (Week 1-2)

### 1. Database Schema Updates

#### Site Model Enhancement
```bash
# Add to prisma/schema.prisma
```

- [ ] Add `businessType` field (default: "LocalBusiness")
- [ ] Add `industryCategory` field (optional)
- [ ] Add `primaryKeywords` array
- [ ] Add `secondaryKeywords` array
- [ ] Add `localModifiers` array
- [ ] Add `aggregateRating` field
- [ ] Add `totalReviews` field
- [ ] Add `googleAnalyticsId` field
- [ ] Add `googleTagManagerId` field
- [ ] Add `googleSiteVerification` field

#### Product Model Enhancement
- [ ] Add `slug` field (unique per site)
- [ ] Add `keywords` array
- [ ] Add `metaTitle` field
- [ ] Add `metaDescription` field
- [ ] Add `vehicleType` field (optional)
- [ ] Add `make` field (optional)
- [ ] Add `model` field (optional)
- [ ] Add `year` field (optional)
- [ ] Add `mileage` field (optional)
- [ ] Add `vin` field (optional)
- [ ] Add `fuelType` field (optional)
- [ ] Add `condition` field (optional)
- [ ] Add `ingredients` array (optional)
- [ ] Add `allergens` array (optional)
- [ ] Add `servingSize` field (optional)
- [ ] Add `dietaryInfo` array (optional)

#### New Models
- [ ] Create `FAQ` model
- [ ] Create `Image` model (for alt text management)

```bash
# Run migrations
npx prisma db push
npx prisma generate
```

---

### 2. JSON-LD Schema Enhancements

#### Update `src/components/seo/JsonLd.tsx`

- [ ] Add business type detection
- [ ] Implement `Bakery` schema for bakeries
- [ ] Implement `AutoDealer` schema for car dealerships
- [ ] Implement `Restaurant` schema for restaurants
- [ ] Add `Car` product schema for vehicles
- [ ] Add `FoodItem` schema for bakery products
- [ ] Implement `AggregateRating` schema
- [ ] Add `FAQPage` schema support

**Example Implementation:**
```tsx
function getBusinessSchema(site: any) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': site.businessType || 'LocalBusiness',
    name: site.name,
    description: site.description,
    // ... rest of schema
  };

  // Add aggregate rating if available
  if (site.aggregateRating && site.totalReviews > 0) {
    baseSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: site.aggregateRating.toFixed(1),
      reviewCount: site.totalReviews,
    };
  }

  return baseSchema;
}
```

---

### 3. Admin Panel Updates

#### Site Editor Form (`src/app/(admin)/sites/[id]/page.tsx`)

- [ ] Add business type selector dropdown
  - Options: LocalBusiness, Bakery, AutoDealer, Restaurant, etc.
- [ ] Add industry category input
- [ ] Add primary keywords input (tags/chips)
- [ ] Add secondary keywords input
- [ ] Add local modifiers input
- [ ] Add Google Analytics ID field
- [ ] Add Google Tag Manager ID field
- [ ] Add Google Site Verification field

#### Product Form Enhancement
- [ ] Add slug auto-generation from product name
- [ ] Add keywords input
- [ ] Add meta title field
- [ ] Add meta description field
- [ ] Add conditional vehicle fields (show if businessType = AutoDealer)
  - Make, Model, Year, Mileage, VIN, Fuel Type, Condition
- [ ] Add conditional bakery fields (show if businessType = Bakery)
  - Ingredients, Allergens, Serving Size, Dietary Info

---

### 4. FAQ Component

#### Create `src/components/sections/FAQ.tsx`
- [ ] Create FAQ section component
- [ ] Add accordion/details UI
- [ ] Style with Tailwind CSS
- [ ] Add to client page rendering

#### Create FAQ Admin Interface
- [ ] Create FAQ management page
- [ ] Add CRUD operations for FAQs
- [ ] Add ordering/sorting

---

### 5. Image Alt Text Management

#### Create Image Model
- [ ] Add Image model to schema
- [ ] Create image upload interface
- [ ] Add alt text editor
- [ ] Add title and caption fields
- [ ] Add width/height fields

#### Update Components
- [ ] Update Hero component to use alt text
- [ ] Update Gallery component
- [ ] Update Product component
- [ ] Update About section

---

### 6. Aggregate Rating Calculation

#### Create Service Function
```typescript
// src/lib/seo-utils.ts
export async function updateSiteRating(siteId: string) {
  const testimonials = await prisma.testimonial.findMany({
    where: { siteId }
  });
  
  if (testimonials.length === 0) return;
  
  const avgRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;
  
  await prisma.site.update({
    where: { id: siteId },
    data: {
      aggregateRating: avgRating,
      totalReviews: testimonials.length
    }
  });
}
```

- [ ] Create `src/lib/seo-utils.ts`
- [ ] Implement `updateSiteRating` function
- [ ] Call after testimonial create/update/delete
- [ ] Add to testimonial API routes

---

### 7. Core Web Vitals Optimization

#### LCP (Largest Contentful Paint)
- [ ] Add hero image preloading
- [ ] Set `fetchpriority="high"` on hero images
- [ ] Optimize image sizes

```tsx
// In layout or metadata
<link rel="preload" as="image" href={heroImage} fetchpriority="high" />
```

#### CLS (Cumulative Layout Shift)
- [ ] Add explicit width/height to all images
- [ ] Add aspect-ratio CSS
- [ ] Reserve space for dynamic content

```tsx
<img 
  src={image} 
  width={800} 
  height={600} 
  alt={altText}
  className="aspect-[4/3]"
/>
```

#### FID (First Input Delay)
- [ ] Defer non-critical scripts
- [ ] Use dynamic imports for heavy components
- [ ] Optimize JavaScript bundles

---

### 8. Enhanced Sitemap

#### Update `src/app/sitemap.ts`
- [ ] Include all site pages
- [ ] Add category pages (when implemented)
- [ ] Add product pages (when implemented)
- [ ] Set appropriate priorities
- [ ] Set change frequencies

---

### 9. Analytics Integration

#### Update Client Layout
- [ ] Add Google Analytics script
- [ ] Add Google Tag Manager script
- [ ] Add Facebook Pixel (optional)
- [ ] Conditional rendering based on site settings

```tsx
// src/app/(client)/layout.tsx
{site.googleAnalyticsId && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${site.googleAnalyticsId}`}
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${site.googleAnalyticsId}');
      `}
    </Script>
  </>
)}
```

---

## ✅ PHASE 2: DYNAMIC PAGES (Week 3-4)

### 1. Category System

#### Database Schema
- [ ] Create `Category` model
- [ ] Add `slug` field (unique per site)
- [ ] Add SEO fields (metaTitle, metaDescription, keywords)
- [ ] Add `focusKeyword` field
- [ ] Link products to categories

#### Routes
- [ ] Create `src/app/(client)/[domain]/[category]/page.tsx`
- [ ] Create `src/app/(client)/[domain]/[category]/[product]/page.tsx`
- [ ] Implement breadcrumb navigation
- [ ] Add category listing page

#### Admin Interface
- [ ] Create category management page
- [ ] Add category CRUD operations
- [ ] Add product-category assignment
- [ ] Add slug auto-generation

---

### 2. Product Detail Pages

#### Create Product Page Component
- [ ] Create product detail layout
- [ ] Add product images gallery
- [ ] Add product specifications
- [ ] Add related products section
- [ ] Add breadcrumbs
- [ ] Add social sharing buttons

#### SEO Implementation
- [ ] Generate product-specific metadata
- [ ] Add Product schema (JSON-LD)
- [ ] Add BreadcrumbList schema
- [ ] Add image alt texts

---

### 3. Multi-Location SEO

#### Enhance Location Model
- [ ] Add phone, email fields
- [ ] Add business hours
- [ ] Add latitude/longitude
- [ ] Add Google Place ID
- [ ] Add SEO fields (metaTitle, metaDescription, keywords)

#### Location Pages
- [ ] Create location detail pages
- [ ] Add embedded Google Maps
- [ ] Add location-specific schema
- [ ] Add driving directions

---

### 4. Keyword Suggestion Tool

#### Create Keyword Templates
```typescript
// src/lib/keyword-templates.ts
export const keywordTemplates = {
  bakery: {
    primary: [
      "bakery near me",
      "custom {product} {city}",
      "fresh bread {city}"
    ],
    longTail: [
      "gluten-free bakery in {city}",
      "best {product} delivery {city}",
      "vegan {product} near me"
    ],
    intent: [
      "{product} prices",
      "how to order custom {product}",
      "bakery open Sunday"
    ]
  },
  carDealer: {
    primary: [
      "used cars {city}",
      "{brand} dealer near me",
      "certified pre-owned {model}"
    ],
    longTail: [
      "best price {year} {brand} {model} {city}",
      "low mileage used {brand} {model}",
      "car financing bad credit {city}"
    ],
    intent: [
      "car trade-in value",
      "lease vs buy calculator",
      "{model} reviews"
    ]
  }
};
```

- [ ] Create keyword template system
- [ ] Add keyword suggestion UI in admin
- [ ] Implement keyword replacement logic
- [ ] Add keyword density checker

---

### 5. HowTo Guides

#### Database Schema
- [ ] Create `HowToGuide` model
- [ ] Create `HowToStep` model
- [ ] Add ordering

#### Component
- [ ] Create HowTo section component
- [ ] Add step-by-step UI
- [ ] Add HowTo schema (JSON-LD)

#### Admin Interface
- [ ] Create guide management page
- [ ] Add step editor
- [ ] Add image upload for steps

---

## ✅ PHASE 3: INDUSTRY FEATURES (Week 5-6)

### 1. Vehicle Comparison Tool

#### Component
- [ ] Create `src/components/sections/VehicleComparison.tsx`
- [ ] Add vehicle selector (max 3)
- [ ] Create comparison table
- [ ] Add specs comparison
- [ ] Add price comparison
- [ ] Add feature comparison

#### Features
- [ ] Side-by-side comparison
- [ ] Highlight differences
- [ ] Print comparison
- [ ] Share comparison

---

### 2. Finance Calculator

#### Component
- [ ] Create `src/components/sections/FinanceCalculator.tsx`
- [ ] Add input fields (price, down payment, interest rate, term)
- [ ] Calculate monthly payment
- [ ] Show total interest
- [ ] Show amortization schedule
- [ ] Add print functionality

---

### 3. Bakery Custom Order Form

#### Enhance Contact Form
- [ ] Add flavor selector dropdown
- [ ] Add size/tier selector
- [ ] Add filling options
- [ ] Add frosting options
- [ ] Add date picker (delivery date)
- [ ] Add photo upload
- [ ] Add special instructions field

---

### 4. Inventory Filtering

#### Client-Side Filters
- [ ] Add filter UI component
- [ ] Filter by make/brand
- [ ] Filter by model
- [ ] Filter by year range
- [ ] Filter by price range
- [ ] Filter by mileage
- [ ] Filter by fuel type
- [ ] Filter by condition
- [ ] Add sort options

#### URL Parameters
- [ ] Implement filter state in URL
- [ ] Make filters crawlable
- [ ] Add canonical tags

---

### 5. Delivery Zones

#### Database Schema
- [ ] Create `DeliveryZone` model
- [ ] Add zip code field
- [ ] Add delivery fee
- [ ] Add minimum order

#### Component
- [ ] Create delivery zone checker
- [ ] Add zip code input
- [ ] Show delivery fee
- [ ] Show estimated delivery time

---

## 🧪 TESTING CHECKLIST

### SEO Testing
- [ ] Test structured data with Google Rich Results Test
- [ ] Validate sitemap.xml
- [ ] Check robots.txt
- [ ] Test meta tags with Facebook Debugger
- [ ] Test Twitter Cards
- [ ] Check canonical URLs
- [ ] Verify no duplicate content

### Performance Testing
- [ ] Run Google PageSpeed Insights
- [ ] Check Core Web Vitals
- [ ] Test mobile responsiveness
- [ ] Check image optimization
- [ ] Verify lazy loading
- [ ] Test on slow 3G connection

### Functionality Testing
- [ ] Test all new forms
- [ ] Verify data persistence
- [ ] Check admin CRUD operations
- [ ] Test dynamic routing
- [ ] Verify breadcrumbs
- [ ] Test filters and sorting

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

---

## 📊 MONITORING & ANALYTICS

### Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Analytics goals
- [ ] Configure conversion tracking
- [ ] Set up custom events

### Metrics to Track
- [ ] Organic traffic
- [ ] Keyword rankings
- [ ] Click-through rate (CTR)
- [ ] Bounce rate
- [ ] Average session duration
- [ ] Pages per session
- [ ] Conversion rate
- [ ] Core Web Vitals scores

---

## 🚀 DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] Run database migrations
- [ ] Update environment variables
- [ ] Test on staging environment
- [ ] Backup production database
- [ ] Review all changes

### Deployment
- [ ] Deploy to production
- [ ] Verify database migrations
- [ ] Check all routes working
- [ ] Test critical user flows
- [ ] Monitor error logs

### Post-Deployment
- [ ] Submit updated sitemap
- [ ] Request Google re-crawl
- [ ] Monitor analytics
- [ ] Check for errors
- [ ] Gather user feedback

---

## 📝 DOCUMENTATION

### Update Documentation
- [ ] Update README.md
- [ ] Document new features
- [ ] Add API documentation
- [ ] Create user guides
- [ ] Update schema documentation

### Training
- [ ] Create admin training materials
- [ ] Record video tutorials
- [ ] Write best practices guide
- [ ] Create SEO optimization guide

---

## ✅ COMPLETION CRITERIA

### Phase 1 Complete When:
- [ ] All database migrations successful
- [ ] Industry-specific schemas working
- [ ] FAQ component live
- [ ] Image alt text management working
- [ ] Aggregate ratings calculating
- [ ] Core Web Vitals improved
- [ ] Analytics tracking active

### Phase 2 Complete When:
- [ ] Category pages live
- [ ] Product detail pages working
- [ ] Multi-location SEO implemented
- [ ] Keyword suggestions working
- [ ] HowTo guides functional

### Phase 3 Complete When:
- [ ] Vehicle comparison tool live
- [ ] Finance calculator working
- [ ] Enhanced order forms functional
- [ ] Inventory filtering working
- [ ] All industry features tested

---

**Last Updated:** January 26, 2026  
**Version:** 1.0  
**Status:** Ready for Implementation
