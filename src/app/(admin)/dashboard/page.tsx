import { prisma } from '@/lib/prisma';
import Link from 'next/link';

// Force dynamic rendering (no static generation during build)
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const sitesCount = await prisma.site.count();
    const recentSites = await prisma.site.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    });

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
                    <p className="text-3xl font-bold text-gray-900 mt-2">{sitesCount}</p>
                </div>
                {/* Add more stats here if needed */}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Recent Sites</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {recentSites.map((site) => (
                        <div key={site.id} className="px-6 py-4 flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">{site.name}</p>
                                <p className="text-sm text-gray-500">{site.subdomain}.localhost:3000</p>
                            </div>
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                Active
                            </span>
                        </div>
                    ))}
                    {recentSites.length === 0 && (
                        <div className="px-6 py-8 text-center text-gray-500">
                            No sites created yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
