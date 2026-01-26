'use client';

import { useState, useEffect } from 'react';

interface Banner {
    id: string;
    title: string | null;
    subtitle: string | null;
    image: string;
    ctaText: string | null;
    ctaLink: string | null;
    order: number;
}

interface BannerCarouselProps {
    banners: Banner[];
    brandColor: string;
}

export default function BannerCarousel({ banners, brandColor }: BannerCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play carousel
    useEffect(() => {
        if (!isAutoPlaying || banners.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying, banners.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
        setIsAutoPlaying(false);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
        setIsAutoPlaying(false);
    };

    if (banners.length === 0) return null;

    return (
        <section className="relative w-full h-[70vh] overflow-hidden">
            {/* Slides */}
            <div className="relative w-full h-full">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-opacity duration-700 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${banner.image})` }}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

                        {/* Content */}
                        <div className="relative z-20 h-full flex items-center">
                            <div className="max-w-7xl mx-auto px-6 w-full">
                                <div className="max-w-2xl">
                                    {banner.title && (
                                        <h1
                                            className="text-5xl md:text-7xl font-black mb-6 text-white animate-slide-up"
                                        >
                                            {banner.title}
                                        </h1>
                                    )}

                                    {banner.subtitle && (
                                        <p className="text-xl md:text-2xl text-gray-100 mb-8 animate-slide-up animation-delay-200">
                                            {banner.subtitle}
                                        </p>
                                    )}

                                    {banner.ctaText && (
                                        <a
                                            href={banner.ctaLink || '#'}
                                            className="inline-block px-8 py-4 rounded-full text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl animate-slide-up animation-delay-400"
                                            style={{ backgroundColor: brandColor }}
                                        >
                                            {banner.ctaText}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all"
                        aria-label="Previous slide"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all"
                        aria-label="Next slide"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {banners.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                ? 'w-8'
                                : 'bg-white/50 hover:bg-white/75'
                                }`}
                            style={index === currentIndex ? { backgroundColor: brandColor } : {}}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
