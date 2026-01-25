import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/sites/[id]/banners/[bannerId] - Get a specific banner
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string; bannerId: string } }
) {
    try {
        const banner = await prisma.banner.findUnique({
            where: { id: params.bannerId }
        });

        if (!banner) {
            return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
        }

        return NextResponse.json(banner);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch banner' }, { status: 500 });
    }
}

// PATCH /api/sites/[id]/banners/[bannerId] - Update a banner
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string; bannerId: string } }
) {
    try {
        const body = await request.json();

        const banner = await prisma.banner.update({
            where: { id: params.bannerId },
            data: body
        });

        return NextResponse.json(banner);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
    }
}

// DELETE /api/sites/[id]/banners/[bannerId] - Delete a banner
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string; bannerId: string } }
) {
    try {
        await prisma.banner.delete({
            where: { id: params.bannerId }
        });

        return NextResponse.json({ message: 'Banner deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
    }
}
