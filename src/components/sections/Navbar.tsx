'use client';

import { useState, useEffect } from 'react';

interface NavLink {
    id: string;
    label: string;
    href: string;
    isExternal: boolean;
}

interface NavbarProps {
    siteName: string;
    logo?: string;
    navLinks: NavLink[];
    brandColor: string;
}

export default function Navbar({ siteName, logo, navLinks, brandColor }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Detect scroll for navbar shadow enhancement
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav
            className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo / Site Name */}
                    <a
                        href="#hero"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        {logo ? (
                            <img
                                src={logo}
                                alt={siteName}
                                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <span
                                className="text-2xl font-bold transition-all duration-300 group-hover:scale-105"
                                style={{ color: brandColor }}
                            >
                                {siteName}
                            </span>
                        )}
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            link.isExternal ? (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-700 hover:opacity-70 transition-all duration-300 font-medium relative group animate-fade-in"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        opacity: 0,
                                        animation: 'fadeIn 0.5s ease-out forwards'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = brandColor}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                                >
                                    {link.label}
                                    <span
                                        className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                                        style={{ backgroundColor: brandColor }}
                                    />
                                </a>
                            ) : (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    className="text-gray-700 hover:opacity-70 transition-all duration-300 font-medium relative group animate-fade-in"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        opacity: 0,
                                        animation: 'fadeIn 0.5s ease-out forwards'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = brandColor}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const target = document.querySelector(link.href);
                                        target?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    {link.label}
                                    <span
                                        className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                                        style={{ backgroundColor: brandColor }}
                                    />
                                </a>
                            )
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6 transition-transform duration-300"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            style={{
                                color: brandColor,
                                transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                            }}
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                >
                    <div className="pb-4 border-t border-gray-200 pt-4">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                link.isExternal ? (
                                    <a
                                        key={link.id}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-700 hover:opacity-70 transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
                                        style={{ color: brandColor }}
                                        onClick={toggleMenu}
                                    >
                                        {link.label}
                                    </a>
                                ) : (
                                    <a
                                        key={link.id}
                                        href={link.href}
                                        className="text-gray-700 hover:opacity-70 transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
                                        style={{ color: brandColor }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const target = document.querySelector(link.href);
                                            target?.scrollIntoView({ behavior: 'smooth' });
                                            toggleMenu();
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}