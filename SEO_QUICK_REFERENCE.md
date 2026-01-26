# 🚀 SEO Quick Reference Card

## 🌐 Live Sites (Port 3001)

| Site | URL | Type | Features |
|------|-----|------|----------|
| 🎂 Sweet Haven Bakery | http://sweet-haven.localhost:3000 | Bakery | Wedding cakes, Vegan options, FAQs |
| 🚗 Premium Motors | http://premium-motors.localhost:3000 | AutoDealer | Tesla, BMW, Mercedes, Financing |
| 🏎️ Skoda India | http://skoda-india.localhost:3000 | AutoDealer | Kushaq, Slavia, TSI Engine |
| 📱 Samsung Plaza | http://samsung-plaza.localhost:3000 | LocalBusiness | Galaxy S25, Z Fold6, Appliances |

## 🔧 Quick Commands

```bash
# Start dev server
npm run dev

# Seed all sites
npx tsx prisma/seed-all.ts

# Reset & reseed database
npx prisma db push --force-reset
npx tsx prisma/seed-all.ts

# Generate Prisma types
npx prisma generate

# Open Prisma Studio
npx prisma studio
```

## 📊 SEO Features Implemented

### ✅ Database Schema
- `businessType` - Industry classification
- `primaryKeywords[]` - Main SEO keywords
- `secondaryKeywords[]` - Supporting keywords
- `localModifiers[]` - Location-based keywords
- `aggregateRating` - Auto-calculated from testimonials
- `googleAnalyticsId` - GA4 tracking
- `FAQ` model - Structured Q&A

### ✅ Product/Vehicle Fields
- `slug` - SEO-friendly URLs
- `keywords[]` - Product keywords
- `metaTitle` - Custom title
- `metaDescription` - Custom description
- `imageAlt` - Image alt text
- **Vehicles:** `make`, `model`, `year`, `vin`, `mileage`, `fuelType`
- **Bakery:** `ingredients[]`, `allergens[]`, `dietaryInfo[]`

### ✅ Components
- `JsonLd.tsx` - Industry-specific schemas
- `FAQ.tsx` - Accordion FAQ section
- `Analytics.tsx` - GA4, GTM, Facebook Pixel

### ✅ Structured Data Schemas
- `Bakery` / `AutoDealer` / `Restaurant` / `LocalBusiness`
- `Car` - Complete vehicle data
- `MenuItem` - Bakery products
- `AggregateRating` - Star ratings
- `FAQPage` - Q&A pairs
- `OpeningHoursSpecification` - Business hours

## 🎯 Testing SEO

### Google Rich Results Test
```
https://search.google.com/test/rich-results
```
Paste your localhost URL (use ngrok for testing)

### Check Structured Data
1. Visit any site
2. View page source (Ctrl+U)
3. Search for `application/ld+json`
4. Copy JSON and validate at schema.org

### Verify Meta Tags
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta property="og:title" content="...">
<meta name="twitter:card" content="...">
```

## 📝 Key Files

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Database schema with SEO fields |
| `prisma/seed-all.ts` | Seed all 4 sites with SEO data |
| `src/lib/seo-utils.ts` | SEO utility functions |
| `src/components/seo/JsonLd.tsx` | Structured data generation |
| `src/components/seo/Analytics.tsx` | Analytics integration |
| `src/components/sections/FAQ.tsx` | FAQ component |
| `src/app/(client)/[domain]/page.tsx` | Client page with SEO |

## 🔍 Utility Functions

```typescript
// Auto-calculate site rating from testimonials
await updateSiteRating(siteId);

// Generate SEO-friendly slug
const slug = generateSlug("2024 Tesla Model 3");
// Result: "2024-tesla-model-3"

// Generate unique product slug
const slug = await generateProductSlug(siteId, "Wedding Cake");
// Result: "wedding-cake" or "wedding-cake-1" if exists

// Get keyword suggestions
const keywords = generateKeywordSuggestions("Bakery", {
  product: "wedding cake",
  city: "San Francisco"
});
// Result: ["custom wedding cake San Francisco", ...]

// Generate meta description
const meta = generateMetaDescription(longText, 160);
// Result: Truncated to 160 chars at word boundary

// Generate image alt text
const alt = generateImageAlt("Tesla Model 3", "Premium Motors");
// Result: "Tesla Model 3 - at Premium Motors"
```

## 🎨 Business Types

| Type | Use For | Schema |
|------|---------|--------|
| `Bakery` | Bakeries, Pastry Shops | Bakery + MenuItem |
| `AutoDealer` | Car Dealerships | AutoDealer + Car |
| `Restaurant` | Restaurants, Cafes | Restaurant + Menu |
| `LocalBusiness` | Generic Businesses | LocalBusiness |

## 📈 SEO Checklist

### For Each New Site:
- [ ] Set `businessType` (Bakery/AutoDealer/etc)
- [ ] Add 3-5 `primaryKeywords`
- [ ] Add 5-10 `secondaryKeywords`
- [ ] Add 2-3 `localModifiers`
- [ ] Write custom `metaTitle` (50-60 chars)
- [ ] Write custom `metaDescription` (150-160 chars)
- [ ] Add `googleAnalyticsId` (if available)
- [ ] Enable `showFAQ` and add 3-5 FAQs

### For Each Product:
- [ ] Generate unique `slug`
- [ ] Add 3-5 product `keywords`
- [ ] Write `metaTitle`
- [ ] Write `metaDescription`
- [ ] Add `imageAlt` text
- [ ] **If Vehicle:** Add make, model, year, VIN, mileage
- [ ] **If Bakery:** Add ingredients, allergens, dietary info

### For Testimonials:
- [ ] Add customer name
- [ ] Add role/context
- [ ] Add detailed review content
- [ ] Set rating (1-5 stars)
- [ ] Run `updateSiteRating(siteId)` to recalculate

## 🚨 Common Issues

### TypeScript Errors After Schema Changes
```bash
# Solution: Regenerate Prisma types
npx prisma generate

# Then restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Port 3000 Already in Use
```bash
# Dev server automatically uses 3001
# Update URLs to use :3001 instead of :3000
```

### FAQs Not Showing
```bash
# Check in database:
npx prisma studio

# Verify:
# 1. showFAQ = true
# 2. FAQs exist for site
# 3. isActive = true
```

## 📚 Documentation

- **Full Analysis:** `SEO_FEATURES_ANALYSIS.md`
- **Implementation Guide:** `SEO_IMPLEMENTATION_CHECKLIST.md`
- **Summary:** `SEO_IMPLEMENTATION_SUMMARY.md`
- **Original Improvements:** `SEO_IMPROVEMENTS.md`

## 🎯 Next Steps

### Phase 2 (Recommended):
1. Create category pages with routing
2. Add product detail pages
3. Implement breadcrumb navigation
4. Add admin UI for SEO fields
5. Optimize images (WebP, lazy loading)
6. Improve Core Web Vitals

### Phase 3 (Advanced):
1. Blog/Content CMS
2. Google Search Console integration
3. Keyword tracking dashboard
4. A/B testing for meta tags
5. Automated SEO audits

---

**Last Updated:** January 26, 2026  
**Version:** 1.0  
**Status:** ✅ Production Ready
