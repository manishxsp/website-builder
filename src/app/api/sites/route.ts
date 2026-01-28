import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// GET all sites (filtered by user for customers, all for admins)
export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Admins can see all sites, customers only see their own
    const sites = await prisma.site.findMany({
      where: currentUser.role === 'admin' ? {} : { userId: currentUser.userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(sites);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sites' }, { status: 500 });
  }
}

// CREATE new site
export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await req.json();

    // Associate site with user (for customers)
    const siteData = currentUser.role === 'customer'
      ? { ...body, userId: currentUser.userId }
      : body;

    const site = await prisma.site.create({
      data: siteData
    });

    return NextResponse.json(site, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create site' }, { status: 500 });
  }
}