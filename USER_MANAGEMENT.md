# User Management System

## Overview

This application now includes a comprehensive user management system with role-based access control (RBAC). Users can be either **Admins** or **Customers**, each with different permissions and access levels.

## Features

### Authentication
- **JWT-based authentication** with HTTP-only cookies
- **Password hashing** using bcryptjs
- **Role-based access control** (Admin/Customer)
- **Protected routes** with middleware
- **Session management** with 7-day token expiration

### User Roles

#### Admin
- Full access to all sites
- Can view and manage all customer sites
- Access to `/dashboard` and `/settings`
- Can create sites without user association

#### Customer
- Access only to their own sites
- Can create and manage their own websites
- Access to `/sites` page
- Sites are automatically associated with their account

## API Endpoints

### Authentication Routes

#### POST `/api/auth/signup`
Create a new user account (customer by default)

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "customer" // optional, defaults to "customer"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "customer",
    "createdAt": "..."
  }
}
```

#### POST `/api/auth/login`
Login with email and password

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "admin" // optional, validates user has this role
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "customer"
  }
}
```

#### POST `/api/auth/logout`
Logout current user

**Response:**
```json
{
  "message": "Logout successful"
}
```

#### GET `/api/auth/me`
Get current authenticated user

**Response:**
```json
{
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "customer",
    "isActive": true,
    "createdAt": "..."
  }
}
```

## Protected Routes

### Middleware Protection

The application uses Next.js middleware to protect routes:

- **Public routes**: `/`, `/login`, `/signup`
- **Admin routes**: `/dashboard`, `/settings` (requires admin role)
- **Customer routes**: `/sites` (requires authentication)

### Route Behavior

1. **Unauthenticated users** accessing protected routes → Redirected to `/login`
2. **Authenticated users** accessing `/login` or `/signup` → Redirected to their dashboard
3. **Customers** accessing admin routes → Redirected to `/sites`
4. **Admins** can access all routes

## Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // Hashed password
  name      String?
  role      String   @default("customer") // "admin" or "customer"
  isActive  Boolean  @default(true)
  sites     Site[]   // Sites owned by this user
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Site Model (Updated)
```prisma
model Site {
  id     String  @id @default(cuid())
  userId String? // Owner of the site (customer)
  user   User?   @relation(fields: [userId], references: [id], onDelete: Cascade)
  // ... other fields
}
```

## Setup Instructions

### 1. Environment Variables

Add to your `.env` file:

```env
# JWT Secret (change in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Optional: Admin credentials for create-admin script
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

### 2. Database Migration

Push the schema changes to your database:

```bash
npm run db:push
```

### 3. Create Admin User

Run the admin creation script:

```bash
npm run create-admin
```

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

⚠️ **Important**: Change the admin password after first login!

### 4. Start the Application

```bash
npm run dev
```

## Usage Guide

### For Customers

1. **Sign Up**: Visit `/signup` to create a new account
2. **Login**: Visit `/login` and select "Customer" tab
3. **Create Sites**: After login, you'll be redirected to `/sites` where you can create and manage your websites
4. **View Sites**: You can only see and edit your own sites

### For Admins

1. **Login**: Visit `/login` and select "Admin" tab
2. **Use Admin Credentials**: 
   - Email: `admin@example.com`
   - Password: `admin123`
3. **Access Dashboard**: You'll be redirected to `/dashboard`
4. **Manage All Sites**: Admins can view and manage all customer sites from `/sites`

## Security Features

1. **Password Hashing**: All passwords are hashed using bcryptjs with salt rounds of 10
2. **HTTP-Only Cookies**: JWT tokens are stored in HTTP-only cookies to prevent XSS attacks
3. **Token Expiration**: Tokens expire after 7 days
4. **Role Validation**: Middleware validates user roles before allowing access to protected routes
5. **CSRF Protection**: Using SameSite cookie attribute

## Customization

### Adding New Roles

To add new roles, update:

1. **Database**: Modify the `role` field in User model
2. **Middleware**: Add role-specific route protection in `src/middleware.ts`
3. **Login Page**: Add new tab in `/login/page.tsx`

### Changing Token Expiration

Edit `src/lib/auth.ts`:

```typescript
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' }); // Change to 30 days
}
```

### Custom Redirect Logic

Edit `src/middleware.ts` to customize where users are redirected based on their role.

## Troubleshooting

### "Not authenticated" errors
- Clear browser cookies
- Check if JWT_SECRET is set in `.env`
- Verify token hasn't expired

### Can't login as admin
- Ensure admin user was created: `npm run create-admin`
- Check database for user with role "admin"
- Verify password is correct

### Sites not showing
- Check if user is authenticated: visit `/api/auth/me`
- Verify sites are associated with the correct userId
- Check browser console for API errors

## Next Steps

1. **Password Reset**: Implement forgot password functionality
2. **Email Verification**: Add email verification for new signups
3. **User Management UI**: Create admin panel to manage users
4. **Audit Logs**: Track user actions and changes
5. **Two-Factor Authentication**: Add 2FA for enhanced security
