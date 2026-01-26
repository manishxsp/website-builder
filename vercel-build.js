/**
 * Vercel Deployment Configuration
 * 
 * This file helps with Vercel deployments by providing fallback
 * environment variables during build time.
 */

// Check if we're in a Vercel build environment without DATABASE_URL
if (process.env.VERCEL && !process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL not set in Vercel. Using placeholder for build.');
    console.warn('⚠️  Add DATABASE_URL to Vercel Environment Variables for production.');

    // Set a placeholder DATABASE_URL for build to succeed
    // This won't be used at runtime, only during build
    process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@localhost:5432/placeholder';
}
