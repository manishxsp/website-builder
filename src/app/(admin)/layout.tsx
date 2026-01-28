'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => setUser(data.user))
            .catch(() => setUser(null));
    }, []);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    return (
        <AuthGuard requireAuth={true}>
            <div className="min-h-screen bg-gray-100 flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
                    <div className="h-16 flex items-center px-6 border-b border-gray-200">
                        <span className="text-xl font-bold text-blue-600">Builder SaaS</span>
                    </div>
                    <nav className="p-4 space-y-1">
                        <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                            Dashboard
                        </Link>
                        <Link href="/sites" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                            Sites
                        </Link>
                        <Link href="/users" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                            Users
                        </Link>
                        <Link href="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                            Settings
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                        <h1 className="text-lg font-semibold text-gray-800">
                            {user?.role === 'admin' ? 'Admin Panel' : 'My Sites'}
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">
                                {user?.email || 'Loading...'}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </header>
                    <main className="flex-1 p-8 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
