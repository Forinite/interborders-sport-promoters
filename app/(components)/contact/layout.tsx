// app/(components)/contact/layout.tsx
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { navLinks } from '@/constants/navLinks';

export const metadata: Metadata = {
    title: 'Contact Us | YouthSportNG',
    description: 'Get in touch with our team for partnerships, support, or general inquiries.',
    openGraph: {
        title: 'Contact Us',
        description: 'Get in touch with our team for partnerships, support, or general inquiries.',
        type: 'website',
    },
};

export default function ContactLayout({
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