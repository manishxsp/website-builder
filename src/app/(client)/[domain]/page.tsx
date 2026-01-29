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
import FAQ from '@/components/sections/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import Analytics from '@/components/seo/Analytics';

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
      },
      faqs: {
        where: { isActive: true },
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
        '--brand-color': site.brandColor,
        '--secondary-color': site.secondaryColor || '#64748b',
        '--accent-color': site.accentColor || '#f59e0b',
        '--font-heading': site.fontHeading || site.fontFamily,
      } as any}
    >
      <JsonLd site={site} url={`https://${params.domain}`} />
      <Analytics
        googleAnalyticsId={site.googleAnalyticsId}
        googleTagManagerId={site.googleTagManagerId}
        facebookPixelId={site.facebookPixelId}
      />

      {/* Notification Banner (Top) */}
      {site.notificationEnabled && site.notificationMessage && site.notificationPosition === 'top' && (
        <div className="w-full px-4 py-3 text-center text-white relative z-50" style={{ backgroundColor: site.brandColor }}>
          <p className="font-medium text-sm md:text-base">{site.notificationMessage}</p>
        </div>
      )}

      {/* Navbar */}
      {site.navLinks.length > 0 && (
        <Navbar
          siteName={site.name}
          logo={site.logo ?? undefined}
          navLinks={site.navLinks}
          brandColor={site.brandColor}
        />
      )}

      {[
        {
          key: 'banners',
          order: site.bannersOrder ?? 2,
          component: site.showBanners && site.banners.length > 0 ? (
            <BannerCarousel
              key="banners"
              banners={site.banners}
              brandColor={site.brandColor}
            />
          ) : null
        },
        {
          key: 'hero',
          order: site.heroOrder ?? 1,
          component: !site.showBanners && site.showHero && site.heroTitle ? (
            <Hero
              key="hero"
              id="hero"
              title={site.heroTitle}
              subtitle={site.heroSubtitle || undefined}
              image={site.heroImage || undefined}
              ctaText={site.heroCTA || undefined}
              brandColor={site.brandColor}
            />
          ) : null
        },
        {
          key: 'about',
          order: site.aboutOrder ?? 3,
          component: site.showAbout && site.aboutTitle ? (
            <About
              key="about"
              id="about"
              title={site.aboutTitle}
              content={site.aboutContent || undefined}
              image={site.aboutImage || undefined}
              brandColor={site.brandColor}
            />
          ) : null
        },
        {
          key: 'services',
          order: site.servicesOrder ?? 4,
          component: site.showServices && site.services.length > 0 ? (
            <Services
              key="services"
              id="services"
              title={site.servicesTitle || 'Our Services'}
              services={site.services.map((s: any) => ({
                ...s,
                icon: s.icon || undefined
              }))}
              brandColor={site.brandColor}
            />
          ) : null
        },
        {
          key: 'products',
          order: site.productsOrder ?? 5,
          component: site.showProducts && site.products.length > 0 ? (
            <FeaturedProducts
              key="products"
              id="products"
              title={site.productsTitle || 'Featured Products'}
              products={site.products}
              brandColor={site.brandColor}
            />
          ) : null
        },
        {
          key: 'hours',
          order: site.businessHoursOrder ?? 6,
          component: site.showBusinessHours && site.businessHours.length > 0 ? (
            <BusinessHours
              key="hours"
              id="hours"
              hours={site.businessHours}
              brandColor={site.brandColor}
            />
          ) : null
        },
        {
          key: 'tags',
          order: site.tagsOrder ?? 7,
          component: site.tags.length > 0 ? (
            <Tags
              key="tags"
              id="tags"
              title="Tags"
              tags={site.tags}
              brandColor={site.brandColor}
            />
          ) : null
        },
        {
          key: 'locations',
          order: site.locationsOrder ?? 8,
          component: site.showLocations && site.locations.length > 0 ? (
            <Locations
              key="locations"
              id="locations"
              title="Our Locations"
              locations={site.locations}
              brandColor={site.brandColor}
            />
          ) : null
        },
        {
          key: 'gallery',
          order: site.galleryOrder ?? 9,
          component: site.showGallery && site.galleryImages.length > 0 ? (
            <Gallery
              key="gallery"
              id="gallery"
              title={site.galleryTitle || 'Gallery'}
              images={site.galleryImages}
              brandColor={site.brandColor}
            />
          ) : null
        },
        {
          key: 'testimonials',
          order: site.testimonialsOrder ?? 10,
          component: site.showTestimonials && site.testimonials.length > 0 ? (
            <Testimonials
              key="testimonials"
              id="testimonials"
              title={site.testimonialsTitle || 'Testimonials'}
              testimonials={site.testimonials.map((t: any) => ({
                ...t,
                role: t.role || undefined,
                avatar: t.avatar || undefined
              }))}
              brandColor={site.brandColor}
            />
          ) : null
        },
        {
          key: 'faq',
          order: site.faqOrder ?? 11,
          component: site.showFAQ && site.faqs.length > 0 ? (
            <FAQ
              key="faq"
              id="faq"
              title="Frequently Asked Questions"
              faqs={site.faqs}
              brandColor={site.brandColor}
            />
          ) : null
        },
        {
          key: 'contact',
          order: site.contactOrder ?? 12,
          component: site.showContact ? (
            <Contact
              key="contact"
              id="contact"
              title={site.contactTitle || 'Contact Us'}
              email={site.contactEmail || undefined}
              phone={site.contactPhone || undefined}
              address={site.contactAddress || undefined}
              brandColor={site.brandColor}
              siteId={site.id}
            />
          ) : null
        }
      ].sort((a, b) => a.order - b.order).map(section => section.component)}

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

      {/* Notification Banner (Bottom) */}
      {site.notificationEnabled && site.notificationMessage && site.notificationPosition === 'bottom' && (
        <div className="fixed bottom-0 left-0 right-0 px-4 py-3 text-center text-white z-50 shadow-lg" style={{ backgroundColor: site.brandColor }}>
          <p className="font-medium text-sm md:text-base">{site.notificationMessage}</p>
        </div>
      )}
    </main>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { domain: string } }) {
  const site = await getSiteData(params.domain);

  if (!site) return {};

  // Combine keywords for meta tags
  const keywords = [
    ...(site.primaryKeywords || []),
    ...(site.secondaryKeywords || []),
  ].join(', ');

  return {
    title: site.metaTitle || site.name,
    description: site.metaDescription || site.description,
    keywords: keywords || undefined,
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: site.metaTitle || site.name,
      description: site.metaDescription || site.description,
      images: [site.heroImage || site.logo || ''],
      type: 'website',
      siteName: site.name,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: site.metaTitle || site.name,
      description: site.metaDescription || site.description,
      images: [site.heroImage || site.logo || ''],
    },
    alternates: {
      canonical: `https://${params.domain}`,
    },
    verification: {
      google: site.googleSiteVerification || undefined,
      other: {
        'msvalidate.01': site.bingWebmasterVerification || undefined,
      },
    },
    other: {
      'business-type': site.businessType,
    },
  };
}