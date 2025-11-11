// app/(components)/about/layout.tsx
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'About YouthSportNG | Our Mission & Team',
    description: 'Learn about our mission to empower Nigerian youth through sports and mental health support.',
    openGraph: {
        title: 'About YouthSportNG',
        description: 'Learn about our mission to empower Nigerian youth through sports and mental health support.',
        type: 'website',
    },
};

export default function AboutLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header  />
            <main>{children}</main>
            <Footer />
        </>
    );
}