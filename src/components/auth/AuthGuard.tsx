'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
    id: string;
    email: string;
    name: string | null;
    role: string;
}

interface AuthGuardProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireRole?: 'admin' | 'customer';
}

export default function AuthGuard({ children, requireAuth = false, requireRole }: AuthGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch('/api/auth/me');

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);

                    // If user is logged in and on login/signup page, redirect to dashboard
                    if ((pathname === '/login' || pathname === '/signup') && data.user) {
                        if (data.user.role === 'admin') {
                            router.push('/dashboard');
                        } else {
                            router.push('/sites');
                        }
                        return;
                    }

                    // Check role requirement
                    if (requireRole && data.user.role !== requireRole) {
                        if (data.user.role === 'admin') {
                            router.push('/dashboard');
                        } else {
                            router.push('/sites');
                        }
                        return;
                    }
                } else {
                    // Not authenticated
                    setUser(null);

                    // If auth is required and user is not logged in, redirect to login
                    if (requireAuth) {
                        router.push('/login');
                        return;
                    }
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setUser(null);

                if (requireAuth) {
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, [pathname, requireAuth, requireRole, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
