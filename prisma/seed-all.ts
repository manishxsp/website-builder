import { PrismaClient } from '@prisma/client';
import { updateSiteRating } from '../src/lib/seo-utils';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database with all sites and enhanced SEO features...\n');

    // Delete existing data
    await prisma.fAQ.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.location.deleteMany();
    await prisma.businessHour.deleteMany();
    await prisma.banner.deleteMany();
    await prisma.product.deleteMany();
    await prisma.navLink.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.service.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.site.deleteMany();

    // ============================================
    // SITE 1: BAKERY (Sweet Haven)
    // ============================================
    console.log('Creating Sweet Haven Bakery...');
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

    await updateSiteRating(bakerySite.id);
    console.log('✅ Sweet Haven Bakery created\n');

    // ============================================
    // SITE 2: CAR DEALERSHIP (Premium Motors)
    // ============================================
    console.log('Creating Premium Motors Austin...');
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

            googleAnalyticsId: "G-XXXXXXXXXX",
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

    await updateSiteRating(carDealerSite.id);
    console.log('✅ Premium Motors Austin created\n');

    // ============================================
    // SITE 3: SKODA INDIA
    // ============================================
    console.log('Creating Skoda India...');
    const skodaSite = await prisma.site.create({
        data: {
            name: "Skoda India Official",
            description: "Experience European Luxury and Safety with Skoda India",
            subdomain: "skoda-india",
            brandColor: "#4BA82E",
            fontFamily: "Inter",

            // SEO Enhancements
            businessType: "AutoDealer",
            industryCategory: "European Automobile Manufacturer",
            primaryKeywords: [
                "Skoda cars India",
                "Skoda Kushaq price",
                "Skoda Slavia",
                "European cars India"
            ],
            secondaryKeywords: [
                "Skoda dealer near me",
                "Skoda service center",
                "TSI engine",
                "5-star safety car"
            ],
            localModifiers: ["India", "Mumbai", "Pune", "Delhi"],

            heroTitle: "Driven by Explorers",
            heroSubtitle: "Discover the perfect blend of performance, safety, and simply clever solutions.",
            heroImage: "https://images.unsplash.com/photo-1606148644562-09d332715454?w=1200",
            heroCTA: "Book a Test Drive",
            heroCTALink: "#contact",

            aboutTitle: "The Skoda Heritage",
            aboutContent: "With over 125 years of history, Skoda stands for precision engineering and human-centric innovation. In India, we are committed to providing cars that are 'Built to Last' with 5-star safety ratings and unparalleled driving dynamics.",
            aboutImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",

            contactTitle: "Connect With Us",
            contactEmail: "customercare@skoda-india.co.in",
            contactPhone: "+91 1800 209 4646",
            contactAddress: "Skoda Auto Volkswagen India Pvt Ltd, Mumbai-Pune Highway, Pune, Maharashtra",

            facebookUrl: "https://facebook.com/skodaindia",
            instagramUrl: "https://instagram.com/skodaindia",
            twitterUrl: "https://twitter.com/skodaindia",
            whatsappUrl: "https://wa.me/9118002094646",

            categories: [
                "Automobile Dealership",
                "Car Service Center",
                "Auto Parts Store",
                "Used Car Dealer"
            ],
            paymentMethods: [
                "Bank Transfer",
                "Credit Card",
                "Financing Available",
                "Net Banking",
                "UPI"
            ],
            parkingInfo: "Customer parking available on-site",

            metaTitle: "Skoda India - Simply Clever | Sedans & SUVs",
            metaDescription: "Explore the latest Skoda models in India including Kushaq, Slavia and Kodiaq. Experience European build quality and safety.",

            showHero: false,
            showBanners: true,
            showAbout: true,
            showServices: true,
            showProducts: true,
            showGallery: true,
            showTestimonials: true,
            showBusinessHours: true,
            showLocations: true,
            showContact: true,
            showFAQ: true,

            navLinks: {
                create: [
                    { label: "Models", href: "#products", order: 1, isExternal: false },
                    { label: "Services", href: "#services", order: 2, isExternal: false },
                    { label: "Locate Dealer", href: "#locations", order: 3, isExternal: false },
                    { label: "FAQ", href: "#faq", order: 4, isExternal: false },
                    { label: "Book Now", href: "#contact", order: 5, isExternal: false }
                ]
            },

            banners: {
                create: [
                    {
                        title: "The New Skoda Slavia",
                        subtitle: "The sedan that's high on performance and elegance.",
                        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200",
                        ctaText: "Explore Slavia",
                        ctaLink: "#products",
                        order: 1,
                        isActive: true
                    },
                    {
                        title: "Skoda Kushaq",
                        subtitle: "Make way for the King of the road. 5-Star Global NCAP Safety.",
                        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200",
                        ctaText: "Explore Kushaq",
                        ctaLink: "#products",
                        order: 2,
                        isActive: true
                    }
                ]
            },

            products: {
                create: [
                    {
                        name: "Skoda Kushaq",
                        description: "Powerful TSI engine with premium interiors and top-tier safety.",
                        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600",
                        price: "Starting at ₹11,89,000",
                        ctaText: "Configure Now",
                        ctaLink: "/kushaq",
                        slug: "skoda-kushaq",
                        keywords: ["Skoda Kushaq", "SUV India", "TSI engine", "5-star safety"],

                        vehicleType: "SUV",
                        make: "Skoda",
                        model: "Kushaq",
                        year: 2024,
                        fuelType: "Gasoline",
                        condition: "New",
                        transmission: "Automatic",

                        features: [
                            "1.0L / 1.5L TSI Engine",
                            "Ventilated Front Seats",
                            "Electric Sunroof",
                            "6 Airbags Standard"
                        ],
                        order: 1,
                        isActive: true
                    },
                    {
                        name: "Skoda Slavia",
                        description: "A premium sedan designed for those who love to drive.",
                        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600",
                        price: "Starting at ₹10,69,000",
                        ctaText: "Configure Now",
                        ctaLink: "/slavia",
                        slug: "skoda-slavia",
                        keywords: ["Skoda Slavia", "sedan India", "premium car"],

                        vehicleType: "Car",
                        make: "Skoda",
                        model: "Slavia",
                        year: 2024,
                        fuelType: "Gasoline",
                        condition: "New",
                        transmission: "Automatic",

                        features: [
                            "Largest-in-class Boot Space",
                            "Wireless SmartLink",
                            "Signature Crystaline LED",
                            "High Ground Clearance"
                        ],
                        order: 2,
                        isActive: true
                    }
                ]
            },

            services: {
                create: [
                    {
                        title: "Periodic Maintenance",
                        description: "Keep your Skoda in peak condition with scheduled servicing.",
                        icon: "🚗",
                        order: 1
                    },
                    {
                        title: "Peace of Mind Package",
                        description: "4 years of warranty and roadside assistance.",
                        icon: "🛡️",
                        order: 2
                    },
                    {
                        title: "Body & Paint",
                        description: "Restore your car to showroom condition with expert care.",
                        icon: "🎨",
                        order: 3
                    }
                ]
            },

            businessHours: {
                create: [
                    { day: "Monday", openTime: "09:30 AM", closeTime: "07:00 PM", isClosed: false, order: 1 },
                    { day: "Tuesday", openTime: "09:30 AM", closeTime: "07:00 PM", isClosed: false, order: 2 },
                    { day: "Wednesday", openTime: "09:30 AM", closeTime: "07:00 PM", isClosed: false, order: 3 },
                    { day: "Thursday", openTime: "09:30 AM", closeTime: "07:00 PM", isClosed: false, order: 4 },
                    { day: "Friday", openTime: "09:30 AM", closeTime: "07:00 PM", isClosed: false, order: 5 },
                    { day: "Saturday", openTime: "09:30 AM", closeTime: "07:00 PM", isClosed: false, order: 6 },
                    { day: "Sunday", openTime: "10:00 AM", closeTime: "05:00 PM", isClosed: false, order: 7 }
                ]
            },

            tags: {
                create: [
                    { name: "Skoda Slavia", link: "/slavia", order: 1 },
                    { name: "Skoda Kushaq", link: "/kushaq", order: 2 },
                    { name: "Skoda Kodiaq", link: "/kodiaq", order: 3 },
                    { name: "Simply Clever", link: "/features", order: 4 },
                    { name: "TSI Technology", link: "/engine", order: 5 },
                    { name: "Exchange Bonus", link: "/offers", order: 6 }
                ]
            },

            testimonials: {
                create: [
                    {
                        name: "Amitabh Singh",
                        role: "Slavia Owner",
                        content: "The driving dynamics are unmatched in this segment. Truly a driver's car.",
                        rating: 5,
                        order: 1
                    },
                    {
                        name: "Sandeep Varma",
                        role: "Kushaq Owner",
                        content: "Safe, sturdy, and elegant. Skoda service has also improved significantly.",
                        rating: 5,
                        order: 2
                    }
                ]
            },

            faqs: {
                create: [
                    {
                        question: "What is the warranty period for Skoda cars?",
                        answer: "All Skoda cars come with a standard 4-year/1,00,000 km warranty (whichever comes first). Additionally, we offer extended warranty packages for added peace of mind.",
                        order: 1,
                        isActive: true
                    },
                    {
                        question: "What is TSI technology?",
                        answer: "TSI (Turbocharged Stratified Injection) is Skoda's advanced petrol engine technology that combines turbocharging with direct fuel injection. This results in better fuel efficiency, lower emissions, and superior performance.",
                        order: 2,
                        isActive: true
                    },
                    {
                        question: "How do I book a test drive?",
                        answer: "You can book a test drive by calling our customer care at 1800 209 4646, visiting our website, or contacting your nearest Skoda dealership. Test drives are available at your convenience.",
                        order: 3,
                        isActive: true
                    }
                ]
            }
        }
    });

    await updateSiteRating(skodaSite.id);
    console.log('✅ Skoda India created\n');

    // ============================================
    // SITE 4: SAMSUNG SMARTPLAZA
    // ============================================
    console.log('Creating Samsung SmartPlaza...');
    const samsungSite = await prisma.site.create({
        data: {
            name: "Samsung SmartPlaza",
            description: "Your one-stop destination for Samsung products",
            subdomain: "samsung-plaza",
            brandColor: "#1428A0",
            fontFamily: "Inter",

            // SEO Enhancements
            businessType: "LocalBusiness",
            industryCategory: "Electronics Retail Store",
            primaryKeywords: [
                "Samsung store near me",
                "Samsung mobile phones",
                "Samsung refrigerator",
                "Samsung SmartPlaza"
            ],
            secondaryKeywords: [
                "Galaxy S25 Ultra",
                "Samsung service center",
                "Samsung appliances",
                "Galaxy Z Fold"
            ],
            localModifiers: ["Gurugram", "Haryana", "Delhi NCR", "India"],

            heroTitle: "Welcome to Samsung SmartPlaza",
            heroSubtitle: "Experience the latest in technology and innovation",
            heroImage: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200",
            heroCTA: "Explore Products",
            heroCTALink: "#products",

            aboutTitle: "About Us",
            aboutContent: "Samsung SmartPlaza is your trusted destination for all Samsung products. With years of experience and a commitment to customer satisfaction, we bring you the latest technology and exceptional service.",
            aboutImage: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800",

            servicesTitle: "Our Services",
            productsTitle: "Featured Products",

            contactTitle: "Get In Touch",
            contactEmail: "info@samsungplaza.com",
            contactPhone: "+91 8047493129",
            contactAddress: "NH 48, Part 2, 32nd Avenue, Gurugram, Haryana, India",

            facebookUrl: "https://facebook.com/samsungplaza",
            instagramUrl: "https://instagram.com/samsungplaza",
            twitterUrl: "https://twitter.com/samsungplaza",
            linkedinUrl: "https://linkedin.com/company/samsungplaza",
            youtubeUrl: "https://youtube.com/samsungplaza",
            whatsappUrl: "https://wa.me/918047493129",

            categories: [
                "Electronics Retail And Repair Shop",
                "Refrigerator Shop",
                "Washing Machine & Dryer Shop",
                "Air Conditioning Store",
                "Computer Shop"
            ],
            paymentMethods: [
                "Cash",
                "Credit Card",
                "Debit Card",
                "Master Card",
                "Cheque",
                "Online Payment",
                "Visa"
            ],
            parkingInfo: "Paid parking on site",

            metaTitle: "Samsung SmartPlaza - Official Samsung Store | Gurugram",
            metaDescription: "Shop the latest Samsung products at Samsung SmartPlaza. Electronics, appliances, and more with expert service.",

            showHero: false,
            showBanners: true,
            showAbout: true,
            showServices: true,
            showProducts: true,
            showGallery: false,
            showTestimonials: true,
            showBusinessHours: true,
            showLocations: true,
            showContact: true,
            showFAQ: true,

            navLinks: {
                create: [
                    { label: "Home", href: "#hero", order: 1, isExternal: false },
                    { label: "Products", href: "#products", order: 2, isExternal: false },
                    { label: "Services", href: "#services", order: 3, isExternal: false },
                    { label: "Locations", href: "#locations", order: 4, isExternal: false },
                    { label: "Contact", href: "#contact", order: 5, isExternal: false }
                ]
            },

            banners: {
                create: [
                    {
                        title: "Galaxy S25 Ultra",
                        subtitle: "Pre-order now and get exclusive offers",
                        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200",
                        ctaText: "Pre-Order Now",
                        ctaLink: "#products",
                        order: 1,
                        isActive: true
                    },
                    {
                        title: "Samsung Double Door Refrigerators",
                        subtitle: "Keep your food fresh with advanced cooling technology",
                        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=1200",
                        ctaText: "Shop Now",
                        ctaLink: "#products",
                        order: 2,
                        isActive: true
                    },
                    {
                        title: "Galaxy Z Fold6",
                        subtitle: "Unfold your world with the latest foldable technology",
                        image: "https://images.unsplash.com/photo-1592286927505-2fd0f2d6b7f4?w=1200",
                        ctaText: "Learn More",
                        ctaLink: "#products",
                        order: 3,
                        isActive: true
                    }
                ]
            },

            products: {
                create: [
                    {
                        name: "Galaxy S25 Ultra",
                        description: "The ultimate smartphone with AI-powered features and stunning display",
                        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600",
                        price: "Starting at ₹1,29,999",
                        ctaText: "View Details",
                        ctaLink: "/products/galaxy-s25-ultra",
                        slug: "galaxy-s25-ultra",
                        keywords: ["Galaxy S25 Ultra", "Samsung flagship", "AI smartphone"],
                        features: [
                            "6.8-inch Dynamic AMOLED display",
                            "200MP camera with AI enhancement",
                            "S Pen included",
                            "5000mAh battery"
                        ],
                        order: 1,
                        isActive: true
                    },
                    {
                        name: "Galaxy Z Fold6",
                        description: "Experience the future of smartphones with foldable technology",
                        image: "https://images.unsplash.com/photo-1592286927505-2fd0f2d6b7f4?w=600",
                        price: "Starting at ₹1,64,999",
                        ctaText: "View Details",
                        ctaLink: "/products/galaxy-z-fold6",
                        slug: "galaxy-z-fold6",
                        keywords: ["Galaxy Z Fold6", "foldable phone", "Samsung foldable"],
                        features: [
                            "7.6-inch foldable display",
                            "Multi-tasking capabilities",
                            "Premium design",
                            "Advanced camera system"
                        ],
                        order: 2,
                        isActive: true
                    },
                    {
                        name: "Samsung Double Door Refrigerator",
                        description: "Keep your food fresh with advanced cooling technology",
                        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600",
                        price: "Starting at ₹45,990",
                        ctaText: "View Details",
                        ctaLink: "/products/refrigerator",
                        slug: "samsung-refrigerator",
                        keywords: ["Samsung refrigerator", "double door fridge", "inverter refrigerator"],
                        features: [
                            "Digital Inverter Technology",
                            "All-around cooling",
                            "Convertible modes",
                            "Energy efficient"
                        ],
                        order: 3,
                        isActive: true
                    }
                ]
            },

            services: {
                create: [
                    {
                        title: "Sales",
                        description: "Browse and purchase the latest Samsung products",
                        icon: "🛒",
                        order: 1
                    },
                    {
                        title: "Repair & Service",
                        description: "Expert repair services for all Samsung devices",
                        icon: "🔧",
                        order: 2
                    },
                    {
                        title: "Installation",
                        description: "Professional installation for appliances",
                        icon: "⚙️",
                        order: 3
                    },
                    {
                        title: "Extended Warranty",
                        description: "Protect your investment with extended coverage",
                        icon: "🛡️",
                        order: 4
                    }
                ]
            },

            businessHours: {
                create: [
                    { day: "Monday", openTime: "11:00 AM", closeTime: "08:00 PM", isClosed: false, order: 1 },
                    { day: "Tuesday", openTime: "11:00 AM", closeTime: "08:00 PM", isClosed: false, order: 2 },
                    { day: "Wednesday", openTime: "11:00 AM", closeTime: "08:00 PM", isClosed: false, order: 3 },
                    { day: "Thursday", openTime: "11:00 AM", closeTime: "08:00 PM", isClosed: false, order: 4 },
                    { day: "Friday", openTime: "11:00 AM", closeTime: "08:00 PM", isClosed: false, order: 5 },
                    { day: "Saturday", openTime: "11:00 AM", closeTime: "08:00 PM", isClosed: false, order: 6 },
                    { day: "Sunday", openTime: "11:00 AM", closeTime: "08:00 PM", isClosed: false, order: 7 }
                ]
            },

            locations: {
                create: [
                    {
                        name: "Samsung SmartPlaza in Haryana",
                        city: "Gurugram",
                        state: "Haryana",
                        address: "7JWV+G28+HQ, Gurugram, Haryana, India",
                        mapLink: "https://maps.google.com/?q=7JWV+G28+HQ",
                        order: 1
                    },
                    {
                        name: "Samsung SmartPlaza in Gurugram",
                        city: "Gurugram",
                        state: "Haryana",
                        order: 2
                    }
                ]
            },

            tags: {
                create: [
                    { name: "Galaxy S25", link: "/products/galaxy-s25", order: 1 },
                    { name: "Galaxy S25 Ultra", link: "/products/galaxy-s25-ultra", order: 2 },
                    { name: "Galaxy S25+", link: "/products/galaxy-s25-plus", order: 3 },
                    { name: "Buds 3 Pro", link: "/products/buds-3-pro", order: 4 },
                    { name: "Galaxy Watch7", link: "/products/galaxy-watch7", order: 5 },
                    { name: "Galaxy Z Fold6", link: "/products/galaxy-z-fold6", order: 6 },
                    { name: "Samsung Refrigerators", link: "/products/refrigerators", order: 7 },
                    { name: "Samsung Service Centre", link: "/service", order: 8 }
                ]
            },

            testimonials: {
                create: [
                    {
                        name: "Rajesh Kumar",
                        role: "Verified Customer",
                        content: "Excellent service and genuine Samsung products. The staff is very knowledgeable and helpful.",
                        rating: 5,
                        order: 1
                    },
                    {
                        name: "Priya Sharma",
                        role: "Verified Customer",
                        content: "Bought my Galaxy S25 Ultra from here. Great experience and competitive pricing!",
                        rating: 5,
                        order: 2
                    }
                ]
            },

            faqs: {
                create: [
                    {
                        question: "Do you offer EMI options?",
                        answer: "Yes, we offer flexible EMI options on all products. You can choose from 3, 6, 9, or 12-month EMI plans with zero down payment on select products. We accept all major credit and debit cards.",
                        order: 1,
                        isActive: true
                    },
                    {
                        question: "What is your return policy?",
                        answer: "We offer a 7-day return policy on most products. The product must be in original condition with all accessories and packaging. For defective products, we provide immediate replacement or repair under warranty.",
                        order: 2,
                        isActive: true
                    },
                    {
                        question: "Do you provide home delivery?",
                        answer: "Yes, we provide free home delivery within Gurugram for orders above ₹10,000. For large appliances like refrigerators and washing machines, we also offer professional installation services.",
                        order: 3,
                        isActive: true
                    }
                ]
            }
        }
    });

    await updateSiteRating(samsungSite.id);
    console.log('✅ Samsung SmartPlaza created\n');

    // ============================================
    // SUMMARY
    // ============================================
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ Database seeded successfully with enhanced SEO data!');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('🌐 Sample sites created:\n');

    console.log(`1️⃣  ${bakerySite.name}`);
    console.log(`    URL: http://sweet-haven.localhost:3001`);
    console.log(`    Type: ${bakerySite.businessType}`);
    console.log(`    Products: ${await prisma.product.count({ where: { siteId: bakerySite.id } })}`);
    console.log(`    FAQs: ${await prisma.fAQ.count({ where: { siteId: bakerySite.id } })}`);
    console.log(`    Rating: ${bakerySite.aggregateRating || 'N/A'} ⭐\n`);

    console.log(`2️⃣  ${carDealerSite.name}`);
    console.log(`    URL: http://premium-motors.localhost:3001`);
    console.log(`    Type: ${carDealerSite.businessType}`);
    console.log(`    Vehicles: ${await prisma.product.count({ where: { siteId: carDealerSite.id } })}`);
    console.log(`    FAQs: ${await prisma.fAQ.count({ where: { siteId: carDealerSite.id } })}`);
    console.log(`    Rating: ${carDealerSite.aggregateRating || 'N/A'} ⭐\n`);

    console.log(`3️⃣  ${skodaSite.name}`);
    console.log(`    URL: http://skoda-india.localhost:3001`);
    console.log(`    Type: ${skodaSite.businessType}`);
    console.log(`    Models: ${await prisma.product.count({ where: { siteId: skodaSite.id } })}`);
    console.log(`    FAQs: ${await prisma.fAQ.count({ where: { siteId: skodaSite.id } })}`);
    console.log(`    Rating: ${skodaSite.aggregateRating || 'N/A'} ⭐\n`);

    console.log(`4️⃣  ${samsungSite.name}`);
    console.log(`    URL: http://samsung-plaza.localhost:3001`);
    console.log(`    Type: ${samsungSite.businessType}`);
    console.log(`    Products: ${await prisma.product.count({ where: { siteId: samsungSite.id } })}`);
    console.log(`    FAQs: ${await prisma.fAQ.count({ where: { siteId: samsungSite.id } })}`);
    console.log(`    Rating: ${samsungSite.aggregateRating || 'N/A'} ⭐\n`);

    console.log('═══════════════════════════════════════════════════════');
    console.log('🚀 SEO Features Implemented:');
    console.log('   ✓ Industry-specific schemas (Bakery, AutoDealer)');
    console.log('   ✓ Product/Vehicle structured data');
    console.log('   ✓ FAQ schema with Q&A pairs');
    console.log('   ✓ Aggregate ratings from testimonials');
    console.log('   ✓ Primary & secondary keywords');
    console.log('   ✓ Local modifiers for geo-targeting');
    console.log('   ✓ Analytics integration fields');
    console.log('═══════════════════════════════════════════════════════');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
