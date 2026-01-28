# User Management GUI Guide

## Overview

A comprehensive user management system with a beautiful GUI for managing users, roles, passwords, and site mappings.

## Access the User Management Panel

**URL:** `http://localhost:3000/users`

**Requirements:** You must be logged in as an **Admin**

## Features

### 1. **Dashboard Overview**

The user management page displays:
- **Total Users** - Count of all users in the system
- **Admins** - Number of admin users
- **Customers** - Number of customer users

### 2. **User List Table**

View all users with the following information:
- **User Details** - Name and email
- **Role** - Admin or Customer (with visual badges)
- **Status** - Active/Inactive indicator
- **Sites** - List of websites owned by each user
- **Created Date** - When the account was created
- **Actions** - Quick action buttons

### 3. **Search Functionality**

Use the search bar to filter users by:
- Email address
- Name

### 4. **User Actions**

Each user row has three action buttons:

#### 🔵 Edit User (Blue Pencil Icon)
- Change user's name
- Update email address
- Change role (Admin/Customer)
- Toggle active/inactive status

#### 🟢 Change Password (Green Key Icon)
- Set a new password for any user
- Password must be at least 6 characters
- Requires password confirmation

#### 🔴 Delete User (Red Trash Icon)
- Permanently delete a user
- Requires confirmation
- Cannot delete your own account
- All associated sites will be deleted (cascade)

## How to Use

### Change a User's Password

1. Navigate to `http://localhost:3000/users`
2. Find the user in the table
3. Click the **green key icon** (🔑) in the Actions column
4. Enter the new password (min 6 characters)
5. Confirm the password
6. Click "Change Password"
7. Success message will appear

### Edit User Details

1. Navigate to `http://localhost:3000/users`
2. Find the user in the table
3. Click the **blue edit icon** (✏️) in the Actions column
4. Update any of the following:
   - Name
   - Email
   - Role (admin/customer)
   - Active status
5. Click "Save Changes"
6. Success message will appear

### View User's Websites

In the "Sites" column, you can see all websites owned by each user:
- Site names are listed
- "No sites" appears if user has no websites
- Customers can only see their own sites
- Admins can see all sites

### Delete a User

1. Navigate to `http://localhost:3000/users`
2. Find the user in the table
3. Click the **red trash icon** (🗑️) in the Actions column
4. Confirm the deletion in the popup
5. User and all their sites will be deleted

## User Role Mapping

### Admin Users
- Can access `/users` page
- Can view ALL users
- Can view ALL sites (in `/sites` page)
- Can edit any user
- Can change any user's password
- Can delete any user (except themselves)
- Can access `/dashboard` and `/settings`

### Customer Users
- Cannot access `/users` page
- Can only view their own sites
- Can create and manage their own websites
- Cannot see other customers' data
- Can access `/sites` page only

## Site-to-User Mapping

The user management page shows which sites belong to which users:

**Example:**
```
User: john@example.com (Customer)
Sites:
  - Samsung Plaza
  - Skoda India
  - Tech Store
```

This makes it easy to:
- See which customer owns which websites
- Identify users with no sites
- Track site ownership for billing/support

## Command Line Tools (Alternative)

If you prefer command line, you can also use these scripts:

### List All Users
```bash
npm run list-users
```

### Create a New User
```bash
npm run create-user
```
Interactive prompts will ask for:
- Email
- Name
- Password
- Role (admin/customer)

### Change Password
```bash
npm run change-password
```
Interactive prompts will ask for:
- User email
- New password

### Create Admin User
```bash
npm run create-admin
```
Creates an admin with default or environment variable credentials.

## Database GUI (Prisma Studio)

For advanced database management:

```bash
npm run db:studio
```

This opens Prisma Studio at `http://localhost:5555` where you can:
- View all database tables
- Edit records directly
- Create new records
- Delete records
- View relationships

**Note:** Passwords in the database are hashed and cannot be read directly.

## Security Notes

1. **Password Security**
   - All passwords are hashed using bcryptjs
   - Passwords are never stored in plain text
   - Minimum password length: 6 characters

2. **Admin Protection**
   - Admins cannot delete their own account
   - Only admins can access user management
   - Role changes are logged

3. **Data Protection**
   - Deleting a user cascades to their sites
   - Confirmation required for deletions
   - Active/inactive status for soft disabling

## Troubleshooting

### "Unauthorized" Error
- Make sure you're logged in as an admin
- Check that your admin role is set correctly in the database

### Can't See Users Page
- Verify you're logged in
- Check your role is "admin"
- Try logging out and back in

### Password Change Not Working
- Ensure password is at least 6 characters
- Make sure passwords match
- Check browser console for errors

### Sites Not Showing for User
- Verify sites have `userId` field set
- Check database: `npm run db:studio`
- Sites created by admins may not have userId

## Quick Reference

| Action | URL | Required Role |
|--------|-----|---------------|
| View Users | `/users` | Admin |
| Edit User | Click edit icon | Admin |
| Change Password | Click key icon | Admin |
| Delete User | Click trash icon | Admin |
| View Own Sites | `/sites` | Any authenticated user |

## Next Steps

1. **Email Notifications** - Send email when password is changed
2. **Audit Logs** - Track all user management actions
3. **Bulk Actions** - Select multiple users for batch operations
4. **Export Users** - Download user list as CSV
5. **User Invitations** - Send invite emails to new users
