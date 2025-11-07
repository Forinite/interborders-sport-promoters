// app/(components)/sports/layout.tsx
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { navLinks } from '@/constants/navLinks';

export const metadata: Metadata = {
    title: 'Sports Events & News | YouthSportNG',
    description: 'Discover upcoming sports tournaments, training camps, and latest youth sports news in Nigeria.',
    openGraph: {
        title: 'Sports Events & News',
        description: 'Discover upcoming sports tournaments, training camps, and latest youth sports news in Nigeria.',
        type: 'website',
    },
};

export default function SportsLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header navLinks={navLinks} />
            <main>{children}</main>
            <Footer />
        </>
    );
}