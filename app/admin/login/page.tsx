// app/admin/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
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

        if (res?.error) {
            setError('Invalid email or password');
        } else {
            window.location.href = '/admin/dashboard';
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <div className="h-12 w-12 rounded-full bg-green-600 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold">Admin Login</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Use the default credentials to sign in
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@youthsportng.org"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="admin123"
                                required
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{error}</span>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
                        <p className="font-medium text-blue-900">Default Credentials</p>
                        <p className="text-blue-700">
                            Email: <code className="font-mono">admin@youthsportng.org</code>
                        </p>
                        <p className="text-blue-700">
                            Password: <code className="font-mono">admin123</code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}