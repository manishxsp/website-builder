# 🚀 Vercel Deployment Guide
## Website Builder SaaS Platform

**Last Updated:** January 26, 2026

---

## 📋 Prerequisites

Before deploying to Vercel, you need:

1. **Vercel Account** - Sign up at https://vercel.com
2. **Database** - PostgreSQL database (Supabase, PlanetScale, or Neon)
3. **GitHub Repository** - Your code pushed to GitHub

---

## 🗄️ Step 1: Set Up Database

### Option A: Supabase (Recommended)

1. Go to https://supabase.com
2. Create a new project
3. Wait for database to provision (~2 minutes)
4. Go to **Settings** → **Database**
5. Copy the **Connection String** (URI format)
6. Replace `[YOUR-PASSWORD]` with your actual password

Example:
```
postgresql://postgres.xxxxx:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

### Option B: PlanetScale

1. Go to https://planetscale.com
2. Create a new database
3. Get connection string from dashboard
4. Use the Prisma format

### Option C: Neon

1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string

---

## 🔧 Step 2: Configure Environment Variables in Vercel

### 2.1 Go to Vercel Dashboard

1. Visit https://vercel.com/dashboard
2. Select your project (or import from GitHub)
3. Go to **Settings** → **Environment Variables**

### 2.2 Add Required Variables

Add the following environment variables:

#### **DATABASE_URL** (Required)
- **Name:** `DATABASE_URL`
- **Value:** Your PostgreSQL connection string from Step 1
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

Example:
```
postgresql://postgres:password@host.supabase.co:5432/postgres
```

#### **NEXTAUTH_SECRET** (Optional, for future auth)
- **Name:** `NEXTAUTH_SECRET`
- **Value:** Generate with: `openssl rand -base64 32`
- **Environments:** ✅ Production, ✅ Preview

#### **NEXTAUTH_URL** (Optional, for future auth)
- **Name:** `NEXTAUTH_URL`
- **Value:** Your production URL (e.g., `https://your-app.vercel.app`)
- **Environments:** ✅ Production

#### **NEXT_PUBLIC_ROOT_DOMAIN** (Optional)
- **Name:** `NEXT_PUBLIC_ROOT_DOMAIN`
- **Value:** Your custom domain (e.g., `yoursaas.com`)
- **Environments:** ✅ Production

---

## 📦 Step 3: Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your GitHub repository
4. Vercel will auto-detect Next.js
5. Click **Deploy**

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 3: Automatic Deployments (Recommended)

Once connected to GitHub:
- Every push to `main` branch → Production deployment
- Every pull request → Preview deployment
- Automatic rollbacks if deployment fails

---

## 🗃️ Step 4: Run Database Migrations

After first deployment, you need to set up the database schema:

### Option A: Via Vercel CLI

```bash
# Set environment variable locally
export DATABASE_URL="your-production-database-url"

# Push schema to database
npx prisma db push

# Seed database (optional)
npm run db:seed
```

### Option B: Via Supabase SQL Editor

1. Go to Supabase dashboard
2. Click **SQL Editor**
3. Run Prisma migrations manually (not recommended)

### Option C: Use Prisma Migrate (Production)

```bash
# Generate migration
npx prisma migrate dev --name init

# Deploy migration to production
npx prisma migrate deploy
```

---

## ✅ Step 5: Verify Deployment

### 5.1 Check Build Logs

1. Go to Vercel dashboard
2. Click on your deployment
3. Check **Build Logs** for errors
4. Look for:
   ```
   ✓ Generating static pages
   ✓ Collecting build traces
   ✓ Finalizing page optimization
   ```

### 5.2 Test Your Site

Visit your Vercel URL (e.g., `https://your-app.vercel.app`)

Test these URLs:
- `https://your-app.vercel.app` - Landing page
- `https://your-app.vercel.app/dashboard` - Admin dashboard
- `https://your-app.vercel.app/sites` - Sites list
- `https://bakery.your-app.vercel.app` - Client site (if seeded)

---

## 🌐 Step 6: Configure Custom Domain (Optional)

### 6.1 Add Domain in Vercel

1. Go to **Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `yoursaas.com`)
4. Click **Add**

### 6.2 Configure DNS

Vercel will show you DNS records to add:

