import { prisma } from '@/lib/prisma';
import SiteEditor from '@/components/admin/SiteEditor';
import { notFound } from 'next/navigation';

export default async function EditSitePage({ params }: { params: { id: string } }) {
    const site = await prisma.site.findUnique({
        where: { id: params.id },
        include: {
            banners: { orderBy: { order: 'asc' } },
            products: { orderBy: { order: 'asc' } },
            services: { orderBy: { order: 'asc' } },
            businessHours: { orderBy: { order: 'asc' } },
            locations: { orderBy: { order: 'asc' } },
            tags: { orderBy: { order: 'asc' } },
            testimonials: { orderBy: { order: 'asc' } },
            navLinks: { orderBy: { order: 'asc' } }
        } as any // Bypass TS check for now until types sync
    });

    if (!site) return notFound();

    return <SiteEditor site={site as any} />;
}
