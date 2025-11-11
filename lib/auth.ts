// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Replace with real Sanity or DB check
                if (credentials?.email === 'admin@youthsportng.org' && credentials?.password === 'admin123') {
                    return { id: '1', name: 'Admin', email: 'admin@youthsportng.org' };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/admin/login',
    },
    session: { strategy: 'jwt' },
};