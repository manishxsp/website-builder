# 🚀 Feature Implemented: Lead Capture Engine

I have successfully implemented the **Lead Capture Engine** (Feature #4) as requested.

## 1. Database Schema
- Added `Lead` model to `prisma/schema.prisma`.
- Fields: `name`, `email`, `phone`, `message`, `status`, `siteId`.

## 2. API Route
- Created `src/app/api/leads/route.ts` to handle form submissions.
- Saves leads to the database.

## 3. Contact Form Update
- Updated `Contact.tsx` to submit data to the API.
- Added loading states and success/error messages.
- Updated `ClientSite` page to pass `siteId` to the form.

## 4. Admin Dashboard
- Created **Leads Dashboard** at `/sites/[id]/leads`.
- Displays a table of all inquiries for a specific site.
- Added a **"View Leads"** button in the Site Editor header.

## ✅ Status
- **Database**: Local PostgreSQL database `website_builder` is set up and running.
- **Schema**: Pushed successfully (including `Lead` table).
- **Data**: Seeded with sample sites (Skoda, Samsung, etc.).

## 🚀 Try It Out
1.  Visit **http://skoda-india.localhost:3000**
2.  Scroll to the **Contact** section.
3.  Fill out the form and click **Send Message**.
4.  Go to **http://localhost:3000/sites** (Admin).
5.  Click **Edit** on Skoda India.
6.  Click **View Leads** in the header.
7.  You should see your message! 🎉
