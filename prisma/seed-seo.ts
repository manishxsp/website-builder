import { PrismaClient } from '@prisma/client';
import { updateSiteRating } from '../src/lib/seo-utils';

const prisma = new PrismaClient();

async function main() {
    // Delete existing data
    await prisma.fAQ.deleteMany();
    await prisma.navLink.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.service.deleteMany();
    await prisma.product.deleteMany();
    await prisma.site.deleteMany();

    // Create Sample Site 1: Bakery with Enhanced SEO
    const bakerySite = await prisma.site.create({
        data: {
            name: "Sweet Haven Bakery",
            description: "Artisan bakery specializing in custom wedding cakes, fresh pastries, and gluten-free options",
            subdomain: "sweet-haven",
            brandColor: "#f59e0b",
            fontFamily: "Playfair Display",

            // SEO Enhancements
            businessType: "Bakery",
            industryCategory: "Artisan Bakery & Cafe",
            primaryKeywords: [
                "bakery near me",
                "custom wedding cakes San Francisco",
                "fresh bread bakery",
                "artisan pastries"
            ],
            secondaryKeywords: [
                "gluten-free bakery",
                "vegan cupcakes",
                "birthday cake delivery",
                "sourdough bread"
            ],
            localModifiers: ["San Francisco", "Bay Area", "Downtown SF"],

            heroTitle: "Freshly Baked Every Morning",
            heroSubtitle: "Custom cakes, artisan breads, and pastries made with love",
            heroImage: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1200",
            heroCTA: "Order Online",

            aboutTitle: "Our Story",
            aboutContent: "Founded in 2015, Sweet Haven Bakery has been San Francisco's premier destination for custom cakes and artisan baked goods. Our master bakers use only the finest organic ingredients to create memorable treats for every occasion.",
            aboutImage: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800",

            servicesTitle: "What We Offer",

            contactEmail: "orders@sweethaven.com",
            contactPhone: "+1 (415) 555-CAKE",
            contactAddress: "123 Baker Street, San Francisco, CA 94102",

            facebookUrl: "https://facebook.com/sweethaven",
            instagramUrl: "https://instagram.com/sweethaven",

            showHero: true,
            showAbout: true,
            showServices: true,
            showProducts: true,
            showTestimonials: true,
            showContact: true,
            showFAQ: true,

            metaTitle: "Sweet Haven Bakery - Custom Wedding Cakes & Fresh Pastries | San Francisco",
            metaDescription: "Award-winning bakery in San Francisco. Custom wedding cakes, fresh bread, gluten-free options. Order online for delivery or pickup.",

            navLinks: {
                create: [
                    { label: "Home", href: "#hero", order: 1 },
                    { label: "About", href: "#about", order: 2 },
                    { label: "Products", href: "#products", order: 3 },
                    { label: "FAQ", href: "#faq", order: 4 },
                    { label: "Contact", href: "#contact", order: 5 }
                ]
            },

            services: {
                create: [
                    {
                        title: "Custom Wedding Cakes",
                        description: "Bespoke designs for your special day, starting at $300",
                        icon: "🎂",
                        order: 1
                    },
                    {
                        title: "Fresh Artisan Bread",
                        description: "Sourdough, whole wheat, and specialty loaves baked daily",
                        icon: "🍞",
                        order: 2
                    },
                    {
                        title: "Gluten-Free Options",
                        description: "Delicious treats for dietary restrictions",
                        icon: "🌾",
                        order: 3
                    }
                ]
            },

            products: {
                create: [
                    {
                        name: "Three-Tier Wedding Cake",
                        description: "Elegant buttercream wedding cake with custom decorations",
                        price: "Starting at $450",
                        image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600",
                        slug: "three-tier-wedding-cake",
                        keywords: ["wedding cake", "custom cake", "buttercream cake"],
                        metaTitle: "Three-Tier Wedding Cake - Sweet Haven Bakery",
                        metaDescription: "Beautiful three-tier wedding cake with custom decorations. Choose your flavors and design.",
                        imageAlt: "Three-tier white buttercream wedding cake with fresh roses",
                        ingredients: ["flour", "sugar", "eggs", "butter", "vanilla"],
                        allergens: ["gluten", "dairy", "eggs"],
                        servingSize: "Serves 50-60 guests",
                        dietaryInfo: [],
                        order: 1,
                        isActive: true
                    },
                    {
                        name: "Vegan Chocolate Cupcakes",
                        description: "Rich chocolate cupcakes made without animal products",
                        price: "$36/dozen",
                        image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600",
                        slug: "vegan-chocolate-cupcakes",
                        keywords: ["vegan cupcakes", "chocolate cupcakes", "dairy-free"],
                        ingredients: ["flour", "cocoa", "coconut oil", "almond milk"],
                        allergens: ["gluten"],
                        servingSize: "12 cupcakes",
                        dietaryInfo: ["vegan", "dairy-free"],
                        order: 2,
                        isActive: true
                    },
                    {
                        name: "Sourdough Bread",
                        description: "Traditional sourdough with crispy crust and tangy flavor",
                        price: "$8",
                        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600",
                        slug: "sourdough-bread",
                        keywords: ["sourdough", "artisan bread", "fresh bread"],
                        ingredients: ["flour", "water", "salt", "sourdough starter"],
                        allergens: ["gluten"],
                        servingSize: "1 loaf",
                        dietaryInfo: ["organic"],
                        order: 3,
                        isActive: true
                    }
                ]
            },

            testimonials: {
                create: [
                    {
                        name: "Emily & James",
                        role: "Wedding Clients",
                        content: "Our wedding cake was absolutely stunning and tasted even better! Sweet Haven made our dream cake a reality.",
                        rating: 5,
                        order: 1
                    },
                    {
                        name: "Sarah Martinez",
                        role: "Regular Customer",
                        content: "Best gluten-free options in the city! Finally a bakery that doesn't compromise on taste.",
                        rating: 5,
                        order: 2
                    },
                    {
                        name: "David Chen",
                        role: "Corporate Client",
                        content: "We order from Sweet Haven for all our office events. Always fresh, always delicious!",
                        rating: 5,
                        order: 3
                    }
                ]
            },

            faqs: {
                create: [
                    {
                        question: "How far in advance should I order a custom wedding cake?",
                        answer: "We recommend ordering your wedding cake at least 3-4 months in advance to ensure availability. However, we can sometimes accommodate rush orders with 2-4 weeks notice depending on our schedule.",
                        order: 1,
                        isActive: true
                    },
                    {
                        question: "Do you offer gluten-free and vegan options?",
                        answer: "Yes! We have a full line of gluten-free baked goods and vegan options. Our vegan chocolate cupcakes and gluten-free bread are customer favorites. All items are prepared in a dedicated area to prevent cross-contamination.",
                        order: 2,
                        isActive: true
                    },
                    {
                        question: "What are your delivery options?",
                        answer: "We offer free delivery within 5 miles of our bakery for orders over $50. For wedding cakes and large orders, we provide setup and delivery services throughout the San Francisco Bay Area. Delivery fees vary based on distance.",
                        order: 3,
                        isActive: true
                    },
                    {
                        question: "Can I schedule a cake tasting?",
                        answer: "Absolutely! We offer complimentary cake tastings for wedding cake orders. Please call us at (415) 555-CAKE to schedule your appointment. Tastings are available Tuesday-Saturday by appointment only.",
                        order: 4,
                        isActive: true
                    }
                ]
            }
        }
    });

    // Update aggregate rating for bakery
    await updateSiteRating(bakerySite.id);

    // Create Sample Site 2: Car Dealership with Enhanced SEO
    const carDealerSite = await prisma.site.create({
        data: {
            name: "Premium Motors Austin",
            description: "Certified pre-owned luxury vehicles with unbeatable prices and financing",
            subdomain: "premium-motors",
            brandColor: "#1e40af",
            fontFamily: "Inter",

            // SEO Enhancements
            businessType: "AutoDealer",
            industryCategory: "Luxury Pre-Owned Vehicles",
            primaryKeywords: [
                "used cars Austin",
                "certified pre-owned Austin",
                "luxury cars Texas",
                "Tesla dealer Austin"
            ],
            secondaryKeywords: [
                "BMW dealer Austin",
                "Mercedes Austin",
                "car financing bad credit",
                "trade-in value Austin"
            ],
            localModifiers: ["Austin", "Texas", "Central Texas", "ATX"],

            googleAnalyticsId: "G-XXXXXXXXXX", // Example
            googleSiteVerification: "example-verification-code",

            heroTitle: "Find Your Dream Car Today",
            heroSubtitle: "Certified pre-owned luxury vehicles with flexible financing and warranty",
            heroImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200",
            heroCTA: "Browse Inventory",

            aboutTitle: "Why Choose Premium Motors",
            aboutContent: "With over 20 years serving Austin, Premium Motors has become the trusted choice for luxury pre-owned vehicles. Every car undergoes a rigorous 150-point inspection and comes with our comprehensive warranty.",
            aboutImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",

            servicesTitle: "Our Services",

            contactEmail: "sales@premiummotors.com",
            contactPhone: "+1 (512) 555-AUTO",
            contactAddress: "456 Highway 183, Austin, TX 78701",

            facebookUrl: "https://facebook.com/premiummotors",
            instagramUrl: "https://instagram.com/premiummotors",

            showHero: true,
            showAbout: true,
            showServices: true,
            showProducts: true,
            showTestimonials: true,
            showContact: true,
            showFAQ: true,

            metaTitle: "Premium Motors Austin - Certified Pre-Owned Luxury Cars | Best Prices in Texas",
            metaDescription: "Shop certified pre-owned Tesla, BMW, Mercedes, and more. Flexible financing, trade-ins accepted. Serving Austin, TX for over 20 years.",

            navLinks: {
                create: [
                    { label: "Home", href: "#hero", order: 1 },
                    { label: "Inventory", href: "#products", order: 2 },
                    { label: "Financing", href: "#services", order: 3 },
                    { label: "FAQ", href: "#faq", order: 4 },
                    { label: "Contact", href: "#contact", order: 5 }
                ]
            },

            services: {
                create: [
                    {
                        title: "150-Point Inspection",
                        description: "Every vehicle thoroughly inspected and certified",
                        icon: "✓",
                        order: 1
                    },
                    {
                        title: "Flexible Financing",
                        description: "Competitive rates for all credit types, even bad credit",
                        icon: "💳",
                        order: 2
                    },
                    {
                        title: "Trade-In Program",
                        description: "Get top dollar for your current vehicle",
                        icon: "🔄",
                        order: 3
                    }
                ]
            },

            products: {
                create: [
                    {
                        name: "2024 Tesla Model 3",
                        description: "Long Range AWD with Autopilot, Premium Interior, only 5,000 miles",
                        price: "$42,999",
                        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600",
                        slug: "2024-tesla-model-3-vin123456",
                        keywords: ["Tesla Model 3", "electric car", "used Tesla Austin"],
                        metaTitle: "2024 Tesla Model 3 Long Range - Premium Motors Austin",
                        metaDescription: "Certified pre-owned 2024 Tesla Model 3 with only 5,000 miles. Autopilot, premium interior, full warranty.",
                        imageAlt: "2024 Tesla Model 3 in Pearl White - front view",

                        // Vehicle-specific fields
                        vehicleType: "Car",
                        make: "Tesla",
                        model: "Model 3",
                        year: 2024,
                        mileage: 5000,
                        vin: "5YJ3E1EA8PF123456",
                        fuelType: "Electric",
                        condition: "Used",
                        transmission: "Automatic",
                        exteriorColor: "Pearl White",
                        interiorColor: "Black",

                        features: [
                            "Autopilot",
                            "Premium Audio",
                            "Glass Roof",
                            "Heated Seats",
                            "Supercharger Access"
                        ],
                        order: 1,
                        isActive: true
                    },
                    {
                        name: "2023 BMW 3 Series",
                        description: "330i xDrive with M Sport Package, Navigation, low miles",
                        price: "$38,500",
                        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600",
                        slug: "2023-bmw-3-series-330i",
                        keywords: ["BMW 3 Series", "luxury sedan", "used BMW Austin"],

                        vehicleType: "Car",
                        make: "BMW",
                        model: "3 Series 330i",
                        year: 2023,
                        mileage: 12000,
                        vin: "WBA8B9C50JK123456",
                        fuelType: "Gasoline",
                        condition: "Certified Pre-Owned",
                        transmission: "Automatic",
                        exteriorColor: "Alpine White",
                        interiorColor: "Black Leather",

                        features: [
                            "M Sport Package",
                            "Navigation",
                            "Sunroof",
                            "Heated Seats",
                            "Apple CarPlay"
                        ],
                        order: 2,
                        isActive: true
                    },
                    {
                        name: "2022 Mercedes-Benz E-Class",
                        description: "E 350 4MATIC with Premium Package, immaculate condition",
                        price: "$45,900",
                        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600",
                        slug: "2022-mercedes-e-class-e350",
                        keywords: ["Mercedes E-Class", "luxury car", "used Mercedes Austin"],

                        vehicleType: "Car",
                        make: "Mercedes-Benz",
                        model: "E-Class E 350",
                        year: 2022,
                        mileage: 18000,
                        vin: "WDDZF4KB5NA123456",
                        fuelType: "Gasoline",
                        condition: "Certified Pre-Owned",
                        transmission: "Automatic",
                        exteriorColor: "Obsidian Black",
                        interiorColor: "Saddle Brown Leather",

                        features: [
                            "Premium Package",
                            "Panoramic Roof",
                            "Burmester Sound",
                            "Heated & Cooled Seats",
                            "Driver Assistance Package"
                        ],
                        order: 3,
                        isActive: true
                    }
                ]
            },

            testimonials: {
                create: [
                    {
                        name: "Michael Rodriguez",
                        role: "Tesla Model 3 Owner",
                        content: "Best car buying experience ever! No pressure, transparent pricing, and they helped me get amazing financing despite my credit score.",
                        rating: 5,
                        order: 1
                    },
                    {
                        name: "Jennifer Thompson",
                        role: "BMW 3 Series Owner",
                        content: "The team at Premium Motors went above and beyond. My BMW was in perfect condition and the trade-in process was seamless.",
                        rating: 5,
                        order: 2
                    },
                    {
                        name: "Robert Kim",
                        role: "Mercedes E-Class Owner",
                        content: "Highly recommend! They found exactly what I was looking for and the financing terms were better than any other dealer.",
                        rating: 5,
                        order: 3
                    }
                ]
            },

            faqs: {
                create: [
                    {
                        question: "What does 'Certified Pre-Owned' mean?",
                        answer: "Our Certified Pre-Owned vehicles undergo a comprehensive 150-point inspection covering engine, transmission, brakes, electrical systems, and more. Each CPO vehicle comes with an extended warranty, roadside assistance, and a complete vehicle history report. We only certify vehicles that meet our strict quality standards.",
                        order: 1,
                        isActive: true
                    },
                    {
                        question: "Can I get financing with bad credit?",
                        answer: "Yes! We work with multiple lenders who specialize in all credit situations, including bad credit, no credit, and bankruptcy. Our finance team will work hard to get you approved with competitive rates. We've helped hundreds of customers with credit challenges get into their dream car.",
                        order: 2,
                        isActive: true
                    },
                    {
                        question: "Do you accept trade-ins?",
                        answer: "Absolutely! We accept all trade-ins regardless of make, model, or condition. Our team will provide you with a fair market value assessment. You can use your trade-in value as a down payment on your next vehicle. We make the trade-in process quick and easy.",
                        order: 3,
                        isActive: true
                    },
                    {
                        question: "What warranty comes with the vehicles?",
                        answer: "All Certified Pre-Owned vehicles come with our Premium Warranty covering major components for 2 years or 24,000 miles. We also offer extended warranty options up to 7 years/100,000 miles. Additionally, all CPO vehicles include 24/7 roadside assistance.",
                        order: 4,
                        isActive: true
                    },
                    {
                        question: "Can I test drive a vehicle?",
                        answer: "Of course! We encourage test drives for all our vehicles. You can schedule a test drive online or just walk in during business hours. We're open Monday-Saturday 9am-7pm and Sunday 11am-5pm. Extended test drives can be arranged for serious buyers.",
                        order: 5,
                        isActive: true
                    }
                ]
            }
        }
    });

    // Update aggregate rating for car dealer
    await updateSiteRating(carDealerSite.id);

    console.log('✅ Database seeded with enhanced SEO data!');
    console.log('\nSample sites created:');
    console.log(`- ${bakerySite.name}: http://sweet-haven.localhost:3000`);
    console.log(`  Business Type: ${bakerySite.businessType}`);
    console.log(`  Primary Keywords: ${bakerySite.primaryKeywords.join(', ')}`);
    console.log(`  Products: ${await prisma.product.count({ where: { siteId: bakerySite.id } })}`);
    console.log(`  FAQs: ${await prisma.fAQ.count({ where: { siteId: bakerySite.id } })}`);
    console.log(`  Aggregate Rating: ${bakerySite.aggregateRating || 'Calculating...'}`);
    console.log('');
    console.log(`- ${carDealerSite.name}: http://premium-motors.localhost:3000`);
    console.log(`  Business Type: ${carDealerSite.businessType}`);
    console.log(`  Primary Keywords: ${carDealerSite.primaryKeywords.join(', ')}`);
    console.log(`  Vehicles: ${await prisma.product.count({ where: { siteId: carDealerSite.id } })}`);
    console.log(`  FAQs: ${await prisma.fAQ.count({ where: { siteId: carDealerSite.id } })}`);
    console.log(`  Aggregate Rating: ${carDealerSite.aggregateRating || 'Calculating...'}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
