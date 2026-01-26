import { Site } from '@prisma/client';

interface JsonLdProps {
    site: any; // Using any to avoid strict type checks with Prisma includes for now
    url: string;
}

export default function JsonLd({ site, url }: JsonLdProps) {
    // Determine business type for schema
    const businessType = site.businessType || 'LocalBusiness';

    // Base schema that all business types share
    const baseSchema: any = {
        '@context': 'https://schema.org',
        '@type': businessType,
        name: site.name,
        description: site.description,
        url: url,
        logo: site.logo,
        telephone: site.contactPhone,
        email: site.contactEmail,
        image: site.heroImage || site.logo,
    };

    // Add address if available
    if (site.contactAddress) {
        baseSchema.address = {
            '@type': 'PostalAddress',
            streetAddress: site.contactAddress,
        };
    }

    // Add aggregate rating if available
    if (site.aggregateRating && site.totalReviews > 0) {
        baseSchema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: site.aggregateRating.toFixed(1),
            reviewCount: site.totalReviews,
            bestRating: 5,
            worstRating: 1,
        };
    }

    // Add individual reviews
    if (site.testimonials && site.testimonials.length > 0) {
        baseSchema.review = site.testimonials.map((t: any) => ({
            '@type': 'Review',
            reviewRating: {
                '@type': 'Rating',
                ratingValue: t.rating,
                bestRating: 5,
            },
            author: {
                '@type': 'Person',
                name: t.name,
            },
            reviewBody: t.content,
        }));
    }

    // Add price range for businesses
    if (businessType === 'Bakery' || businessType === 'Restaurant') {
        baseSchema.priceRange = '$$';
        baseSchema.servesCuisine = site.industryCategory || 'Bakery';
    }

    // Add products/vehicles based on business type
    if (site.products && site.products.length > 0) {
        if (businessType === 'AutoDealer') {
            // Vehicle-specific schema
            baseSchema.hasOfferCatalog = {
                '@type': 'OfferCatalog',
                name: 'Vehicle Inventory',
                itemListElement: site.products
                    .filter((p: any) => p.isActive)
                    .map((p: any) => {
                        const vehicleSchema: any = {
                            '@type': 'Car',
                            name: p.name,
                            description: p.description,
                            image: p.image,
                        };

                        // Add vehicle-specific fields
                        if (p.make) {
                            vehicleSchema.brand = {
                                '@type': 'Brand',
                                name: p.make,
                            };
                        }
                        if (p.model) vehicleSchema.model = p.model;
                        if (p.year) vehicleSchema.modelDate = p.year.toString();
                        if (p.vin) vehicleSchema.vehicleIdentificationNumber = p.vin;
                        if (p.mileage) {
                            vehicleSchema.mileageFromOdometer = {
                                '@type': 'QuantitativeValue',
                                value: p.mileage.toString(),
                                unitCode: 'SMI',
                            };
                        }
                        if (p.fuelType) {
                            vehicleSchema.vehicleEngine = {
                                '@type': 'EngineSpecification',
                                fuelType: p.fuelType,
                            };
                        }
                        if (p.condition) vehicleSchema.itemCondition = `https://schema.org/${p.condition.replace(/\s+/g, '')}Condition`;
                        if (p.exteriorColor) vehicleSchema.color = p.exteriorColor;
                        if (p.transmission) vehicleSchema.vehicleTransmission = p.transmission;

                        // Add offer
                        if (p.price) {
                            vehicleSchema.offers = {
                                '@type': 'Offer',
                                price: p.price.replace(/[^0-9.]/g, '') || '0',
                                priceCurrency: 'USD',
                                availability: 'https://schema.org/InStock',
                                itemCondition: vehicleSchema.itemCondition || 'https://schema.org/UsedCondition',
                            };
                        }

                        return vehicleSchema;
                    }),
            };
        } else if (businessType === 'Bakery') {
            // Bakery product schema
            baseSchema.hasMenu = {
                '@type': 'Menu',
                hasMenuSection: {
                    '@type': 'MenuSection',
                    name: site.productsTitle || 'Our Products',
                    hasMenuItem: site.products
                        .filter((p: any) => p.isActive)
                        .map((p: any) => {
                            const menuItem: any = {
                                '@type': 'MenuItem',
                                name: p.name,
                                description: p.description,
                                image: p.image,
                            };

                            if (p.price) {
                                menuItem.offers = {
                                    '@type': 'Offer',
                                    price: p.price.replace(/[^0-9.]/g, '') || '0',
                                    priceCurrency: 'USD',
                                };
                            }

                            // Add dietary info
                            if (p.dietaryInfo && p.dietaryInfo.length > 0) {
                                menuItem.suitableForDiet = p.dietaryInfo.map((diet: string) =>
                                    `https://schema.org/${diet.charAt(0).toUpperCase() + diet.slice(1)}Diet`
                                );
                            }

                            return menuItem;
                        }),
                },
            };
        } else {
            // Generic product schema
            baseSchema.hasOfferCatalog = {
                '@type': 'OfferCatalog',
                name: 'Products',
                itemListElement: site.products
                    .filter((p: any) => p.isActive)
                    .map((p: any) => ({
                        '@type': 'Product',
                        name: p.name,
                        description: p.description,
                        image: p.image,
                        offers: {
                            '@type': 'Offer',
                            price: p.price?.replace(/[^0-9.]/g, '') || '0',
                            priceCurrency: 'USD',
                        },
                    })),
            };
        }
    }

    // Add business hours if available
    if (site.businessHours && site.businessHours.length > 0) {
        baseSchema.openingHoursSpecification = site.businessHours
            .filter((h: any) => !h.isClosed)
            .map((h: any) => ({
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: h.day,
                opens: h.openTime,
                closes: h.closeTime,
            }));
    }

    // Add social media profiles
    const socialProfiles = [
        site.facebookUrl,
        site.instagramUrl,
        site.twitterUrl,
        site.linkedinUrl,
        site.youtubeUrl,
    ].filter(Boolean);

    if (socialProfiles.length > 0) {
        baseSchema.sameAs = socialProfiles;
    }

    // Generate FAQ schema if FAQs exist
    const faqSchema = site.faqs && site.faqs.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: site.faqs
            .filter((faq: any) => faq.isActive)
            .map((faq: any) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            })),
    } : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
        </>
    );
}
