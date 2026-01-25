import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all sites
export async function GET() {
  try {
    const sites = await prisma.site.findMany({
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
    const body = await req.json();
    const site = await prisma.site.create({
      data: body
    });
    return NextResponse.json(site, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create site' }, { status: 500 });
  }
}