import { prisma } from './prisma';

/**
 * Calculate and update aggregate rating for a site based on testimonials
 */
export async function updateSiteRating(siteId: string) {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: { siteId, rating: { gt: 0 } }
        });

        if (testimonials.length === 0) {
            // No testimonials, set to null
            await prisma.site.update({
                where: { id: siteId },
                data: {
                    aggregateRating: null,
                    totalReviews: 0
                }
            });
            return;
        }

        const avgRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

        await prisma.site.update({
            where: { id: siteId },
            data: {
                aggregateRating: Math.round(avgRating * 10) / 10, // Round to 1 decimal
                totalReviews: testimonials.length
            }
        });

        console.log(`Updated rating for site ${siteId}: ${avgRating.toFixed(1)} (${testimonials.length} reviews)`);
    } catch (error) {
        console.error('Error updating site rating:', error);
    }
}

/**
 * Generate SEO-friendly slug from text
 */
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate product slug with uniqueness check
 */
export async function generateProductSlug(siteId: string, productName: string, productId?: string): Promise<string> {
    let slug = generateSlug(productName);
    let counter = 1;
    let finalSlug = slug;

    // Check for uniqueness
    while (true) {
        const existing = await prisma.product.findFirst({
            where: {
                siteId,
                slug: finalSlug,
                ...(productId ? { id: { not: productId } } : {})
            }
        });

        if (!existing) break;

        finalSlug = `${slug}-${counter}`;
        counter++;
    }

    return finalSlug;
}

/**
 * Keyword suggestion templates by industry
 */
export const keywordTemplates = {
    Bakery: {
        primary: [
            'bakery near me',
            'custom {product} {city}',
            'fresh bread {city}',
            'wedding cakes {city}'
        ],
        longTail: [
            'gluten-free bakery in {city}',
            'best {product} delivery {city}',
            'vegan {product} near me',
            'organic bakery {neighborhood}'
        ],
        intent: [
            '{product} prices',
            'how to order custom {product}',
            'bakery open Sunday',
            '{product} near me delivery'
        ],
        localModifiers: [
            'near me',
            'in {city}',
            '{neighborhood}',
            '{zip code}'
        ]
    },
    AutoDealer: {
        primary: [
            'used cars {city}',
            '{brand} dealer near me',
            'certified pre-owned {model}',
            'new cars {city}'
        ],
        longTail: [
            'best price {year} {brand} {model} {city}',
            'low mileage used {brand} {model}',
            'car financing bad credit {city}',
            '{brand} lease deals {city}'
        ],
        intent: [
            'car trade-in value',
            'lease vs buy calculator',
            '{model} reviews',
            'car financing options'
        ],
        localModifiers: [
            'near me',
            'in {city}',
            '{neighborhood}',
            'dealer {city}'
        ]
    },
    Restaurant: {
        primary: [
            'restaurant near me',
            '{cuisine} restaurant {city}',
            'best {cuisine} {city}',
            'fine dining {city}'
        ],
        longTail: [
            'best {cuisine} restaurant in {city}',
            '{cuisine} delivery near me',
            'romantic restaurant {city}',
            'family friendly restaurant {neighborhood}'
        ],
        intent: [
            'restaurant reservations',
            'menu prices',
            'happy hour specials',
            'outdoor seating {city}'
        ],
        localModifiers: [
            'near me',
            'in {city}',
            '{neighborhood}',
            'downtown {city}'
        ]
    },
    LocalBusiness: {
        primary: [
            '{business} near me',
            '{service} {city}',
            'best {business} {city}'
        ],
        longTail: [
            'affordable {service} {city}',
            '{business} open now',
            'top rated {business} {neighborhood}'
        ],
        intent: [
            '{service} prices',
            'how to {service}',
            '{business} hours'
        ],
        localModifiers: [
            'near me',
            'in {city}',
            '{neighborhood}'
        ]
    }
};

/**
 * Generate keyword suggestions based on business type
 */
export function generateKeywordSuggestions(
    businessType: string,
    replacements: { [key: string]: string } = {}
): {
    primary: string[];
    longTail: string[];
    intent: string[];
    localModifiers: string[];
} {
    const template = keywordTemplates[businessType as keyof typeof keywordTemplates] || keywordTemplates.LocalBusiness;

    const replaceKeywords = (keywords: string[]) => {
        return keywords.map(keyword => {
            let result = keyword;
            Object.keys(replacements).forEach(key => {
                result = result.replace(`{${key}}`, replacements[key]);
            });
            return result;
        });
    };

    return {
        primary: replaceKeywords(template.primary),
        longTail: replaceKeywords(template.longTail),
        intent: replaceKeywords(template.intent),
        localModifiers: replaceKeywords(template.localModifiers)
    };
}

/**
 * Generate meta description from content
 */
export function generateMetaDescription(content: string, maxLength: number = 160): string {
    // Remove HTML tags if any
    const text = content.replace(/<[^>]*>/g, '');

    if (text.length <= maxLength) return text;

    // Truncate at word boundary
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    return truncated.substring(0, lastSpace) + '...';
}

/**
 * Validate and format image alt text
 */
export function generateImageAlt(productName: string, siteName: string, additionalContext?: string): string {
    const parts = [productName];

    if (additionalContext) {
        parts.push(additionalContext);
    }

    parts.push(`at ${siteName}`);

    return parts.join(' - ');
}
