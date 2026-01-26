import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single site
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const site = await prisma.site.findUnique({
      where: { id: params.id },
      include: {
        services: { orderBy: { order: 'asc' } },
        testimonials: { orderBy: { order: 'asc' } },
        banners: { orderBy: { order: 'asc' } },
        products: { orderBy: { order: 'asc' } },
        businessHours: { orderBy: { order: 'asc' } },
        locations: { orderBy: { order: 'asc' } },
        tags: { orderBy: { order: 'asc' } },
        navLinks: { orderBy: { order: 'asc' } },
        faqs: { orderBy: { order: 'asc' } }
      }
    });

    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    return NextResponse.json(site);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch site' }, { status: 500 });
  }
}

// UPDATE site
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    // Separate relations from scalar fields
    const {
      services,
      testimonials,
      banners,
      products,
      businessHours,
      locations,
      tags,
      navLinks,
      faqs,
      ...siteData
    } = body;

    // Prepare nested writes if arrays are provided
    const updateData: any = { ...siteData };

    // Helper to handle list updates (delete all and recreate)
    // This is the simplest way to ensure the DB matches the UI state exactly
    if (services) updateData.services = { deleteMany: {}, create: services.map((item: any) => ({ ...item, id: undefined, siteId: undefined })) };
    if (testimonials) updateData.testimonials = { deleteMany: {}, create: testimonials.map((item: any) => ({ ...item, id: undefined, siteId: undefined })) };
    if (banners) updateData.banners = { deleteMany: {}, create: banners.map((item: any) => ({ ...item, id: undefined, siteId: undefined })) };
    if (products) updateData.products = { deleteMany: {}, create: products.map((item: any) => ({ ...item, id: undefined, siteId: undefined })) };
    if (businessHours) updateData.businessHours = { deleteMany: {}, create: businessHours.map((item: any) => ({ ...item, id: undefined, siteId: undefined })) };
    if (locations) updateData.locations = { deleteMany: {}, create: locations.map((item: any) => ({ ...item, id: undefined, siteId: undefined })) };
    if (tags) updateData.tags = { deleteMany: {}, create: tags.map((item: any) => ({ ...item, id: undefined, siteId: undefined })) };
    if (navLinks) updateData.navLinks = { deleteMany: {}, create: navLinks.map((item: any) => ({ ...item, id: undefined, siteId: undefined })) };
    if (faqs) updateData.faqs = { deleteMany: {}, create: faqs.map((item: any) => ({ ...item, id: undefined, siteId: undefined })) };

    const site = await prisma.site.update({
      where: { id: params.id },
      data: updateData
    });
    return NextResponse.json(site);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update site' }, { status: 500 });
  }
}

// DELETE site
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.site.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete site' }, { status: 500 });
  }
}