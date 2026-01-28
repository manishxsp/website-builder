'use client';

import BrandCustomizer from '@/components/admin/BrandCustomizer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CustomizePage({ params }: { params: { id: string } }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href={`/sites/${params.id}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Editor
                </Link>
            </div>

            <BrandCustomizer siteId={params.id} />
        </div>
    );
}
