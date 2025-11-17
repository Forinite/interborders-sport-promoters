// app/admin/login/page.tsx

// app/admin/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Home, Lock, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (!res || res.error) {
            setError('Invalid email or password');
            setLoading(false);
            return;
        }

        router.push('/admin/dashboard');
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-5 py-12 relative overflow-hidden">
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A84FF]/5 via-transparent to-[#0052CC]/5" />

            {/*/!* Back to Home Icon *!/*/}
            {/*<Link*/}
            {/*    href="/"*/}
            {/*    className="absolute z-20 top-8 left-8 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group"*/}
            {/*    aria-label="Back to Home"*/}
            {/*>*/}
            {/*    <Home className="h-5 w-5 text-[#0A84FF] group-hover:text-[#0052CC] transition-colors" />*/}
            {/*</Link>*/}

            <div className="w-full max-w-lg">
                {/* Card Container */}
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#CBD5E1]">

                    {/* Header with Gradient Badge */}
                    <div className="relative p-8 pb-12 text-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0A84FF] to-[#0052CC] opacity-5" />

                        <div className="relative z-10">
                            <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-[#0A84FF] to-[#0052CC] rounded-full flex items-center justify-center shadow-xl">
                                <Lock className="h-10 w-10 text-white" />
                            </div>
                            <h1 className="text-3xl font-black text-[#1E293B] tracking-tight">Admin Portal</h1>
                            <p className="mt-2 text-[#475569] text-lg">Secure access to ISP Command Center</p>
                        </div>

                        {/* National Seal */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                            <div className="w-24 h-24 bg-white rounded-full border-4 border-[#CBD5E1] flex items-center justify-center shadow-xl">
                                <span className="text-[#0A84FF] font-black text-2xl tracking-wider">ISP</span>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="px-8 pt-16 pb-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[#1E293B] font-semibold flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-[#0A84FF]" />
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@youthsportng.org"
                                    required
                                    disabled={loading}
                                    className="h-12 text-base border-[#CBD5E1] focus:border-[#0A84FF] focus:ring-[#0A84FF]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-[#1E293B] font-semibold flex items-center gap-2">
                                    <Lock className="h-4 w-4 text-[#0A84FF]" />
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    disabled={loading}
                                    className="h-12 text-base border-[#CBD5E1] focus:border-[#0A84FF] focus:ring-[#0A84FF]"
                                />
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-gradient-to-r from-[#0A84FF] to-[#0052CC] text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-70"
                            >
                                {loading ? (
                                    <>
                                        <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                                        Authenticating...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="mr-2 h-5 w-5" />
                                        Secure Sign In
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Footer Note */}
                        <p className="mt-8 text-center text-sm text-[#64748B]">
                            Protected by ISP Security Protocol •
                            <span className="text-[#0A84FF] font-medium"> 256-bit AES</span>
                        </p>
                    </div>
                </div>

                {/* Bottom Badge */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-[#94A3B8] tracking-wider">
                        © 2025 ISP • Youth Sports Nigeria • Admin Command v19.0
                    </p>
                </div>
            </div>
        </div>
    );
}