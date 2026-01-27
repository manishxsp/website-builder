'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/domain';

// Force dynamic rendering (no static generation during build)
export const dynamic = 'force-dynamic';

interface Site {
    id: string;
    name: string;
    description: string | null;
    subdomain: string | null;
    customDomain: string | null;
    createdAt: string;
}

export default function SitesPage() {
    const [sites, setSites] = useState<Site[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/sites')
            .then(res => res.json())
            .then(data => {
                setSites(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load sites:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">All Sites</h2>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                    Loading sites...
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">All Sites</h2>
                <Link href="/sites/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Create New Site
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sites.map((site) => {
                            const siteUrl = getSiteUrl(site.subdomain, site.customDomain);
                            const displayDomain = site.customDomain || `${site.subdomain}.${typeof window !== 'undefined' ? window.location.host : 'localhost:3000'}`;

                            return (
                                <tr key={site.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{site.name}</div>
                                        <div className="text-sm text-gray-500">{site.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a
                                            href={siteUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            {displayDomain}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(site.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/sites/${site.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {sites.length === 0 && (
                    <div className="px-6 py-8 text-center text-gray-500">
                        No sites found.
                    </div>
                )}
            </div>
        </div>
    );
}
