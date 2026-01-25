'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BannerFormProps {
    siteId: string;
    banner?: any;
}

export default function BannerForm({ siteId, banner }: BannerFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: banner?.title || '',
        subtitle: banner?.subtitle || '',
        image: banner?.image || '',
        ctaText: banner?.ctaText || '',
        ctaLink: banner?.ctaLink || '',
        order: banner?.order || 1,
        isActive: banner?.isActive ?? true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const url = banner
                ? `/api/sites/${siteId}/banners/${banner.id}`
                : `/api/sites/${siteId}/banners`;

            const method = banner ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert(banner ? 'Banner updated!' : 'Banner created!');
                router.push(`/sites/${siteId}`);
                router.refresh();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Failed to save banner'}`);
            }
        } catch (error) {
            console.error('Error saving banner:', error);
            alert('Error saving banner');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-2xl font-bold mb-6">
                        {banner ? 'Edit Banner' : 'Add New Banner'}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., New Product Launch"
                            />
                        </div>

                        {/* Subtitle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., Get 20% off on pre-orders"
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image URL *
                            </label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://example.com/banner.jpg"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Use Unsplash or upload to a CDN
                            </p>
                        </div>

                        {/* CTA Text */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Button Text
                            </label>
                            <input
                                type="text"
                                name="ctaText"
                                value={formData.ctaText}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., Shop Now"
                            />
                        </div>

                        {/* CTA Link */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Button Link
                            </label>
                            <input
                                type="text"
                                name="ctaLink"
                                value={formData.ctaLink}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., #products or /contact"
                            />
                        </div>

                        {/* Order */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Display Order
                            </label>
                            <input
                                type="number"
                                name="order"
                                value={formData.order}
                                onChange={handleChange}
                                min="1"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Lower numbers appear first
                            </p>
                        </div>

                        {/* Active */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="ml-2 text-sm font-medium text-gray-700">
                                Active (show on site)
                            </label>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                            >
                                {saving ? 'Saving...' : banner ? 'Update Banner' : 'Create Banner'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
