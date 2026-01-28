'use client';

import { useState, useEffect } from 'react';

interface BrandCustomizerProps {
    siteId: string;
    onSave?: () => void;
}

export default function BrandCustomizer({ siteId, onSave }: BrandCustomizerProps) {
    const [loading, setLoading] = useState(false);
    const [customization, setCustomization] = useState({
        brandColor: '#3b82f6',
        secondaryColor: '#64748b',
        accentColor: '#f59e0b',
        fontFamily: 'Inter',
        fontHeading: 'Inter',
        buttonStyle: 'rounded-full',
        buttonSize: 'medium',
        sectionSpacing: 'normal',
    });

    // Load current customization
    useEffect(() => {
        async function loadCustomization() {
            try {
                const res = await fetch(`/api/sites/${siteId}/customize`);
                const data = await res.json();
                if (data && !data.error) {
                    setCustomization(prev => ({ ...prev, ...data }));
                }
            } catch (error) {
                console.error('Failed to load customization:', error);
            }
        }
        loadCustomization();
    }, [siteId]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/sites/${siteId}/customize`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customization),
            });

            const data = await res.json();

            if (res.ok) {
                alert('✅ Customization saved successfully!');
                onSave?.();
            } else {
                alert(`❌ Error: ${data.error}`);
            }
        } catch (error) {
            alert('❌ Failed to save customization');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Brand Customization</h2>

            <div className="space-y-6">
                {/* Colors Section */}
                <div className="border-b pb-6">
                    <h3 className="text-xl font-semibold mb-4">Colors</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Primary Brand Color
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={customization.brandColor}
                                    onChange={(e) =>
                                        setCustomization({ ...customization, brandColor: e.target.value })
                                    }
                                    className="h-12 w-20 rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={customization.brandColor}
                                    onChange={(e) =>
                                        setCustomization({ ...customization, brandColor: e.target.value })
                                    }
                                    className="flex-1 px-4 py-2 border rounded-lg"
                                    placeholder="#3b82f6"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Secondary Color
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={customization.secondaryColor || '#64748b'}
                                    onChange={(e) =>
                                        setCustomization({ ...customization, secondaryColor: e.target.value })
                                    }
                                    className="h-12 w-20 rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={customization.secondaryColor || ''}
                                    onChange={(e) =>
                                        setCustomization({ ...customization, secondaryColor: e.target.value })
                                    }
                                    className="flex-1 px-4 py-2 border rounded-lg"
                                    placeholder="#64748b"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Accent Color
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={customization.accentColor || '#f59e0b'}
                                    onChange={(e) =>
                                        setCustomization({ ...customization, accentColor: e.target.value })
                                    }
                                    className="h-12 w-20 rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={customization.accentColor || ''}
                                    onChange={(e) =>
                                        setCustomization({ ...customization, accentColor: e.target.value })
                                    }
                                    className="flex-1 px-4 py-2 border rounded-lg"
                                    placeholder="#f59e0b"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Typography Section */}
                <div className="border-b pb-6">
                    <h3 className="text-xl font-semibold mb-4">Typography</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Body Font
                            </label>
                            <select
                                value={customization.fontFamily}
                                onChange={(e) =>
                                    setCustomization({ ...customization, fontFamily: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="Inter">Inter</option>
                                <option value="Roboto">Roboto</option>
                                <option value="Open Sans">Open Sans</option>
                                <option value="Lato">Lato</option>
                                <option value="Poppins">Poppins</option>
                                <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Heading Font
                            </label>
                            <select
                                value={customization.fontHeading || 'Inter'}
                                onChange={(e) =>
                                    setCustomization({ ...customization, fontHeading: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="Inter">Inter</option>
                                <option value="Playfair Display">Playfair Display</option>
                                <option value="Lora">Lora</option>
                                <option value="Merriweather">Merriweather</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Outfit">Outfit</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Button Style Section */}
                <div className="border-b pb-6">
                    <h3 className="text-xl font-semibold mb-4">Button Style</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Button Shape
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {['rounded-full', 'rounded-lg', 'rounded-none', 'square'].map((style) => (
                                    <button
                                        key={style}
                                        onClick={() =>
                                            setCustomization({ ...customization, buttonStyle: style })
                                        }
                                        className={`px-4 py-2 border-2 transition-all ${customization.buttonStyle === style
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200'
                                            }`}
                                        style={{
                                            borderRadius:
                                                style === 'rounded-full'
                                                    ? '9999px'
                                                    : style === 'rounded-lg'
                                                        ? '0.5rem'
                                                        : '0',
                                        }}
                                    >
                                        {style.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Button Size
                            </label>
                            <select
                                value={customization.buttonSize || 'medium'}
                                onChange={(e) =>
                                    setCustomization({ ...customization, buttonSize: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Layout Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Layout</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Section Spacing
                            </label>
                            <select
                                value={customization.sectionSpacing || 'normal'}
                                onChange={(e) =>
                                    setCustomization({ ...customization, sectionSpacing: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="compact">Compact</option>
                                <option value="normal">Normal</option>
                                <option value="spacious">Spacious</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Section */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                <div className="space-y-4">
                    <div>
                        <h4
                            className="text-2xl font-bold mb-2"
                            style={{
                                fontFamily: customization.fontHeading || 'inherit',
                                color: customization.brandColor,
                            }}
                        >
                            Sample Heading
                        </h4>
                        <p style={{ fontFamily: customization.fontFamily }}>
                            This is how your body text will look on the website.
                        </p>
                    </div>
                    <button
                        className={`px-6 py-3 text-white font-semibold transition-transform hover:scale-105 ${customization.buttonSize === 'small'
                                ? 'text-sm py-2'
                                : customization.buttonSize === 'large'
                                    ? 'text-lg py-4'
                                    : ''
                            }`}
                        style={{
                            backgroundColor: customization.brandColor,
                            borderRadius:
                                customization.buttonStyle === 'rounded-full'
                                    ? '9999px'
                                    : customization.buttonStyle === 'rounded-lg'
                                        ? '0.5rem'
                                        : '0',
                        }}
                    >
                        Sample Button
                    </button>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                >
                    {loading ? 'Saving...' : 'Save Customization'}
                </button>
            </div>
        </div>
    );
}
