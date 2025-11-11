// app/(components)/home/layout.tsx
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { navLinks } from '@/constants/navLinks';


export const metadata: Metadata = {
    title: 'YouthSportNG – Empowering Youth Through Sports & Counselling',
    description:
        'Inspiring Nigerian youth with sports opportunities, success stories, and mental health support.',
    openGraph: {
        title: 'YouthSportNG',
        description:
            'Inspiring Nigerian youth with sports opportunities, success stories, and mental health support.',
        type: 'website',
        locale: 'en_NG',
        siteName: 'YouthSportNG',
    },
};

export default function HomeLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}