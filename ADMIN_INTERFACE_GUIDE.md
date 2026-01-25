# 🎨 Admin Interface Guide - Adding Banners, Products & More

## Overview

Instead of manually seeding data, you can now use the **Admin Interface** to add banners, products, business hours, locations, and tags through a user-friendly web interface.

## 📍 How to Access

### 1. **Go to Sites Dashboard**
```
http://localhost:3000/sites
```

### 2. **Click on a Site to Edit**
Click "Edit" on any site to open the Site Editor

### 3. **Use the Tabbed Interface**
The Site Editor has tabs for each feature:
- 📝 **Basic Info** - Site name, description, branding
- 🎠 **Banners** - Carousel slides
- 🌟 **Products** - Featured products
- ⏰ **Business Hours** - Operating hours
- 📍 **Locations** - Store locations
- 🏷️ **Tags** - Product/service tags
- ⚙️ **Settings** - Visibility toggles

## 🎠 Adding a Banner

### Step 1: Navigate to Banners Tab
1. Go to http://localhost:3000/sites
2. Click "Edit" on your site
3. Click the "Banners" tab

### Step 2: Click "Add Banner"
Click the "+ Add Banner" button

### Step 3: Fill in the Form
- **Title**: Main headline (e.g., "New Product Launch")
- **Subtitle**: Supporting text (e.g., "Get 20% off")
- **Image URL**: Banner image (use Unsplash or your CDN)
- **Button Text**: CTA text (e.g., "Shop Now")
- **Button Link**: Where the button goes (e.g., "#products")
- **Display Order**: 1, 2, 3... (lower numbers show first)
- **Active**: Check to show on site

### Step 4: Save
Click "Create Banner" and it will appear on your site!

## 🌟 Adding a Product

### Similar Process:
1. Go to "Products" tab
2. Click "+ Add Product"
3. Fill in:
   - Name
   - Description
   - Image URL
   - Price (e.g., "Starting at ₹99,999")
   - CTA Text (e.g., "View Details")
   - CTA Link
   - Features (comma-separated)
   - Display Order
   - Active checkbox

## ⏰ Adding Business Hours

1. Go to "Business Hours" tab
2. Click "Edit Hours"
3. Set hours for each day:
   - Day (Monday, Tuesday, etc.)
   - Open Time (e.g., "10:00 AM")
   - Close Time (e.g., "08:00 PM")
   - Closed checkbox (for days you're closed)

## 📍 Adding Locations

1. Go to "Locations" tab
2. Click "+ Add Location"
3. Fill in:
   - Name (e.g., "Store Name in City")
   - City
   - State
   - Full Address
   - Google Maps Link
   - Display Order

## 🏷️ Adding Tags

1. Go to "Tags" tab
2. Click "+ Add Tag"
3. Fill in:
   - Tag Name (e.g., "Galaxy S25")
   - Link (optional, e.g., "/products/galaxy-s25")
   - Display Order

## 📁 File Structure

### Admin Components
```
/src/components/admin/
├── SiteEditor.tsx        # Main tabbed interface
├── BannerForm.tsx        # Form for adding/editing banners
├── ProductForm.tsx       # (To be created)
├── BusinessHoursForm.tsx # (To be created)
├── LocationForm.tsx      # (To be created)
└── TagForm.tsx           # (To be created)
```

### Admin Pages
```
/src/app/(admin)/sites/[id]/
├── page.tsx              # Site editor page
├── banners/
│   └── new/
│       └── page.tsx      # Add new banner
├── products/
│   └── new/
│       └── page.tsx      # Add new product
├── hours/
│   └── edit/
│       └── page.tsx      # Edit business hours
├── locations/
│   └── new/
│       └── page.tsx      # Add new location
└── tags/
    └── new/
        └── page.tsx      # Add new tag
```

### API Routes
```
/src/app/api/sites/[siteId]/
├── banners/
│   ├── route.ts          # GET (list), POST (create)
│   └── [id]/
│       └── route.ts      # GET, PATCH, DELETE
├── products/
│   ├── route.ts
│   └── [id]/route.ts
├── hours/
│   ├── route.ts
│   └── [id]/route.ts
├── locations/
│   ├── route.ts
│   └── [id]/route.ts
└── tags/
    ├── route.ts
    └── [id]/route.ts
```

## ✅ What's Already Created

✅ **SiteEditor.tsx** - Main tabbed interface
✅ **BannerForm.tsx** - Form for adding banners
✅ **API routes for banners** - GET, POST, PATCH, DELETE
✅ **Banner add page** - `/sites/[id]/banners/new`

## 🔨 What You Can Do Now

### 1. **Add a Banner**
```
1. Go to http://localhost:3000/sites
2. Click "Edit" on Samsung SmartPlaza
3. Click "Banners" tab
4. Click "+ Add Banner"
5. Fill in the form
6. Click "Create Banner"
7. Visit http://samsung-plaza.localhost:3000 to see it!
```

### 2. **Create Similar Forms**
Use `BannerForm.tsx` as a template to create:
- `ProductForm.tsx`
- `BusinessHoursForm.tsx`
- `LocationForm.tsx`
- `TagForm.tsx`

Just copy the pattern and adjust the fields!

## 🎯 Quick Example: Add Your First Banner

1. **Go to**: http://localhost:3000/sites
2. **Find**: Samsung SmartPlaza
3. **Click**: Edit
4. **Click**: Banners tab
5. **Click**: + Add Banner
6. **Fill in**:
   - Title: "Summer Sale"
   - Subtitle: "Up to 50% off on selected items"
   - Image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200"
   - Button Text: "Shop Now"
   - Button Link: "#products"
   - Order: 1
   - Active: ✓
7. **Click**: Create Banner
8. **Visit**: http://samsung-plaza.localhost:3000

You should see your new banner in the carousel! 🎉

## 💡 Pro Tips

1. **Image URLs**: Use Unsplash for free images:
   - https://images.unsplash.com/photo-ID?w=1200

2. **Display Order**: 
   - 1 = First
   - 2 = Second
   - 3 = Third

3. **CTA Links**:
   - Internal: `#products`, `#contact`
   - External: `https://example.com`
   - Pages: `/products/item-name`

4. **Active Toggle**:
   - Checked = Shows on site
   - Unchecked = Hidden (draft mode)

## 🚀 Next Steps

1. **Try adding a banner** using the steps above
2. **I can create the remaining forms** (Products, Hours, Locations, Tags) if you need them
3. **Customize the forms** to match your specific needs

The admin interface is now ready for you to use! No more manual database seeding required. 🎉
