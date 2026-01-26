import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

    // Platform routes (always available)
    const platformRoutes = [
        '',
        '/login',
        '/register',
    ].map((route) => ({
        url: `${protocol}://${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    try {
        // Fetch all sites
        // Note: In a real production app with thousands of sites, you'd want to paginate this
        // or generate separate sitemaps.
        const sites = await prisma.site.findMany({
            select: {
                subdomain: true,
                customDomain: true,
                updatedAt: true,
            },
        });

        const siteUrls = sites.map((site) => {
            const domain = site.customDomain || `${site.subdomain}.${baseUrl}`;

            return {
                url: `${protocol}://${domain}`,
                lastModified: site.updatedAt,
                changeFrequency: 'weekly' as const,
                priority: 1,
            };
        });

        return [...platformRoutes, ...siteUrls];
    } catch (error) {
        // If database is not available (e.g., during build), return only platform routes
        console.warn('Database not available for sitemap generation:', error);
        return platformRoutes;
    }
}
