import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/sites/[id]/banners - List all banners for a site
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const banners = await prisma.banner.findMany({
            where: { siteId: params.id },
            orderBy: { order: 'asc' }
        });

        return NextResponse.json(banners);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
    }
}

// POST /api/sites/[id]/banners - Create a new banner
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();

        const banner = await prisma.banner.create({
            data: {
                ...body,
                siteId: params.id
            }
        });

        return NextResponse.json(banner, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 });
    }
}
