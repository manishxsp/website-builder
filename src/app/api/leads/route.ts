import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, message, siteId } = body;

        if (!siteId) {
            return NextResponse.json(
                { error: 'Missing site ID' },
                { status: 400 }
            );
        }

        const lead = await prisma.lead.create({
            data: {
                name,
                email,
                phone,
                message,
                siteId,
            },
        });

        return NextResponse.json(lead);
    } catch (error) {
        console.error('Error creating lead:', error);
        return NextResponse.json(
            { error: 'Failed to create lead' },
            { status: 500 }
        );
    }
}
