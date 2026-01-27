/**
 * Get the base domain for site URLs based on environment
 * - Development: localhost:3000
 * - Production: your-domain.vercel.app
 */
export function getBaseDomain(): string {
    if (typeof window !== 'undefined') {
        // Client-side: use current hostname
        return window.location.host;
    }

    // Server-side
    if (process.env.NODE_ENV === 'production') {
        return process.env.NEXT_PUBLIC_ROOT_DOMAIN || process.env.VERCEL_URL || 'website-builder-ktg4.vercel.app';
    }

    return 'localhost:3000';
}

/**
 * Generate a full site URL for a subdomain
 */
export function getSiteUrl(subdomain: string | null, customDomain?: string | null): string {
    if (customDomain) {
        return `https://${customDomain}`;
    }

    if (!subdomain) {
        return '#';
    }

    const baseDomain = getBaseDomain();
    const protocol = baseDomain.includes('localhost') ? 'http' : 'https';

    // If it's a Vercel deployment, use subdomain format
    if (baseDomain.includes('.vercel.app')) {
        // For Vercel, we can't use actual subdomains, so we use the rewrite pattern
        // But for display/links, we should show the proper format
        return `${protocol}://${subdomain}.${baseDomain}`;
    }

    return `${protocol}://${subdomain}.${baseDomain}`;
}

/**
 * Get the domain suffix for display (e.g., ".localhost:3000" or ".yourdomain.com")
 */
export function getDomainSuffix(): string {
    const baseDomain = getBaseDomain();
    return `.${baseDomain}`;
}
