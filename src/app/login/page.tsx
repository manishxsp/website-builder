'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, ArrowRight, Layout, Users, Shield } from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';

export default function LoginPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'admin' | 'customer'>('admin');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    role: activeTab, // 'admin' or 'customer'
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Login failed');
                setLoading(false);
                return;
            }

            // Redirect based on role
            if (data.user.role === 'admin') {
                router.push('/dashboard');
            } else {
                router.push('/sites');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <AuthGuard requireAuth={false}>
            <div className="min-h-screen flex bg-white font-sans">
                {/* Left Side - Branding & Features */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-16 text-white">
                    {/* Vibrant Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#d946ef] z-0"></div>

                    {/* Subtle Overlay Pattern */}
                    <div className="absolute inset-0 opacity-20 z-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-16">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                <Layout className="w-6 h-6 text-amethyst-600" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">SiteBuilder</span>
                        </div>

                        <div className="space-y-8 max-w-lg">
                            <h1 className="text-5xl font-bold leading-tight tracking-tight">
                                Create Beautiful Websites Without Code
                            </h1>
                            <p className="text-white/90 text-xl leading-relaxed font-light">
                                Multi-tenant SaaS platform powered by Next.js 14, Prisma, PostgreSQL, and Tailwind CSS. Build, manage, and scale your web presence effortlessly.
                            </p>

                            <div className="space-y-6 pt-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
                                        <div className="w-5 h-5">🚀</div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Lightning Fast</h3>
                                        <p className="text-white/80 text-sm">Built on Next.js 14 for optimal performance</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
                                        <div className="w-5 h-5">👥</div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Multi-Tenant Ready</h3>
                                        <p className="text-white/80 text-sm">Manage multiple clients and projects seamlessly</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
                                        <div className="w-5 h-5">🎨</div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Beautiful Design System</h3>
                                        <p className="text-white/80 text-sm">Powered by Tailwind CSS for stunning interfaces</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 text-sm text-white/60 font-medium">
                        © 2024 SiteBuilder SaaS. All rights reserved.
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-carbon-50">
                    <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-carbon-100">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                            <p className="mt-2 text-gray-600">Please enter your details to sign in</p>
                        </div>

                        {/* Role Tabs */}
                        <div className="flex p-1 bg-carbon-100 rounded-xl">
                            <button
                                onClick={() => setActiveTab('admin')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'admin'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                <Shield className="w-4 h-4" />
                                Admin
                            </button>
                            <button
                                onClick={() => setActiveTab('customer')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'customer'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                <Users className="w-4 h-4" />
                                Customer
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amethyst-500 focus:border-amethyst-500 transition-colors bg-gray-50 focus:bg-white"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amethyst-500 focus:border-amethyst-500 transition-colors bg-gray-50 focus:bg-white"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-amethyst-600 focus:ring-amethyst-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-amethyst-600 hover:text-amethyst-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amethyst-600 hover:bg-amethyst-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amethyst-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Sign in as {activeTab === 'admin' ? 'Admin' : 'Customer'}
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                )}
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        Don't have an account?
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <Link href="/signup" className="font-medium text-amethyst-600 hover:text-amethyst-500">
                                    Create free account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