**For root domain (yoursaas.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For wildcard subdomains (*.yoursaas.com):**
```
Type: CNAME
Name: *
Value: cname.vercel-dns.com
```

### 6.3 Wait for DNS Propagation

- Usually takes 5-60 minutes
- Check status in Vercel dashboard
- Test with: `dig yoursaas.com`

---

## 🔒 Step 7: Enable HTTPS (Automatic)

Vercel automatically provisions SSL certificates:
- Free SSL via Let's Encrypt
- Auto-renewal
- HTTPS enforced by default

No action needed! ✅

---

## 🐛 Troubleshooting

### Error: "Environment variable not found: DATABASE_URL"

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Add `DATABASE_URL` with your connection string
3. Redeploy

### Error: "Cannot find module './307.js'"

**Solution:**
1. Clear build cache in Vercel
2. Go to Settings → General → Clear Build Cache
3. Redeploy

### Error: "Prisma Client not generated"

**Solution:**
The `postinstall` script should handle this, but if not:
1. Check `package.json` has: `"postinstall": "prisma generate"`
2. Redeploy

### Error: "Database connection failed"

**Solution:**
1. Check `DATABASE_URL` is correct
2. Ensure database allows connections from Vercel IPs
3. For Supabase: Use the **pooler** connection string
4. Test connection locally first

### Sites not loading (404 errors)

**Solution:**
1. Check middleware is working: `src/middleware.ts`
2. Verify subdomain DNS is configured (wildcard CNAME)
3. Check database has sites with correct subdomains
4. Test locally first: `http://bakery.localhost:3000`

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Built-in)

1. Go to **Analytics** tab
2. View:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### Custom Monitoring

Add to your site:
- Google Analytics 4 (via site settings)
- Sentry for error tracking
- LogRocket for session replay

---

## 🔄 Continuous Deployment

### Automatic Deployments

Every time you push to GitHub:
```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

Vercel will:
1. Detect the push
2. Start a new build
3. Run tests (if configured)
4. Deploy to production
5. Send you a notification

### Preview Deployments

For pull requests:
```bash
git checkout -b feature/new-feature
# Make changes
git push origin feature/new-feature
# Create pull request on GitHub
```

Vercel will:
1. Create a preview deployment
2. Comment on PR with preview URL
3. Update preview on every commit
4. Delete preview when PR is merged

---

## 💰 Vercel Pricing

### Hobby Plan (Free)
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Preview deployments
- ❌ No commercial use
- ❌ No team features

**Good for:** Testing, personal projects

### Pro Plan ($20/month)
- ✅ Commercial use allowed
- ✅ 1TB bandwidth/month
- ✅ Team collaboration
- ✅ Password protection
- ✅ Analytics
- ✅ Priority support

**Good for:** Small businesses, startups

### Enterprise (Custom pricing)
- ✅ Unlimited bandwidth
- ✅ Advanced security
- ✅ SLA guarantees
- ✅ Dedicated support
- ✅ Custom contracts

**Good for:** Large businesses, agencies

---

## 📈 Scaling Considerations

### Database Scaling

As you grow:
- **0-100 sites:** Supabase Free tier
- **100-1000 sites:** Supabase Pro ($25/month)
- **1000+ sites:** PlanetScale or dedicated PostgreSQL

### Bandwidth Scaling

- **0-500 customers:** Vercel Pro ($20/month)
- **500-2000 customers:** Vercel Pro + CDN
- **2000+ customers:** Vercel Enterprise

### Performance Optimization

1. Enable Vercel Edge Caching
2. Use Vercel Image Optimization
3. Implement Redis caching (Upstash)
4. Use Vercel Edge Functions for middleware

---

## 🔐 Security Best Practices

### Environment Variables
- ✅ Never commit `.env` to Git
- ✅ Use different databases for dev/prod
- ✅ Rotate secrets regularly
- ✅ Use Vercel's encrypted storage

### Database Security
- ✅ Use connection pooling
- ✅ Enable SSL connections
- ✅ Whitelist Vercel IPs (if possible)
- ✅ Regular backups

### Application Security
- ✅ Enable HTTPS only
- ✅ Set security headers
- ✅ Implement rate limiting
- ✅ Use CSRF protection

---

## 📝 Deployment Checklist

Before deploying to production:

- [ ] Database is set up and accessible
- [ ] `DATABASE_URL` added to Vercel
- [ ] Database schema pushed (`prisma db push`)
- [ ] Sample data seeded (optional)
- [ ] Environment variables configured
- [ ] Custom domain configured (optional)
- [ ] DNS records updated (if custom domain)
- [ ] SSL certificate verified
- [ ] Test deployment successful
- [ ] All pages loading correctly
- [ ] Admin panel accessible
- [ ] Client sites loading
- [ ] Contact forms working
- [ ] Analytics configured (optional)
- [ ] Error monitoring set up (optional)

---

## 🆘 Getting Help

### Vercel Support
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/next.js/discussions
- Support: support@vercel.com (Pro/Enterprise only)

### Project Issues
- GitHub Issues: Your repository
- Discord/Slack: Your community

---

## 🎉 Success!

Your Website Builder SaaS is now live on Vercel! 🚀

**Next Steps:**
1. Test all features thoroughly
2. Add your first real customer
3. Monitor performance and errors
4. Iterate based on feedback
5. Scale as you grow

---

**Last Updated:** January 26, 2026  
**Maintained By:** Development Team
