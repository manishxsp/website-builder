import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

    const baseUrl = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

    const siteUrls = sites.map((site) => {
        const domain = site.customDomain || `${site.subdomain}.${baseUrl}`;

        return {
            url: `${protocol}://${domain}`,
            lastModified: site.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 1,
        };
    });

    // Add main platform pages
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

    return [...platformRoutes, ...siteUrls];
}
