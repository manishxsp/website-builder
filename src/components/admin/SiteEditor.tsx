'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SiteEditorProps {
    site: any;
}

export default function SiteEditor({ site }: SiteEditorProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('basic');
    const [saving, setSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [host, setHost] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHost(window.location.host);
        }
    }, []);

    const [formData, setFormData] = useState({
        name: site.name,
        description: site.description,
        brandColor: site.brandColor,
        fontFamily: site.fontFamily,

        // Hero
        heroTitle: site.heroTitle,
        heroSubtitle: site.heroSubtitle,
        heroCTA: site.heroCTA,
        heroCTALink: site.heroCTALink,
        heroImage: site.heroImage,

        // About
        aboutTitle: site.aboutTitle,
        aboutContent: site.aboutContent,
        aboutImage: site.aboutImage,

        // Contact
        contactEmail: site.contactEmail,
        contactPhone: site.contactPhone,
        contactAddress: site.contactAddress,

        // Social
        facebookUrl: site.facebookUrl,
        instagramUrl: site.instagramUrl,
        twitterUrl: site.twitterUrl,
        linkedinUrl: site.linkedinUrl,
        youtubeUrl: site.youtubeUrl,
        whatsappUrl: site.whatsappUrl,

        // Lists (Arrays)
        services: site.services || [],
        products: site.products || [],
        businessHours: site.businessHours || [],
        tags: site.tags || [],
        banners: site.banners || [],
        locations: site.locations || [],
        faqs: site.faqs || [],

        // Notification
        notificationEnabled: site.notificationEnabled || false,
        notificationMessage: site.notificationMessage || '',
        notificationPosition: site.notificationPosition || 'top',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [showAIModal, setShowAIModal] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiFormData, setAiFormData] = useState({
        businessName: '',
        location: '',
        existingDescription: '',
        services: '',
        reviews: '',
        additionalInfo: ''
    });

    const openAIModal = () => {
        setAiFormData({
            businessName: formData.name,
            location: formData.contactAddress || '',
            existingDescription: formData.description || formData.aboutContent || '',
            services: formData.services.map((s: any) => s.title).join(', '),
            reviews: '',
            additionalInfo: ''
        });
        setShowAIModal(true);
    };

    const handleAIGenerate = async () => {
        setAiLoading(true);
        try {
            const response = await fetch('/api/ai/generate-about', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(aiFormData),
            });
            const data = await response.json();
            if (data.content) {
                const match = data.content.match(/\*\*About Us Description:\*\*\s*([\s\S]*?)(?=\*\*Character Count:|$)/);
                if (match && match[1]) {
                    const description = match[1].trim();
                    setFormData(prev => ({ ...prev, aboutContent: description }));
                    setShowAIModal(false);
                } else {
                    setFormData(prev => ({ ...prev, aboutContent: data.content }));
                    setShowAIModal(false);
                }
            } else if (data.error) {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error generating AI content:', error);
            alert('Failed to generate content. Please check your internet connection or try again later.');
        } finally {
            setAiLoading(false);
        }
    };

    // Helper to update list items
    const updateList = (listName: string, index: number, field: string, value: any) => {
        setFormData(prev => {
            const list = [...(prev as any)[listName]];
            list[index] = { ...list[index], [field]: value };
            return { ...prev, [listName]: list };
        });
    };

    // Helper to add item to list
    const addListItem = (listName: string, template: any) => {
        setFormData(prev => ({
            ...prev,
            [listName]: [...(prev as any)[listName], template]
        }));
    };

    // Helper to remove item from list
    const removeListItem = (listName: string, index: number) => {
        setFormData(prev => {
            const list = [...(prev as any)[listName]];
            list.splice(index, 1);
            return { ...prev, [listName]: list };
        });
    };

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: '📝' },
        { id: 'notification', label: 'Notification', icon: '🔔' },
        { id: 'faqs', label: 'FAQs', icon: '❓' },
        // Tabs are now just for scrolling or could be removed if we want a single page feel
        // For now, let's keep them but maybe we can simplify
    ];

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch(`/api/sites/${site.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                router.refresh();
            } else {
                alert('Failed to update site');
            }
        } catch (error) {
            alert('Error updating site');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Edit Site: {formData.name}</h1>
                            <p className="text-sm text-gray-600 mt-1">
                                {site.subdomain}.localhost:3000
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <a
                                href={`/sites/${site.id}/leads`}
                                className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg font-medium transition-colors"
                            >
                                View Leads
                            </a>
                            <a
                                href={`${typeof window !== 'undefined' ? window.location.origin : ''}/${site.subdomain}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                            >
                                Preview Site
                            </a>
                            <a
                                href="/sites"
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                            >
                                Back to Sites
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-1 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-3 font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {activeTab === 'basic' && (
                        <form onSubmit={handleSave} className="space-y-8">
                            {/* Site Identity */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-bold mb-4 text-gray-900">Site Identity</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subdomain</label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                value={site.subdomain}
                                                readOnly
                                                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-100 text-gray-500"
                                            />
                                            <span className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 text-gray-500">
                                                .localhost:3000
                                            </span>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description || ''}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Branding */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-bold mb-4 text-gray-900">Branding</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Color</label>
                                        <div className="flex gap-3">
                                            <input
                                                type="color"
                                                name="brandColor"
                                                value={formData.brandColor}
                                                onChange={handleChange}
                                                className="h-10 w-20 rounded cursor-pointer"
                                            />
                                            <input
                                                type="text"
                                                name="brandColor"
                                                value={formData.brandColor}
                                                onChange={handleChange}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                                        <select
                                            name="fontFamily"
                                            value={formData.fontFamily}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        >
                                            <option value="Inter">Inter</option>
                                            <option value="Roboto">Roboto</option>
                                            <option value="Open Sans">Open Sans</option>
                                            <option value="Lato">Lato</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Section */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-bold mb-4 text-gray-900">Hero Section</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                                        <input
                                            type="text"
                                            name="heroTitle"
                                            value={formData.heroTitle || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                                        <textarea
                                            name="heroSubtitle"
                                            value={formData.heroSubtitle || ''}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
                                            <input
                                                type="text"
                                                name="heroCTA"
                                                value={formData.heroCTA || ''}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">CTA Link</label>
                                            <input
                                                type="text"
                                                name="heroCTALink"
                                                value={formData.heroCTALink || ''}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image URL</label>
                                        <input
                                            type="url"
                                            name="heroImage"
                                            value={formData.heroImage || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* About Section */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">About Us</h3>
                                    <button
                                        type="button"
                                        onClick={openAIModal}
                                        className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded hover:bg-purple-200 flex items-center gap-1"
                                    >
                                        <span>✨</span> Generate with AI
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            name="aboutTitle"
                                            value={formData.aboutTitle || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                        <textarea
                                            name="aboutContent"
                                            value={formData.aboutContent || ''}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                        <input
                                            type="url"
                                            name="aboutImage"
                                            value={formData.aboutImage || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Services */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Our Services</h3>
                                    <button
                                        type="button"
                                        onClick={() => addListItem('services', { title: '', description: '', icon: '🔧', order: formData.services.length + 1 })}
                                        className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                                    >
                                        + Add Service
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {formData.services.map((service: any, index: number) => (
                                        <div key={index} className="bg-white p-4 rounded border border-gray-200 relative">
                                            <button
                                                type="button"
                                                onClick={() => removeListItem('services', index)}
                                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                            >
                                                ✕
                                            </button>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                                                    <input
                                                        type="text"
                                                        value={service.title}
                                                        onChange={(e) => updateList('services', index, 'title', e.target.value)}
                                                        className="w-full px-3 py-1 border border-gray-300 rounded"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Icon (Emoji)</label>
                                                    <input
                                                        type="text"
                                                        value={service.icon || ''}
                                                        onChange={(e) => updateList('services', index, 'icon', e.target.value)}
                                                        className="w-full px-3 py-1 border border-gray-300 rounded"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                                                    <textarea
                                                        value={service.description || ''}
                                                        onChange={(e) => updateList('services', index, 'description', e.target.value)}
                                                        rows={2}
                                                        className="w-full px-3 py-1 border border-gray-300 rounded"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {formData.services.length === 0 && (
                                        <p className="text-gray-500 text-sm italic text-center py-4">No services added yet.</p>
                                    )}
                                </div>
                            </div>

                            {/* Featured Products */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Featured Products</h3>
                                    <button
                                        type="button"
                                        onClick={() => addListItem('products', { name: '', description: '', price: '', image: '', ctaText: 'View Details', ctaLink: '#', order: formData.products.length + 1, isActive: true })}
                                        className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                                    >
                                        + Add Product
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {formData.products.map((product: any, index: number) => (
                                        <div key={index} className="bg-white p-4 rounded border border-gray-200 relative">
                                            <button
                                                type="button"
                                                onClick={() => removeListItem('products', index)}
                                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                            >
                                                ✕
                                            </button>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                                                    <input
                                                        type="text"
                                                        value={product.name}
                                                        onChange={(e) => updateList('products', index, 'name', e.target.value)}
                                                        className="w-full px-3 py-1 border border-gray-300 rounded"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Price</label>
                                                    <input
                                                        type="text"
                                                        value={product.price || ''}
                                                        onChange={(e) => updateList('products', index, 'price', e.target.value)}
                                                        className="w-full px-3 py-1 border border-gray-300 rounded"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                                                    <textarea
                                                        value={product.description || ''}
                                                        onChange={(e) => updateList('products', index, 'description', e.target.value)}
                                                        rows={2}
                                                        className="w-full px-3 py-1 border border-gray-300 rounded"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Image URL</label>
                                                    <input
                                                        type="url"
                                                        value={product.image || ''}
                                                        onChange={(e) => updateList('products', index, 'image', e.target.value)}
                                                        className="w-full px-3 py-1 border border-gray-300 rounded"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 mb-1">CTA Text</label>
                                                        <input
                                                            type="text"
                                                            value={product.ctaText || ''}
                                                            onChange={(e) => updateList('products', index, 'ctaText', e.target.value)}
                                                            className="w-full px-3 py-1 border border-gray-300 rounded"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 mb-1">CTA Link</label>
                                                        <input
                                                            type="text"
                                                            value={product.ctaLink || ''}
                                                            onChange={(e) => updateList('products', index, 'ctaLink', e.target.value)}
                                                            className="w-full px-3 py-1 border border-gray-300 rounded"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {formData.products.length === 0 && (
                                        <p className="text-gray-500 text-sm italic text-center py-4">No products added yet.</p>
                                    )}
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Business Hours</h3>
                                    <button
                                        type="button"
                                        onClick={() => addListItem('businessHours', { day: 'Monday', openTime: '09:00', closeTime: '17:00', isClosed: false, order: formData.businessHours.length + 1 })}
                                        className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                                    >
                                        + Add Day
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {formData.businessHours.map((hour: any, index: number) => (
                                        <div key={index} className="flex items-center gap-2 bg-white p-2 rounded border border-gray-200">
                                            <input
                                                type="text"
                                                value={hour.day}
                                                onChange={(e) => updateList('businessHours', index, 'day', e.target.value)}
                                                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                                                placeholder="Day"
                                            />
                                            <input
                                                type="time"
                                                value={hour.openTime}
                                                onChange={(e) => updateList('businessHours', index, 'openTime', e.target.value)}
                                                className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                disabled={hour.isClosed}
                                            />
                                            <span className="text-gray-500">-</span>
                                            <input
                                                type="time"
                                                value={hour.closeTime}
                                                onChange={(e) => updateList('businessHours', index, 'closeTime', e.target.value)}
                                                className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                disabled={hour.isClosed}
                                            />
                                            <label className="flex items-center gap-1 text-sm text-gray-600 ml-2">
                                                <input
                                                    type="checkbox"
                                                    checked={hour.isClosed}
                                                    onChange={(e) => updateList('businessHours', index, 'isClosed', e.target.checked)}
                                                    className="rounded border-gray-300"
                                                />
                                                Closed
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => removeListItem('businessHours', index)}
                                                className="ml-auto text-red-500 hover:text-red-700 px-2"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Tags</h3>
                                    <button
                                        type="button"
                                        onClick={() => addListItem('tags', { name: '', link: '', order: formData.tags.length + 1 })}
                                        className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                                    >
                                        + Add Tag
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag: any, index: number) => (
                                        <div key={index} className="flex items-center gap-2 bg-white px-3 py-2 rounded-full border border-gray-200 shadow-sm">
                                            <input
                                                type="text"
                                                value={tag.name}
                                                onChange={(e) => updateList('tags', index, 'name', e.target.value)}
                                                className="w-24 bg-transparent border-none focus:ring-0 p-0 text-sm font-medium"
                                                placeholder="Tag Name"
                                            />
                                            <input
                                                type="text"
                                                value={tag.link || ''}
                                                onChange={(e) => updateList('tags', index, 'link', e.target.value)}
                                                className="w-24 bg-gray-50 border-none rounded px-2 py-0.5 text-xs text-gray-500"
                                                placeholder="Link (opt)"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeListItem('tags', index)}
                                                className="text-gray-400 hover:text-red-500 text-xs"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-bold mb-4 text-gray-900">Contact Information</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            value={formData.contactEmail || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input
                                            type="text"
                                            name="contactPhone"
                                            value={formData.contactPhone || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                        <input
                                            type="text"
                                            name="contactAddress"
                                            value={formData.contactAddress || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-bold mb-4 text-gray-900">Social Media</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                                        <input type="url" name="facebookUrl" value={formData.facebookUrl || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                                        <input type="url" name="instagramUrl" value={formData.instagramUrl || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
                                        <input type="url" name="twitterUrl" value={formData.twitterUrl || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                                        <input type="url" name="linkedinUrl" value={formData.linkedinUrl || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
                                        <input type="url" name="youtubeUrl" value={formData.youtubeUrl || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp URL</label>
                                        <input type="url" name="whatsappUrl" value={formData.whatsappUrl || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {saving ? 'Saving Changes...' : 'Save All Changes'}
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'banners' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold">Banner Carousel</h2>
                                    <p className="text-gray-600 mt-1">
                                        Add rotating banners to your homepage
                                    </p>
                                </div>
                                <a
                                    href={`/sites/${site.id}/banners/new`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    + Add Banner
                                </a>
                            </div>
                            <div className="text-gray-500">
                                Banners will be listed here. Click "Add Banner" to create your first banner.
                            </div>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold">Featured Products</h2>
                                    <p className="text-gray-600 mt-1">
                                        Showcase your products with images, prices, and features
                                    </p>
                                </div>
                                <a
                                    href={`/sites/${site.id}/products/new`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    + Add Product
                                </a>
                            </div>
                            <div className="text-gray-500">
                                Products will be listed here. Click "Add Product" to create your first product.
                            </div>
                        </div>
                    )}

                    {activeTab === 'hours' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold">Business Hours</h2>
                                    <p className="text-gray-600 mt-1">
                                        Set your operating hours for each day of the week
                                    </p>
                                </div>
                                <a
                                    href={`/sites/${site.id}/hours/edit`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Edit Hours
                                </a>
                            </div>
                            <div className="text-gray-500">
                                Configure your business hours here.
                            </div>
                        </div>
                    )}

                    {activeTab === 'locations' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold">Locations</h2>
                                    <p className="text-gray-600 mt-1">
                                        Add multiple store or office locations
                                    </p>
                                </div>
                                <a
                                    href={`/sites/${site.id}/locations/new`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    + Add Location
                                </a>
                            </div>
                            <div className="text-gray-500">
                                Locations will be listed here. Click "Add Location" to create your first location.
                            </div>
                        </div>
                    )}

                    {activeTab === 'tags' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold">Tags</h2>
                                    <p className="text-gray-600 mt-1">
                                        Add tags for products, services, or categories
                                    </p>
                                </div>
                                <a
                                    href={`/sites/${site.id}/tags/new`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    + Add Tag
                                </a>
                            </div>
                            <div className="text-gray-500">
                                Tags will be listed here. Click "Add Tag" to create your first tag.
                            </div>
                        </div>
                    )}

                    {activeTab === 'faqs' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
                                    <p className="text-gray-600 mt-1">
                                        Manage Q&A for your site
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => addListItem('faqs', { question: '', answer: '', order: formData.faqs.length + 1, isActive: true })}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    + Add FAQ
                                </button>
                            </div>
                            <div className="space-y-4">
                                {formData.faqs.map((faq: any, index: number) => (
                                    <div key={index} className="bg-white p-4 rounded border border-gray-200 relative">
                                        <button
                                            type="button"
                                            onClick={() => removeListItem('faqs', index)}
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        >
                                            ✕
                                        </button>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Question</label>
                                                <input
                                                    type="text"
                                                    value={faq.question}
                                                    onChange={(e) => updateList('faqs', index, 'question', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                                    placeholder="e.g. What are your opening hours?"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Answer</label>
                                                <textarea
                                                    value={faq.answer}
                                                    onChange={(e) => updateList('faqs', index, 'answer', e.target.value)}
                                                    rows={3}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                                    placeholder="e.g. We are open 9am to 5pm daily."
                                                />
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <label className="flex items-center gap-2 text-sm text-gray-600">
                                                    <input
                                                        type="checkbox"
                                                        checked={faq.isActive}
                                                        onChange={(e) => updateList('faqs', index, 'isActive', e.target.checked)}
                                                        className="rounded border-gray-300"
                                                    />
                                                    Active
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <label className="text-xs font-medium text-gray-500">Order:</label>
                                                    <input
                                                        type="number"
                                                        value={faq.order}
                                                        onChange={(e) => updateList('faqs', index, 'order', parseInt(e.target.value))}
                                                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {formData.faqs.length === 0 && (
                                    <p className="text-gray-500 text-sm italic text-center py-4">No FAQs added yet.</p>
                                )}
                            </div>

                            <div className="flex justify-end pt-6 border-t mt-6">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {saving ? 'Saving Changes...' : 'Save All Changes'}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notification' && (
                        <form onSubmit={handleSave} className="space-y-8">
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-bold mb-4 text-gray-900">Notification Banner</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            name="notificationEnabled"
                                            id="notificationEnabled"
                                            checked={formData.notificationEnabled}
                                            onChange={(e) => setFormData(prev => ({ ...prev, notificationEnabled: e.target.checked }))}
                                            className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                        />
                                        <label htmlFor="notificationEnabled" className="font-medium text-gray-700">
                                            Enable Notification Banner
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                        <textarea
                                            name="notificationMessage"
                                            value={formData.notificationMessage}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g. Special offer! Get 20% off this weekend only."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="notificationPosition"
                                                    value="top"
                                                    checked={formData.notificationPosition === 'top'}
                                                    onChange={handleChange}
                                                    className="text-blue-600 focus:ring-blue-500"
                                                />
                                                Top of Page
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="notificationPosition"
                                                    value="bottom"
                                                    checked={formData.notificationPosition === 'bottom'}
                                                    onChange={handleChange}
                                                    className="text-blue-600 focus:ring-blue-500"
                                                />
                                                Bottom of Page
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {saving ? 'Saving Changes...' : 'Save All Changes'}
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'settings' && (
                        <div>
                            <h2 className="text-xl font-bold mb-6">Visibility Settings</h2>
                            <p className="text-gray-600 mb-6">
                                Toggle which sections appear on your site
                            </p>
                            <a
                                href={`/sites/${site.id}/settings`}
                                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Manage Settings
                            </a>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-bold text-blue-900 mb-3">💡 Quick Start Guide</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                        <li>• <strong>Banners:</strong> Create eye-catching carousel slides for your homepage</li>
                        <li>• <strong>Products:</strong> Showcase your offerings with images, prices, and features</li>
                        <li>• <strong>Business Hours:</strong> Let customers know when you're open</li>
                        <li>• <strong>Locations:</strong> Add multiple store addresses with map links</li>
                        <li>• <strong>Tags:</strong> Organize your content with clickable tags</li>
                    </ul>
                </div>
            </div>

            {/* AI Generation Modal */}
            {showAIModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Generate About Us with AI</h3>
                            <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                                <input
                                    type="text"
                                    value={aiFormData.businessName}
                                    onChange={e => setAiFormData(prev => ({ ...prev, businessName: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    value={aiFormData.location}
                                    onChange={e => setAiFormData(prev => ({ ...prev, location: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="e.g. Mumbai, Bandra"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Services / Categories</label>
                                <input
                                    type="text"
                                    value={aiFormData.services}
                                    onChange={e => setAiFormData(prev => ({ ...prev, services: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="e.g. Restaurant, Italian, Pizza"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Existing Description (Optional)</label>
                                <textarea
                                    value={aiFormData.existingDescription}
                                    onChange={e => setAiFormData(prev => ({ ...prev, existingDescription: e.target.value }))}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Recent Reviews / Feedback (Optional)</label>
                                <textarea
                                    value={aiFormData.reviews}
                                    onChange={e => setAiFormData(prev => ({ ...prev, reviews: e.target.value }))}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Paste snippets from recent positive reviews..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Info (Optional)</label>
                                <textarea
                                    value={aiFormData.additionalInfo}
                                    onChange={e => setAiFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Any specific tone, target audience, or details to include..."
                                />
                            </div>
                        </div>
                        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={() => setShowAIModal(false)}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAIGenerate}
                                disabled={aiLoading}
                                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                            >
                                {aiLoading ? (
                                    <>
                                        <span className="animate-spin">↻</span> Generating...
                                    </>
                                ) : (
                                    <>
                                        <span>✨</span> Generate Content
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Success Notification */}
            {showSuccess && (
                <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in-up">
                    <span className="text-xl">✓</span>
                    <span className="font-medium">Site updated successfully!</span>
                </div>
            )}
        </div>
    );
}
