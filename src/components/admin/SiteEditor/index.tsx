'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Site {
    id: string;
    name: string;
    subdomain: string;
    brandColor: string;
    heroTitle: string | null;
    heroSubtitle: string | null;
    aboutTitle: string | null;
    aboutContent: string | null;
    // Add other fields as needed
}

export default function SiteEditor({ site }: { site: Site }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(site);
    const [activeTab, setActiveTab] = useState('general');

    const handleChange = (field: keyof Site, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/sites/${site.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to update site');

            router.refresh();
            alert('Site updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Error updating site');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            {/* Sidebar Controls */}
            <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="font-bold text-gray-900">Site Editor</h2>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('general')}
                        className={`flex-1 py-3 text-sm font-medium ${activeTab === 'general' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    >
                        General
                    </button>
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`flex-1 py-3 text-sm font-medium ${activeTab === 'content' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    >
                        Content
                    </button>
                    <button
                        onClick={() => setActiveTab('theme')}
                        className={`flex-1 py-3 text-sm font-medium ${activeTab === 'theme' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    >
                        Theme
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {activeTab === 'general' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subdomain</label>
                                <input
                                    type="text"
                                    value={formData.subdomain}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                                />
                            </div>
                        </>
                    )}

                    {activeTab === 'content' && (
                        <>
                            <div className="space-y-4">
                                <h3 className="font-medium text-gray-900">Hero Section</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={formData.heroTitle || ''}
                                        onChange={(e) => handleChange('heroTitle', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                                    <textarea
                                        value={formData.heroSubtitle || ''}
                                        onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-gray-200">
                                <h3 className="font-medium text-gray-900">About Section</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={formData.aboutTitle || ''}
                                        onChange={(e) => handleChange('aboutTitle', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                    <textarea
                                        value={formData.aboutContent || ''}
                                        onChange={(e) => handleChange('aboutContent', e.target.value)}
                                        rows={5}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'theme' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={formData.brandColor}
                                        onChange={(e) => handleChange('brandColor', e.target.value)}
                                        className="h-10 w-20 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={formData.brandColor}
                                        onChange={(e) => handleChange('brandColor', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="pt-6">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden min-h-[800px] border border-gray-200">
                    <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 text-center text-xs text-gray-500 font-mono">
                            {site.subdomain}.localhost:3000
                        </div>
                    </div>
                    <iframe
                        src={`http://${site.subdomain}.localhost:3000`}
                        className="w-full h-full min-h-[800px]"
                        title="Site Preview"
                    />
                </div>
            </div>
        </div>
    );
}
