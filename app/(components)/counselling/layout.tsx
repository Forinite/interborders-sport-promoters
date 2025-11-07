// app/(components)/counselling/layout.tsx
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { navLinks } from '@/constants/navLinks';

export const metadata: Metadata = {
    title: 'Counselling & Resources | YouthSportNG',
    description: 'Free mental health support, personal growth guides, and confidential counselling for Nigerian youth.',
    openGraph: {
        title: 'Counselling & Resources',
        description: 'Free mental health support, personal growth guides, and confidential counselling for Nigerian youth.',
        type: 'website',
    },
};

export default function CounsellingLayout({
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