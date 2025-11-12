// // app/(components)/home/page.tsx
// import HeroSection from './components/HeroSection';
// import FeaturedStories from './components/FeaturedStories';
// import QuickLinks from './components/QuickLinks';
// import { getFeaturedStories } from '@/lib/sanity.queries';
//
// export const revalidate = 600; // 10 minutes
//
// export default async function HomePage() {
//     let featuredStories = null;
//     let error = null;
//
//     try {
//         featuredStories = await getFeaturedStories();
//     } catch (err) {
//         console.error('Failed to fetch featured stories:', err);
//         error = 'Failed to load featured stories. Please try again later.';
//     }
//
//     return (
//         <>
//             <HeroSection />
//             {error ? (
//                 <section className="container mx-auto px-4 py-12 text-center">
//                     <p className="text-red-600">{error}</p>
//                 </section>
//             ) : (
//                 <FeaturedStories stories={featuredStories || []} />
//             )}
//             <QuickLinks />
//         </>
//     );
// }

// app/(components)/home/page.tsx

// app/(components)/home/page.tsx
import HeroSection from './components/HeroSection';
import FeaturedStories from './components/FeaturedStories';
import QuickLinks from './components/QuickLinks';
import { featuredStories } from '@/constants/homeData';
import GrainOverlay from '@/components/effects/GrainOverlay';

export default function HomePage() {
    return (
        <main className="bg-black text-white overflow-hidden">
            <GrainOverlay />
            <HeroSection />
            <FeaturedStories stories={featuredStories} />
            <QuickLinks />
        </main>
    );
}