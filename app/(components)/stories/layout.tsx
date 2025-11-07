// app/(components)/stories/layout.tsx
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { navLinks } from '@/constants/navLinks';

export const metadata: Metadata = {
    title: 'Inspiring Youth Stories | YouthSportNG',
    description: 'Real stories of Nigerian youth overcoming challenges through sports and personal growth.',
    openGraph: {
        title: 'Inspiring Youth Stories',
        description: 'Real stories of Nigerian youth overcoming challenges through sports and personal growth.',
        type: 'website',
    },
};

export default function StoriesLayout({
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