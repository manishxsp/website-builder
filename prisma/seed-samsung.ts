import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Samsung SmartPlaza site with all features...');

    // Delete existing data
    await prisma.site.deleteMany({
        where: { subdomain: 'samsung-plaza' }
    });

    // Create comprehensive site with all features
    const samsungSite = await prisma.site.create({
        data: {
            name: "Samsung SmartPlaza",
            description: "Your one-stop destination for Samsung products",
            subdomain: "samsung-plaza",
            brandColor: "#1428A0",
            fontFamily: "Inter",

            // Hero Section
            heroTitle: "Welcome to Samsung SmartPlaza",
            heroSubtitle: "Experience the latest in technology and innovation",
            heroImage: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200",
            heroCTA: "Explore Products",
            heroCTALink: "#products",

            // About Section
            aboutTitle: "About Us",
            aboutContent: "Samsung SmartPlaza is your trusted destination for all Samsung products. With years of experience and a commitment to customer satisfaction, we bring you the latest technology and exceptional service.",
            aboutImage: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800",

            // Services
            servicesTitle: "Our Services",

            // Products
            productsTitle: "Featured Products",

            // Contact
            contactTitle: "Get In Touch",
            contactEmail: "info@samsungplaza.com",
            contactPhone: "+91 8047493129",
            contactAddress: "NH 48, Part 2, 32nd Avenue, Gurugram, Haryana, India",

            // Social Media
            facebookUrl: "https://facebook.com/samsungplaza",
            instagramUrl: "https://instagram.com/samsungplaza",
            twitterUrl: "https://twitter.com/samsungplaza",
            linkedinUrl: "https://linkedin.com/company/samsungplaza",
            youtubeUrl: "https://youtube.com/samsungplaza",
            whatsappUrl: "https://wa.me/918047493129",

            // Categories & Payment
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

            // SEO
            metaTitle: "Samsung SmartPlaza - Official Samsung Store",
            metaDescription: "Shop the latest Samsung products at Samsung SmartPlaza. Electronics, appliances, and more with expert service.",

            // Visibility Toggles
            showHero: false, // Using banners instead
            showBanners: true,
            showAbout: true,
            showServices: true,
            showProducts: true,
            showGallery: false,
            showTestimonials: true,
            showBusinessHours: true,
            showLocations: true,
            showContact: true,

            // Navigation Links
            navLinks: {
                create: [
                    { label: "Home", href: "#hero", order: 1, isExternal: false },
                    { label: "Products", href: "#products", order: 2, isExternal: false },
                    { label: "Services", href: "#services", order: 3, isExternal: false },
                    { label: "Locations", href: "#locations", order: 4, isExternal: false },
                    { label: "Contact", href: "#contact", order: 5, isExternal: false }
                ]
            },

            // Banner Carousel
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

            // Featured Products
            products: {
                create: [
                    {
                        name: "Galaxy S25 Ultra",
                        description: "The ultimate smartphone with AI-powered features and stunning display",
                        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600",
                        price: "Starting at ₹1,29,999",
                        ctaText: "View Details",
                        ctaLink: "/products/galaxy-s25-ultra",
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

            // Services
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

            // Business Hours
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

            // Locations
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

            // Tags
            tags: {
                create: [
                    { name: "Galaxy S25", link: "/products/galaxy-s25", order: 1 },
                    { name: "Galaxy S25 Ultra", link: "/products/galaxy-s25-ultra", order: 2 },
                    { name: "Galaxy S25+", link: "/products/galaxy-s25-plus", order: 3 },
                    { name: "Buds 3 Pro", link: "/products/buds-3-pro", order: 4 },
                    { name: "Galaxy Watch7", link: "/products/galaxy-watch7", order: 5 },
                    { name: "S24 Ultra", link: "/products/s24-ultra", order: 6 },
                    { name: "Galaxy Buds3", link: "/products/galaxy-buds3", order: 7 },
                    { name: "Galaxy S24 Ultra", link: "/products/galaxy-s24-ultra", order: 8 },
                    { name: "Samsung Double Door Refrigerators", link: "/products/refrigerators", order: 9 },
                    { name: "Samsung Service Centre", link: "/service", order: 10 },
                    { name: "Galaxy Z Fold7", link: "/products/galaxy-z-fold7", order: 11 },
                    { name: "Galaxy Z Flip7", link: "/products/galaxy-z-flip7", order: 12 },
                    { name: "Semi Automatic Washing Machine", link: "/products/washing-machine", order: 13 },
                    { name: "Galaxy Z Fold6", link: "/products/galaxy-z-fold6", order: 14 },
                    { name: "Samsung Galaxy Z Flip", link: "/products/galaxy-z-flip", order: 15 }
                ]
            },

            // Testimonials
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
            }
        }
    });

    console.log('✅ Samsung SmartPlaza site created successfully!');
    console.log(`Visit: http://samsung-plaza.localhost:3000`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
