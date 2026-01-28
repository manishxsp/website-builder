'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Force dynamic rendering (no static generation during build)
export const dynamic = 'force-dynamic';

interface Site {
    id: string;
    name: string;
    subdomain: string | null;
    customDomain: string | null;
    createdAt: string;
}

export default function DashboardPage() {
    const [sitesCount, setSitesCount] = useState(0);
    const [recentSites, setRecentSites] = useState<Site[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/sites')
            .then(res => res.json())
            .then(data => {
                setSitesCount(data.length);
                setRecentSites(data.slice(0, 5));
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load sites:', err);
                setLoading(false);
            });
    }, []);

    const currentHost = typeof window !== 'undefined' ? window.location.host : 'localhost:3000';

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                <Link href="/sites/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Create New Site
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Total Sites</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '...' : sitesCount}</p>
                </div>
                {/* Add more stats here if needed */}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Recent Sites</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {loading ? (
                        <div className="px-6 py-8 text-center text-gray-500">
                            Loading...
                        </div>
                    ) : recentSites.length > 0 ? (
                        recentSites.map((site) => (
                            <div key={site.id} className="px-6 py-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">{site.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {site.customDomain || `/${site.subdomain}`}
                                    </p>
                                </div>
                                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                    Active
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-8 text-center text-gray-500">
                            No sites created yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
