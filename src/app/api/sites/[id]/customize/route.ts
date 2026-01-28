import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Whitelist of allowed customization fields
const ALLOWED_CUSTOMIZATIONS = [
    'brandColor',
    'secondaryColor',
    'accentColor',
    'fontFamily',
    'fontHeading',
    'buttonStyle',
    'buttonSize',
    'sectionSpacing',
    'navbarStyle',
    'navbarTransparent',
    'footerStyle',
    'logo',
    'favicon',
    // Content fields
    'heroTitle',
    'heroSubtitle',
    'heroImage',
    'heroCTA',
    'aboutTitle',
    'aboutContent',
    'aboutImage',
];

// Validate color hex codes
function isValidHexColor(color: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(color);
}

// Validate font family (prevent injection)
function isValidFont(font: string): boolean {
    const allowedFonts = [
        'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat',
        'Playfair Display', 'Lora', 'Merriweather', 'Poppins',
        'Plus Jakarta Sans', 'Outfit', 'Space Grotesk'
    ];
    return allowedFonts.includes(font);
}

// Validate button styles
function isValidButtonStyle(style: string): boolean {
    return ['rounded-full', 'rounded-lg', 'rounded-none', 'square'].includes(style);
}

// PATCH - Update customization
export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();

        // Filter out non-whitelisted fields
        const sanitizedData: any = {};

        for (const [key, value] of Object.entries(body)) {
            if (ALLOWED_CUSTOMIZATIONS.includes(key)) {
                // Validate specific fields
                if (key.includes('Color') && typeof value === 'string') {
                    if (!isValidHexColor(value)) {
                        return NextResponse.json(
                            { error: `Invalid color format for ${key}` },
                            { status: 400 }
                        );
                    }
                }

                if ((key === 'fontFamily' || key === 'fontHeading') && typeof value === 'string') {
                    if (!isValidFont(value)) {
                        return NextResponse.json(
                            { error: `Invalid font: ${value}` },
                            { status: 400 }
                        );
                    }
                }

                if (key === 'buttonStyle' && typeof value === 'string') {
                    if (!isValidButtonStyle(value)) {
                        return NextResponse.json(
                            { error: `Invalid button style: ${value}` },
                            { status: 400 }
                        );
                    }
                }

                sanitizedData[key] = value;
            }
        }

        // Update site with sanitized data only
        const site = await prisma.site.update({
            where: { id: params.id },
            data: sanitizedData
        });

        return NextResponse.json({
            success: true,
            message: 'Site customization updated',
            site
        });
    } catch (error) {
        console.error('Customization error:', error);
        return NextResponse.json(
            { error: 'Failed to update customization' },
            { status: 500 }
        );
    }
}

// GET - Get current customization
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const site = await prisma.site.findUnique({
            where: { id: params.id },
            select: {
                id: true,
                brandColor: true,
                secondaryColor: true,
                accentColor: true,
                fontFamily: true,
                fontHeading: true,
                buttonStyle: true,
                buttonSize: true,
                sectionSpacing: true,
                navbarStyle: true,
                navbarTransparent: true,
                footerStyle: true,
                logo: true,
                favicon: true,
            }
        });

        if (!site) {
            return NextResponse.json(
                { error: 'Site not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(site);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch customization' },
            { status: 500 }
        );
    }
}
