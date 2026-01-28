# 🚀 Product Expansion Plan
## Website Builder SaaS - Feature Roadmap & Implementation Strategy

**Version:** 1.0  
**Date:** January 28, 2026  
**Philosophy:** Incremental expansion without breaking existing architecture

---

## 📋 Table of Contents

1. [Current Architecture Analysis](#current-architecture-analysis)
2. [Expansion Strategy](#expansion-strategy)
3. [Phase 1: Multi-Page Support](#phase-1-multi-page-support)
4. [Phase 2: Dynamic Forms & Lead Management](#phase-2-dynamic-forms--lead-management)
5. [Phase 3: E-Commerce & Ordering](#phase-3-e-commerce--ordering)
6. [Phase 4: Advanced Features](#phase-4-advanced-features)
7. [Implementation Checklist](#implementation-checklist)

---

## 🏗️ Current Architecture Analysis

### What You Have Now
✅ **Single-page websites** with sections (Hero, About, Services, Products, Contact)  
✅ **Dynamic content** via database (Prisma + PostgreSQL)  
✅ **Multi-tenant** architecture (subdomain/custom domain routing)  
✅ **Admin editor** for content management  
✅ **Lead capture** via contact form  
✅ **User management** with RBAC (Admin/Customer)

### Current Limitations
❌ Only one page per site (no `/about`, `/gallery`, `/menu` pages)  
❌ Limited form customization (only contact form)  
❌ No ordering/cart functionality  
❌ No payment processing  
❌ No detailed product pages (e.g., `/products/cake-123`)

---

## 🎯 Expansion Strategy

### Core Principle: **Additive, Not Destructive**

All new features will be:
1. **Optional** - Existing sites continue working without changes
2. **Modular** - Each feature can be enabled/disabled independently
3. **Backward Compatible** - No breaking changes to current schema
4. **Scalable** - Built to handle 1000+ sites

### Architecture Pattern: **Page Builder + Section Blocks**

Instead of hardcoding pages, we'll introduce:
- **Pages** (e.g., Home, About, Gallery, Menu, Contact)
- **Sections** (reusable blocks like Hero, ProductGrid, Form, etc.)
- **Widgets** (small components like buttons, forms, maps)

---

## 📄 Phase 1: Multi-Page Support

### Goal
Allow users to create multiple pages (e.g., `/about`, `/gallery`, `/menu`) instead of just a single-page site.

### Database Changes

```prisma
// prisma/schema.prisma

model Site {
  // ... existing fields
  pages Page[]
  
  // New settings
  enableMultiPage Boolean @default(false) // Feature flag
  homepageId       String? // Which page is the homepage
}

model Page {
  id          String   @id @default(cuid())
  siteId      String
  site        Site     @relation(fields: [siteId], references: [id], onDelete: Cascade)
  
  // Page Identity
  title       String   // "About Us", "Our Menu", "Gallery"
  slug        String   // "about", "menu", "gallery"
  description String?  // Meta description
  
  // Page Settings
  isPublished Boolean  @default(true)
  order       Int      @default(0) // For navigation ordering
  showInNav   Boolean  @default(true) // Show in main navigation
  
  // SEO
  metaTitle       String?
  metaDescription String?
  ogImage         String?
  
  // Page Content (Sections)
  sections    PageSection[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([siteId, slug])
}

model PageSection {
  id       String @id @default(cuid())
  pageId   String
  page     Page   @relation(fields: [pageId], references: [id], onDelete: Cascade)
  
  // Section Type
  type     String // "hero", "about", "gallery", "products", "form", "text", "video"
  order    Int    @default(0)
  
  // Section Content (JSON for flexibility)
  content  Json   // Stores section-specific data
  
  // Visibility
  isVisible Boolean @default(true)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Routing Changes

**Current:** `app/(client)/[domain]/page.tsx` renders one page  
**New:** `app/(client)/[domain]/[slug]/page.tsx` renders dynamic pages

```typescript
// src/app/(client)/[domain]/[slug]/page.tsx

export default async function DynamicPage({ 
  params 
}: { 
  params: { domain: string; slug: string } 
}) {
  const site = await getSiteData(params.domain);
  const page = await prisma.page.findFirst({
    where: { 
      siteId: site.id, 
      slug: params.slug,
      isPublished: true 
    },
    include: {
      sections: {
        where: { isVisible: true },
        orderBy: { order: 'asc' }
      }
    }
  });
  
  if (!page) return notFound();
  
  return (
    <main>
      <Navbar site={site} pages={site.pages} />
      
      {/* Render sections dynamically */}
      {page.sections.map(section => (
        <SectionRenderer 
          key={section.id} 
          type={section.type} 
          content={section.content} 
        />
      ))}
      
      <Footer site={site} />
    </main>
  );
}
```

### Admin Interface

Add a "Pages" tab to the site editor:

```
/sites/[id]/pages
  - List all pages
  - Create new page
  - Edit page (add/remove/reorder sections)
  - Delete page
```

### Migration Strategy

**For Existing Sites:**
1. Create a default "Home" page
2. Migrate existing sections (Hero, About, Services, etc.) to PageSections
3. Set `enableMultiPage = false` by default (opt-in feature)

**Effort:** 2-3 days  
**Breaking Changes:** None (backward compatible)

---

## 📝 Phase 2: Dynamic Forms & Lead Management

### Goal
Allow users to create custom forms (quote requests, bookings, surveys) beyond the basic contact form.

### Database Changes

```prisma
model Form {
  id          String   @id @default(cuid())
  siteId      String
  site        Site     @relation(fields: [siteId], references: [id], onDelete: Cascade)
  
  // Form Identity
  name        String   // "Quote Request", "Booking Form", "Survey"
  description String?
  
  // Form Settings
  submitButtonText String @default("Submit")
  successMessage   String @default("Thank you! We'll be in touch soon.")
  redirectUrl      String? // Redirect after submission
  
  // Email Notifications
  sendEmailTo      String? // Admin email to receive submissions
  emailSubject     String?
  
  // Fields
  fields      FormField[]
  submissions FormSubmission[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model FormField {
  id       String @id @default(cuid())
  formId   String
  form     Form   @relation(fields: [formId], references: [id], onDelete: Cascade)
  
  // Field Configuration
  label       String  // "Full Name", "Email", "Phone"
  type        String  // "text", "email", "phone", "textarea", "select", "checkbox", "radio", "date", "file"
  placeholder String?
  
  // Validation
  isRequired  Boolean @default(false)
  minLength   Int?
  maxLength   Int?
  pattern     String? // Regex for validation
  
  // Options (for select/radio/checkbox)
  options     String[] // ["Option 1", "Option 2", "Option 3"]
  
  // Display
  order       Int     @default(0)
  width       String  @default("full") // "full", "half", "third"
  
  createdAt DateTime @default(now())
}

model FormSubmission {
  id        String   @id @default(cuid())
  formId    String
  form      Form     @relation(fields: [formId], references: [id], onDelete: Cascade)
  
  // Submission Data
  data      Json     // { "name": "John Doe", "email": "john@example.com", ... }
  
  // Metadata
  ipAddress String?
  userAgent String?
  status    String   @default("NEW") // "NEW", "READ", "CONTACTED", "CLOSED"
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Use Cases

1. **Quote Request Form** (for car dealers)
   - Fields: Name, Email, Phone, Vehicle Interest, Trade-in?, Message
   
2. **Cake Order Form** (for bakeries)
   - Fields: Name, Phone, Cake Type (dropdown), Size, Flavor, Delivery Date, Special Instructions
   
3. **Table Booking Form** (for restaurants)
   - Fields: Name, Phone, Date, Time, Number of Guests, Special Requests

### Admin Interface

```
/sites/[id]/forms
  - List all forms
  - Create form builder (drag-and-drop fields)
  - View submissions
  - Export submissions to CSV
```

### Integration with Pages

Forms can be embedded in any PageSection:

```json
{
  "type": "form",
  "content": {
    "formId": "clx123abc",
    "title": "Request a Quote",
    "description": "Fill out the form below and we'll get back to you within 24 hours."
  }
}
```

**Effort:** 3-4 days  
**Breaking Changes:** None (extends existing Lead model)

---

## 🛒 Phase 3: E-Commerce & Ordering

### Goal
Enable product ordering, cart functionality, and basic checkout (without payment initially).

### Database Changes

```prisma
model Site {
  // ... existing fields
  
  // E-Commerce Settings
  enableOrdering     Boolean @default(false)
  currency           String  @default("USD")
  taxRate            Float?  @default(0)
  shippingFee        Float?  @default(0)
  minimumOrderAmount Float?
  
  // Order Management
  orders Order[]
}

model Product {
  // ... existing fields
  
  // E-Commerce Fields
  sku           String?  // Stock Keeping Unit
  stockQuantity Int?     // null = unlimited
  isInStock     Boolean  @default(true)
  
  // Pricing
  compareAtPrice Float?  // Original price (for showing discounts)
  costPrice      Float?  // Your cost (for profit tracking)
  
  // Variants (e.g., Size: Small/Medium/Large)
  variants      ProductVariant[]
  
  // Order Items
  orderItems    OrderItem[]
}

model ProductVariant {
  id          String  @id @default(cuid())
  productId   String
  product     Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  name        String  // "Size", "Color", "Flavor"
  options     String[] // ["Small", "Medium", "Large"]
  priceAdjust Float   @default(0) // +$5 for Large
  
  order       Int     @default(0)
}

model Order {
  id          String   @id @default(cuid())
  siteId      String
  site        Site     @relation(fields: [siteId], references: [id], onDelete: Cascade)
  
  // Order Number
  orderNumber String   @unique // "ORD-2026-0001"
  
  // Customer Info
  customerName  String
  customerEmail String
  customerPhone String?
  
  // Delivery/Pickup
  deliveryType  String  // "delivery", "pickup"
  address       String?
  city          String?
  postalCode    String?
  
  // Order Details
  items         OrderItem[]
  subtotal      Float
  tax           Float   @default(0)
  shipping      Float   @default(0)
  discount      Float   @default(0)
  total         Float
  
  // Payment
  paymentMethod String? // "cash", "card", "online" (for future)
  paymentStatus String  @default("pending") // "pending", "paid", "failed"
  
  // Order Status
  status        String  @default("pending") // "pending", "confirmed", "preparing", "ready", "completed", "cancelled"
  
  // Notes
  customerNotes String?
  adminNotes    String?
  
  // Timestamps
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  completedAt   DateTime?
}

model OrderItem {
  id         String  @id @default(cuid())
  orderId    String
  order      Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  productId  String
  product    Product @relation(fields: [productId], references: [id])
  
  // Item Details (snapshot at time of order)
  productName String
  quantity    Int
  price       Float  // Price per unit at time of order
  
  // Customization
  variant     String? // "Size: Large, Flavor: Chocolate"
  notes       String? // "No nuts please"
  
  subtotal    Float  // quantity * price
}
```

### User Flow

**Customer Side:**
1. Browse products on `/products` or `/menu` page
2. Click "Add to Cart" → Cart stored in localStorage
3. View cart → `/cart` page
4. Checkout → Fill form (name, phone, delivery address)
5. Submit order → Order created with status "pending"
6. Confirmation page → "Order #ORD-2026-0001 received!"

**Admin Side:**
1. View orders at `/sites/[id]/orders`
2. See order details, customer info, items
3. Update status: Pending → Confirmed → Preparing → Ready → Completed
4. Send status update emails (optional)

### Cart Component

```tsx
// src/components/client/Cart.tsx
'use client';

export default function Cart({ siteId }: { siteId: string }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`cart_${siteId}`);
    if (saved) setCart(JSON.parse(saved));
  }, [siteId]);
  
  const addToCart = (product: Product, quantity: number) => {
    // ... add logic
    localStorage.setItem(`cart_${siteId}`, JSON.stringify(newCart));
  };
  
  return (
    <div className="cart">
      {/* Cart UI */}
    </div>
  );
}
```

### Checkout Page

```
/sites/[domain]/checkout
  - Cart summary
  - Customer info form
  - Delivery/Pickup selection
  - Order notes
  - Submit order button
```

**Effort:** 5-7 days  
**Breaking Changes:** None (extends Product model)

---

## 💳 Phase 4: Advanced Features

### 4.1 Payment Integration

**Options:**
- **Stripe** (recommended for US/EU)
- **Razorpay** (for India)
- **PayPal**

**Implementation:**
```prisma
model Site {
  // ... existing fields
  
  // Payment Settings
  stripePublicKey  String?
  stripeSecretKey  String? // Encrypted
  razorpayKeyId    String?
  razorpayKeySecret String? // Encrypted
}

model Order {
  // ... existing fields
  
  // Payment Details
  paymentIntentId  String? // Stripe payment intent
  paymentMethod    String? // "card", "upi", "wallet"
  paidAt           DateTime?
}
```

**Effort:** 3-4 days per payment provider

---

### 4.2 Booking/Appointment System

For restaurants, salons, consultants:

```prisma
model Booking {
  id            String   @id @default(cuid())
  siteId        String
  site          Site     @relation(fields: [siteId], references: [id])
  
  customerName  String
  customerEmail String
  customerPhone String
  
  serviceType   String   // "Haircut", "Table for 4", "Consultation"
  date          DateTime
  timeSlot      String   // "10:00 AM - 11:00 AM"
  duration      Int      // Minutes
  
  status        String   @default("pending") // "pending", "confirmed", "cancelled", "completed"
  
  notes         String?
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

**Effort:** 4-5 days

---

### 4.3 Gallery Detail Pages

For photographers, real estate:

```prisma
model GalleryAlbum {
  id          String   @id @default(cuid())
  siteId      String
  site        Site     @relation(fields: [siteId], references: [id])
  
  title       String   // "Wedding Photography", "Luxury Apartments"
  slug        String   // "wedding-photography"
  description String?
  coverImage  String?
  
  images      GalleryImage[]
  
  createdAt   DateTime @default(now())
}

model GalleryImage {
  id          String       @id @default(cuid())
  albumId     String
  album       GalleryAlbum @relation(fields: [albumId], references: [id])
  
  url         String
  caption     String?
  order       Int          @default(0)
}
```

**URL Structure:**
- `/gallery` - List all albums
- `/gallery/wedding-photography` - Album detail with images

**Effort:** 2-3 days

---

### 4.4 Blog/News Section

```prisma
model BlogPost {
  id              String   @id @default(cuid())
  siteId          String
  site            Site     @relation(fields: [siteId], references: [id])
  
  title           String
  slug            String
  excerpt         String?
  content         String   @db.Text
  featuredImage   String?
  
  author          String?
  publishedAt     DateTime?
  isPublished     Boolean  @default(false)
  
  // SEO
  metaTitle       String?
  metaDescription String?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@unique([siteId, slug])
}
```

**Effort:** 3-4 days

---

## ✅ Implementation Checklist

### Phase 1: Multi-Page Support (Week 1-2)
- [ ] Update Prisma schema (Page, PageSection models)
- [ ] Create migration and run `prisma db push`
- [ ] Build dynamic routing `/[domain]/[slug]`
- [ ] Create SectionRenderer component
- [ ] Build admin "Pages" management UI
- [ ] Migrate existing single-page sites to Page model
- [ ] Test with 5-10 existing sites

### Phase 2: Dynamic Forms (Week 3-4)
- [ ] Update Prisma schema (Form, FormField, FormSubmission)
- [ ] Build form builder UI (drag-and-drop fields)
- [ ] Create form renderer component
- [ ] Build submission viewer/exporter
- [ ] Add email notifications
- [ ] Test with quote request, booking, survey forms

### Phase 3: E-Commerce (Week 5-7)
- [ ] Update Prisma schema (Order, OrderItem, ProductVariant)
- [ ] Build cart component (localStorage)
- [ ] Create checkout page
- [ ] Build order management dashboard
- [ ] Add order status updates
- [ ] Test full order flow (browse → cart → checkout → order)

### Phase 4: Advanced Features (Week 8+)
- [ ] Choose payment provider (Stripe/Razorpay)
- [ ] Integrate payment API
- [ ] Build booking system (if needed)
- [ ] Add gallery albums
- [ ] Add blog/news section
- [ ] Test end-to-end

---

## 🎯 Prioritization Matrix

| Feature | User Demand | Implementation Effort | Revenue Impact | Priority |
|---------|-------------|----------------------|----------------|----------|
| Multi-Page Support | ⭐⭐⭐⭐⭐ | Medium | High | **P0** |
| Dynamic Forms | ⭐⭐⭐⭐ | Medium | Medium | **P0** |
| E-Commerce/Ordering | ⭐⭐⭐⭐ | High | Very High | **P1** |
| Payment Integration | ⭐⭐⭐ | Medium | Very High | **P1** |
| Booking System | ⭐⭐⭐ | Medium | Medium | **P2** |
| Gallery Albums | ⭐⭐ | Low | Low | **P3** |
| Blog Section | ⭐⭐ | Medium | Low | **P3** |

---

## 🚀 Quick Start: Phase 1 Implementation

Want to start immediately? Here's the first step:

```bash
# 1. Update schema
# Add Page and PageSection models to prisma/schema.prisma

# 2. Push to database
npx prisma db push

# 3. Create migration script
npm run create-script scripts/migrate-to-pages.ts

# 4. Run migration
npm run migrate-to-pages
```

---

## 📊 Success Metrics

After each phase, measure:
- **Adoption Rate**: % of users enabling the new feature
- **Support Tickets**: Are users confused? Need better docs?
- **Revenue Impact**: Are users upgrading to paid plans?
- **Performance**: Page load times, database query counts

---

## 🎓 Learning Resources

- **Next.js Dynamic Routes**: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
- **Prisma Relations**: https://www.prisma.io/docs/concepts/components/prisma-schema/relations
- **Stripe Integration**: https://stripe.com/docs/payments/quickstart
- **Form Validation**: https://react-hook-form.com/

---

## 🤝 Need Help?

This is a living document. As you implement each phase, update this file with:
- Actual implementation details
- Challenges faced and solutions
- Performance optimizations
- User feedback

**Next Step:** Review this plan, then let's start with Phase 1 (Multi-Page Support).
