'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateSitePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        subdomain: '',
        description: '',
        template: 'business' // default
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Prepare initial data based on template
            const siteData = {
                name: formData.name,
                subdomain: formData.subdomain,
                description: formData.description,
                // Default styling
                brandColor: '#2563eb',
                fontFamily: 'Inter',
                // Enable sections
                showHero: true,
                showAbout: true,
                showServices: true,
                showContact: true,
                // Template specific content
                ...(formData.template === 'car-dealer' ? {
                    heroTitle: 'Premium Cars for Sale',
                    heroSubtitle: 'Find your dream car at unbeatable prices',
                    heroCTA: 'View Inventory',
                    aboutTitle: 'About Our Dealership',
                    aboutContent: 'We are a trusted car dealership with over 20 years of experience.',
                    servicesTitle: 'Our Services',
                    services: {
                        create: [
                            { title: 'New Car Sales', description: 'Latest models available', icon: '🚗' },
                            { title: 'Used Car Sales', description: 'Certified pre-owned vehicles', icon: '🚙' },
                            { title: 'Car Financing', description: 'Low interest rates', icon: '💰' }
                        ]
                    }
                } : {
                    // Default Business Template
                    heroTitle: 'Welcome to ' + formData.name,
                    heroSubtitle: 'We provide excellent services for our clients',
                    services: {
                        create: [
                            { title: 'Service 1', description: 'Description of service 1', icon: '✨' },
                            { title: 'Service 2', description: 'Description of service 2', icon: '🚀' }
                        ]
                    }
                })
            };

            const res = await fetch('/api/sites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(siteData),
            });

            if (!res.ok) throw new Error('Failed to create site');

            router.push('/dashboard');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Error creating site');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Site</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Site Name
                    </label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Best Cars Inc."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Site Slug (URL Path)
                    </label>
                    <div className="flex items-center">
                        <span className="px-3 py-2 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-gray-500">
                            {typeof window !== 'undefined'
                                ? `${window.location.protocol}//${window.location.host}/`
                                : 'http://localhost:3000/'}
                        </span>
                        <input
                            type="text"
                            required
                            pattern="[a-z0-9-]+"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.subdomain}
                            onChange={(e) => setFormData({ ...formData, subdomain: e.target.value.toLowerCase() })}
                            placeholder="samsung-plaza"
                        />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Only lowercase letters, numbers, and hyphens. Example: samsung-plaza</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Brief description of the business..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Template
                    </label>
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.template}
                        onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                    >
                        <option value="business">Generic Business</option>
                        <option value="car-dealer">Car Dealer</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="portfolio">Portfolio</option>
                    </select>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Site'}
                    </button>
                </div>
            </form>
        </div>
    );
}
