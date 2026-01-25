import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Skoda India site with all features...');

    // Delete existing data to avoid conflicts
    await prisma.site.deleteMany({
        where: { subdomain: 'skoda-india' }
    });

    // Create comprehensive site with Skoda branding
    const skodaSite = await prisma.site.create({
        data: {
            name: "Skoda India Official",
            description: "Experience European Luxury and Safety with Skoda India",
            subdomain: "skoda-india",
            brandColor: "#4BA82E", // Skoda signature green
            fontFamily: "Inter",

            // Hero Section
            heroTitle: "Driven by Explorers",
            heroSubtitle: "Discover the perfect blend of performance, safety, and simply clever solutions.",
            heroImage: "https://images.unsplash.com/photo-1606148644562-09d332715454?w=1200",
            heroCTA: "Book a Test Drive",
            heroCTALink: "#contact",

            // About Section
            aboutTitle: "The Skoda Heritage",
            aboutContent: "With over 125 years of history, Skoda stands for precision engineering and human-centric innovation. In India, we are committed to providing cars that are 'Built to Last' with 5-star safety ratings and unparalleled driving dynamics.",
            aboutImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",

            // Contact & Social
            contactTitle: "Connect With Us",
            contactEmail: "customercare@skoda-india.co.in",
            contactPhone: "+91 1800 209 4646",
            contactAddress: "Skoda Auto Volkswagen India Pvt Ltd, Mumbai-Pune Highway, Pune, Maharashtra",

            facebookUrl: "https://facebook.com/skodaindia",
            instagramUrl: "https://instagram.com/skodaindia",
            twitterUrl: "https://twitter.com/skodaindia",
            whatsappUrl: "https://wa.me/9118002094646",

            // Categories & Payment
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

            // SEO
            metaTitle: "Skoda India - Simply Clever | Sedans & SUVs",
            metaDescription: "Explore the latest Skoda models in India including Kushaq, Slavia and Kodiaq. Experience European build quality and safety.",

            // Visibility Toggles
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

            // Navigation Links
            navLinks: {
                create: [
                    { label: "Models", href: "#products", order: 1, isExternal: false },
                    { label: "Services", href: "#services", order: 2, isExternal: false },
                    { label: "Locate Dealer", href: "#locations", order: 3, isExternal: false },
                    { label: "Book Now", href: "#contact", order: 4, isExternal: false }
                ]
            },

            // Banner Carousel
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

            // Featured Products (Car Models)
            products: {
                create: [
                    {
                        name: "Skoda Kushaq",
                        description: "Powerful TSI engine with premium interiors and top-tier safety.",
                        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600",
                        price: "Starting at ₹11,89,000",
                        ctaText: "Configure Now",
                        ctaLink: "/kushaq",
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

            // Services
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

            // Business Hours
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

            // Tags
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

            // Testimonials
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
            }
        }
    });

    console.log('✅ Skoda India site created successfully!');
    console.log(`Visit: http://skoda-india.localhost:3000`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });