import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete existing data
  await prisma.navLink.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.service.deleteMany();
  await prisma.site.deleteMany();

  // Create Sample Site 1: Coffee Shop
  const coffeeSite = await prisma.site.create({
    data: {
      name: "Artisan Coffee Co.",
      description: "Premium coffee roasted fresh daily",
      subdomain: "coffee-shop",
      brandColor: "#7c2d12",
      fontFamily: "Playfair Display",
      
      heroTitle: "Freshly Roasted Coffee",
      heroSubtitle: "Experience the perfect blend of quality and flavor",
      heroImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200",
      heroCTA: "Order Now",
      
      aboutTitle: "Our Story",
      aboutContent: "Founded in 2020, Artisan Coffee Co. has been dedicated to sourcing the finest beans from around the world. Our master roasters craft each batch with precision and passion, ensuring every cup delivers an exceptional experience.",
      aboutImage: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800",
      
      servicesTitle: "What We Offer",
      
      contactEmail: "hello@artisancoffee.com",
      contactPhone: "+1 (555) 123-4567",
      contactAddress: "123 Coffee Street, Bean City, CA 90210",
      
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
      
      showHero: true,
      showAbout: true,
      showServices: true,
      showGallery: false,
      showTestimonials: true,
      showContact: true,
      
      metaTitle: "Artisan Coffee Co. - Premium Coffee Roasted Fresh",
      metaDescription: "Experience premium coffee roasted fresh daily. Order online for delivery.",
      
      navLinks: {
        create: [
          { label: "Home", href: "#hero", order: 1, isExternal: false },
          { label: "About", href: "#about", order: 2, isExternal: false },
          { label: "Services", href: "#services", order: 3, isExternal: false },
          { label: "Testimonials", href: "#testimonials", order: 4, isExternal: false },
          { label: "Contact", href: "#contact", order: 5, isExternal: false }
        ]
      },
      
      services: {
        create: [
          {
            title: "Specialty Roasts",
            description: "Hand-selected beans roasted to perfection",
            icon: "☕",
            order: 1
          },
          {
            title: "Coffee Subscriptions",
            description: "Never run out with our monthly delivery service",
            icon: "📦",
            order: 2
          },
          {
            title: "Brewing Classes",
            description: "Learn from our expert baristas",
            icon: "🎓",
            order: 3
          }
        ]
      },
      
      testimonials: {
        create: [
          {
            name: "Sarah Johnson",
            role: "Coffee Enthusiast",
            content: "The best coffee I've ever tasted! The subscription service is so convenient.",
            rating: 5,
            order: 1
          },
          {
            name: "Mike Chen",
            role: "Regular Customer",
            content: "Amazing quality and the staff really knows their craft. Highly recommend!",
            rating: 5,
            order: 2
          }
        ]
      }
    }
  });

  // Create Sample Site 2: Gym
  const gymSite = await prisma.site.create({
    data: {
      name: "Iron Works Fitness",
      description: "Transform your body and mind",
      subdomain: "iron-gym",
      brandColor: "#dc2626",
      fontFamily: "Inter",
      
      heroTitle: "Transform Your Life",
      heroSubtitle: "State-of-the-art equipment, expert trainers, results guaranteed",
      heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200",
      heroCTA: "Start Free Trial",
      
      aboutTitle: "Why Choose Iron Works",
      aboutContent: "For over 15 years, Iron Works Fitness has been the premier destination for serious athletes and fitness enthusiasts. Our world-class facility features cutting-edge equipment, certified personal trainers, and a supportive community dedicated to your success.",
      
      servicesTitle: "Membership Benefits",
      
      contactEmail: "info@ironworksfitness.com",
      contactPhone: "+1 (555) 987-6543",
      contactAddress: "456 Muscle Ave, Fitness City, NY 10001",
      
      showHero: true,
      showAbout: true,
      showServices: true,
      showTestimonials: true,
      showContact: true,
      
      navLinks: {
        create: [
          { label: "Home", href: "#hero", order: 1, isExternal: false },
          { label: "About", href: "#about", order: 2, isExternal: false },
          { label: "Programs", href: "#services", order: 3, isExternal: false },
          { label: "Reviews", href: "#testimonials", order: 4, isExternal: false },
          { label: "Contact", href: "#contact", order: 5, isExternal: false }
        ]
      },
      
      services: {
        create: [
          {
            title: "Personal Training",
            description: "One-on-one coaching with certified experts",
            icon: "💪",
            order: 1
          },
          {
            title: "Group Classes",
            description: "HIIT, Yoga, Spin, and more",
            icon: "👥",
            order: 2
          },
          {
            title: "Nutrition Coaching",
            description: "Custom meal plans for your goals",
            icon: "🥗",
            order: 3
          }
        ]
      },
      
      testimonials: {
        create: [
          {
            name: "David Martinez",
            role: "Lost 40lbs",
            content: "This gym changed my life. The trainers are incredible and the community is so supportive!",
            rating: 5,
            order: 1
          }
        ]
      }
    }
  });

  // Create Sample Site 3: Photography Portfolio
  const photoSite = await prisma.site.create({
    data: {
      name: "Emma Rose Photography",
      description: "Capturing life's beautiful moments",
      subdomain: "emma-photos",
      brandColor: "#ec4899",
      fontFamily: "Lora",
      
      heroTitle: "Emma Rose Photography",
      heroSubtitle: "Creating timeless memories through the lens",
      heroImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200",
      heroCTA: "View Portfolio",
      
      aboutTitle: "About Me",
      aboutContent: "Hi, I'm Emma! I've been a professional photographer for 8 years, specializing in weddings, portraits, and lifestyle photography. My goal is to capture authentic moments that you'll treasure forever.",
      
      galleryTitle: "Recent Work",
      galleryImages: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600"
      ],
      
      contactEmail: "emma@emmarosephotos.com",
      contactPhone: "+1 (555) 246-8135",
      
      instagramUrl: "https://instagram.com",
      
      showHero: true,
      showAbout: true,
      showServices: false,
      showGallery: true,
      showTestimonials: true,
      showContact: true,
      
      navLinks: {
        create: [
          { label: "Home", href: "#hero", order: 1, isExternal: false },
          { label: "About", href: "#about", order: 2, isExternal: false },
          { label: "Portfolio", href: "#gallery", order: 3, isExternal: false },
          { label: "Reviews", href: "#testimonials", order: 4, isExternal: false },
          { label: "Contact", href: "#contact", order: 5, isExternal: false },
          { label: "Instagram", href: "https://instagram.com", order: 6, isExternal: true }
        ]
      },
      
      testimonials: {
        create: [
          {
            name: "Jessica & Tom",
            role: "Wedding Clients",
            content: "Emma captured our special day perfectly. We couldn't be happier with the photos!",
            rating: 5,
            order: 1
          }
        ]
      }
    }
  });

  // Create Sample Site 4: Car Dealer
  const carDealerSite = await prisma.site.create({
    data: {
      name: "Premium Auto Sales",
      description: "Your trusted partner for quality pre-owned vehicles",
      subdomain: "premium-auto",
      brandColor: "#1e40af",
      fontFamily: "Inter",

      heroTitle: "Find Your Dream Car Today",
      heroSubtitle:
        "Browse our extensive inventory of certified pre-owned vehicles with unbeatable prices and financing options",
      heroImage:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200",
      heroCTA: "Browse Inventory",

      aboutTitle: "Why Choose Premium Auto Sales",
      aboutContent:
        "With over 25 years of experience in the automotive industry, Premium Auto Sales has become the trusted choice for thousands of satisfied customers. Every vehicle is inspected, detailed, and backed by our guarantee.",
      aboutImage:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",

      servicesTitle: "Our Services",

      galleryTitle: "Featured Vehicles",
      galleryImages: [
        "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600",
        "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600",
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600",
        "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600",
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600",
      ],

      contactEmail: "sales@premiumautosales.com",
      contactPhone: "+1 (555) AUTO-123",
      contactAddress: "789 Highway Boulevard, Auto City, TX 75001",

      facebookUrl: "https://facebook.com/premiumautosales",
      instagramUrl: "https://instagram.com/premiumautosales",

      showHero: true,
      showAbout: true,
      showServices: true,
      showGallery: true,
      showTestimonials: true,
      showContact: true,

      metaTitle:
        "Premium Auto Sales - Quality Pre-Owned Vehicles | Best Prices Guaranteed",
      metaDescription:
        "Shop certified pre-owned cars, trucks, and SUVs with flexible financing options.",

      navLinks: {
        create: [
          { label: "Home", href: "#hero", order: 1, isExternal: false },
          { label: "About", href: "#about", order: 2, isExternal: false },
          { label: "Services", href: "#services", order: 3, isExternal: false },
          { label: "Inventory", href: "#gallery", order: 4, isExternal: false },
          { label: "Reviews", href: "#testimonials", order: 5, isExternal: false },
          { label: "Contact", href: "#contact", order: 6, isExternal: false }
        ]
      },

      services: {
        create: [
          {
            title: "Certified Pre-Owned Vehicles",
            description:
              "150-point inspected vehicles with full history reports.",
            icon: "🚗",
            order: 1,
          },
          {
            title: "Flexible Financing",
            description:
              "Competitive rates for all credit types.",
            icon: "💳",
            order: 2,
          },
          {
            title: "Trade-In Program",
            description:
              "Get top value for your current vehicle.",
            icon: "🔄",
            order: 3,
          },
        ],
      },

      testimonials: {
        create: [
          {
            name: "Michael Rodriguez",
            role: "Honda Accord Owner",
            content:
              "Best car buying experience I've ever had. Transparent and professional!",
            rating: 5,
            order: 1,
          },
          {
            name: "Jennifer Thompson",
            role: "Toyota RAV4 Owner",
            content:
              "No pressure, honest service, and great financing options.",
            rating: 5,
            order: 2,
          },
        ],
      },
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('\nSample sites created:');
  console.log(`- ${coffeeSite.name}: http://coffee-shop.localhost:3000`);
  console.log(`- ${gymSite.name}: http://iron-gym.localhost:3000`);
  console.log(`- ${photoSite.name}: http://emma-photos.localhost:3000`);
  console.log(`- ${carDealerSite.name}: http://premium-auto.localhost:3000`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });