import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function SiteLeadsPage({ params }: { params: { id: string } }) {
    // @ts-ignore - Prisma client might not be regenerated yet
    const leads = await prisma.lead.findMany({
        where: { siteId: params.id },
        orderBy: { createdAt: 'desc' },
    });

    const site = await prisma.site.findUnique({
        where: { id: params.id },
        select: { name: true }
    });

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Leads for {site?.name}</h1>
                    <p className="text-gray-500">Manage customer inquiries</p>
                </div>
                <Link
                    href={`/sites/${params.id}`}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Back to Editor
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="text-left p-4 font-medium text-gray-500">Name</th>
                            <th className="text-left p-4 font-medium text-gray-500">Email</th>
                            <th className="text-left p-4 font-medium text-gray-500">Phone</th>
                            <th className="text-left p-4 font-medium text-gray-500">Message</th>
                            <th className="text-left p-4 font-medium text-gray-500">Date</th>
                            <th className="text-left p-4 font-medium text-gray-500">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">
                                    No leads yet.
                                </td>
                            </tr>
                        ) : (
                            leads.map((lead: any) => (
                                <tr key={lead.id} className="hover:bg-gray-50">
                                    <td className="p-4 font-medium">{lead.name}</td>
                                    <td className="p-4 text-gray-600">{lead.email || '-'}</td>
                                    <td className="p-4 text-gray-600">{lead.phone || '-'}</td>
                                    <td className="p-4 text-gray-600 max-w-xs truncate" title={lead.message || ''}>
                                        {lead.message || '-'}
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                            {lead.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
