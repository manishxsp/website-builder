# Website Builder SaaS Platform

A powerful, multi-tenant SaaS platform for creating and managing professional websites without coding. Built with **Next.js 14**, **Prisma**, **PostgreSQL**, and **Tailwind CSS**.

![Dashboard Preview](https://placehold.co/1200x600/2563eb/ffffff?text=Website+Builder+SaaS+Dashboard)

## 🚀 Features

### 🏗️ Website Building
- **Multi-tenant Architecture**: Each site gets its own subdomain (e.g., `coffee.yoursite.com`) or custom domain.
- **Dynamic Content**: Real-time content updates without rebuilding.
- **Reusable Sections**: Hero, About, Services, Gallery, Testimonials, Contact, and more.
- **AI-Powered**: Generate professional "About Us" content using AI.
- **SEO Optimized**: Automatic metadata, sitemaps, and semantic HTML.

### 👥 User Management & Security
- **Role-Based Access Control (RBAC)**:
  - **Admins**: Full system access, manage all users and sites.
  - **Customers**: Manage only their own websites.
- **Secure Authentication**: JWT-based auth with HTTP-only cookies.
- **User Dashboard**: Dedicated portals for Admins and Customers.
- **Modern UI**: Glassmorphic design with `Outfit` and `Plus Jakarta Sans` fonts.

### 🛠️ Technical Highlights
- **Next.js 14 App Router**: Server Components and Server Actions.
- **Prisma ORM**: Type-safe database access.
- **PostgreSQL**: Robust relational database.
- **Tailwind CSS**: Modern, responsive styling.
- **TypeScript**: Full type safety across the stack.

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL (Local or Cloud like Supabase/Neon)

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

3. **Environment Setup**
   Create a `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/website_builder"
   JWT_SECRET="your-super-secret-key"
   ADMIN_EMAIL="admin@example.com"
   ADMIN_PASSWORD="admin123"
   ```

4. **Database Setup**
   ```bash
   # Push schema to DB
   npm run db:push
   
   # Seed initial data
   npm run db:seed
   ```

5. **Create Admin User**
   ```bash
   npm run create-admin
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see your app!

---

## 🌍 How to Go Live (Deployment)

### Option 1: Vercel (Recommended)
The easiest way to deploy Next.js apps.

1. Push your code to GitHub.
2. Import project to Vercel.
3. Add Environment Variables (`DATABASE_URL`, `JWT_SECRET`, etc.) in Vercel settings.
4. **Domains**:
   - Add your main domain (e.g., `mysaas.com`).
   - Add a wildcard domain (`*.mysaas.com`) for subdomains.

### Option 2: VPS (DigitalOcean/AWS)
For full control and lower costs at scale.

1. Provision a server (Ubuntu).
2. Install Node.js, Nginx, and PM2.
3. Clone repo and build: `npm run build`.
4. Start with PM2: `pm2 start npm --name "saas" -- start`.
5. Configure Nginx as a reverse proxy to handle subdomains.

---

## 💰 How to Sell & Monetize (Business Model)

This platform is designed to be a business-in-a-box. Here are ways to monetize:

### 1. Subscription Model (SaaS)
Charge users a monthly fee to keep their website active.
- **Free Tier**: Subdomain only (`user.mysaas.com`), limited pages.
- **Pro Tier ($15/mo)**: Custom domain (`user.com`), no branding, AI features.
- **Business Tier ($29/mo)**: Priority support, advanced analytics.

### 2. Setup Fees + Maintenance
Charge a one-time setup fee to design the site for them using your admin tools, then a lower monthly maintenance fee.
- **Perfect for**: Agencies serving local businesses (restaurants, gyms, salons).

### 3. White Labeling
Sell the entire platform to other agencies.
- Allow them to put their logo on the dashboard.
- Charge a licensing fee (e.g., $500/year).

### 4. Niche Specific
Target a specific industry (e.g., "Websites for Yoga Instructors").
- Pre-build templates specifically for that niche.
- Market directly to that audience with tailored features (e.g., class scheduling integration).

---

## 📚 Documentation

- **[User Management Guide](./USER_MANAGEMENT.md)**: Details on auth and roles.
- **[Admin GUI Guide](./USER_MANAGEMENT_GUI.md)**: How to use the admin panel.
- **[Commercialization Guide](./COMMERCIALIZATION_GUIDE.md)**: Deep dive into business strategies.

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
