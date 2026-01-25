import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Navbar from '@/components/sections/Navbar';
import BannerCarousel from '@/components/sections/BannerCarousel';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import BusinessHours from '@/components/sections/BusinessHours';
import Tags from '@/components/sections/Tags';
import Locations from '@/components/sections/Locations';
import Footer from '@/components/sections/Footer';

async function getSiteData(domain: string) {
  console.log('getSiteData called with:', domain);
  const site = await prisma.site.findFirst({
    where: {
      OR: [
        { subdomain: domain },
        { customDomain: domain }
      ]
    },
    include: {
      services: {
        orderBy: { order: 'asc' }
      },
      testimonials: {
        orderBy: { order: 'asc' }
      },
      navLinks: {
        orderBy: { order: 'asc' }
      },
      banners: {
        where: { isActive: true },
        orderBy: { order: 'asc' }
      },
      products: {
        where: { isActive: true },
        orderBy: { order: 'asc' }
      },
      businessHours: {
        orderBy: { order: 'asc' }
      },
      locations: {
        orderBy: { order: 'asc' }
      },
      tags: {
        orderBy: { order: 'asc' }
      }
    }
  });
  console.log('getSiteData result:', site ? 'Found' : 'Not Found');
  return site;
}

export default async function ClientSite({ params }: { params: { domain: string } }) {
  console.log('ClientSite Page:', { domain: params.domain });
  const site = await getSiteData(params.domain) as any;

  if (!site) return notFound();

  return (
    <main
      className="min-h-screen"
      style={{
        fontFamily: site.fontFamily,
        '--brand-color': site.brandColor
      } as any}
    >
      {/* Navbar */}
      {site.navLinks.length > 0 && (
        <Navbar
          siteName={site.name}
          logo={site.logo ?? undefined}
          navLinks={site.navLinks}
          brandColor={site.brandColor}
        />
      )}

      {/* Banner Carousel (replaces Hero if enabled) */}
      {site.showBanners && site.banners.length > 0 && (
        <BannerCarousel
          banners={site.banners}
          brandColor={site.brandColor}
        />
      )}

      {/* Hero Section (only if banners are not shown) */}
      {!site.showBanners && site.showHero && site.heroTitle && (
        <Hero
          id="hero"
          title={site.heroTitle}
          subtitle={site.heroSubtitle || undefined}
          image={site.heroImage || undefined}
          ctaText={site.heroCTA || undefined}
          brandColor={site.brandColor}
        />
      )}

      {/* About Section */}
      {site.showAbout && site.aboutTitle && (
        <About
          id="about"
          title={site.aboutTitle}
          content={site.aboutContent || undefined}
          image={site.aboutImage || undefined}
          brandColor={site.brandColor}
        />
      )}

      {/* Services Section */}
      {site.showServices && site.services.length > 0 && (
        <Services
          id="services"
          title={site.servicesTitle || 'Our Services'}
          services={site.services.map(s => ({
            ...s,
            icon: s.icon || undefined
          }))}
          brandColor={site.brandColor}
        />
      )}

      {/* Featured Products Section */}
      {site.showProducts && site.products.length > 0 && (
        <FeaturedProducts
          id="products"
          title={site.productsTitle || 'Featured Products'}
          products={site.products}
          brandColor={site.brandColor}
        />
      )}

      {/* Business Hours */}
      {site.showBusinessHours && site.businessHours.length > 0 && (
        <BusinessHours
          id="hours"
          hours={site.businessHours}
          brandColor={site.brandColor}
        />
      )}

      {/* Tags */}
      {site.tags.length > 0 && (
        <Tags
          id="tags"
          title="Tags"
          tags={site.tags}
          brandColor={site.brandColor}
        />
      )}

      {/* Locations */}
      {site.showLocations && site.locations.length > 0 && (
        <Locations
          id="locations"
          title="Our Locations"
          locations={site.locations}
          brandColor={site.brandColor}
        />
      )}

      {/* Gallery Section */}
      {site.showGallery && site.galleryImages.length > 0 && (
        <Gallery
          id="gallery"
          title={site.galleryTitle || 'Gallery'}
          images={site.galleryImages}
          brandColor={site.brandColor}
        />
      )}

      {/* Testimonials Section */}
      {site.showTestimonials && site.testimonials.length > 0 && (
        <Testimonials
          id="testimonials"
          title={site.testimonialsTitle || 'Testimonials'}
          testimonials={site.testimonials.map(t => ({
            ...t,
            role: t.role || undefined,
            avatar: t.avatar || undefined
          }))}
          brandColor={site.brandColor}
        />
      )}

      {/* Contact Section */}
      {site.showContact && (
        <Contact
          id="contact"
          title={site.contactTitle || 'Contact Us'}
          email={site.contactEmail || undefined}
          phone={site.contactPhone || undefined}
          address={site.contactAddress || undefined}
          brandColor={site.brandColor}
        />
      )}

      {/* Footer */}
      <Footer
        siteName={site.name}
        brandColor={site.brandColor}
        facebookUrl={site.facebookUrl || undefined}
        instagramUrl={site.instagramUrl || undefined}
        twitterUrl={site.twitterUrl || undefined}
        linkedinUrl={site.linkedinUrl || undefined}
        youtubeUrl={site.youtubeUrl || undefined}
        whatsappUrl={site.whatsappUrl || undefined}
        contactEmail={site.contactEmail || undefined}
        contactPhone={site.contactPhone || undefined}
        contactAddress={site.contactAddress || undefined}
        categories={site.categories}
        paymentMethods={site.paymentMethods}
      />
    </main>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { domain: string } }) {
  const site = await getSiteData(params.domain);

  if (!site) return {};

  return {
    title: site.metaTitle || site.name,
    description: site.metaDescription || site.description,
  };
}