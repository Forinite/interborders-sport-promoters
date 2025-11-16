// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "@/sanity/lib/client";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                if (!email || !password) return null;

                // Fetch admin from Sanity
                const query = `
                    *[_type == "adminAccount" && email == $email][0]
                `;
                const admin = await client.fetch(query, { email });

                if (!admin || !admin.hashedPassword) {
                    console.log("Admin not found or no password stored");
                    return null;
                }

                // Compare password with stored hashed password
                const isValid = await bcrypt.compare(password, admin.hashedPassword);
                if (!isValid) {
                    console.log("Invalid password attempt for:", email);
                    return null;
                }

                // Valid admin
                return {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                };
            },
        }),
    ],

    pages: {
        signIn: "/admin/login",
    },

    session: { strategy: "jwt" },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = {
                id: token.id as string,
                name: token.name as string,
                email: token.email as string,
            };
            return session;
        },
    },
};
