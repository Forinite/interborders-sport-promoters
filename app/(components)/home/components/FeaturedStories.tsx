// app/(components)/home/components/FeaturedStories.tsx
import StoryCard from '@/components/ui/StoryCard';
import { type Story } from '@/types';
import { client } from '@/sanity/lib/client';
import { STORIES_QUERY } from '@/lib/queries';

async function fetchFeaturedStories(): Promise<Story[]> {
    try {
        const stories = await client.fetch<Story[]>(
            STORIES_QUERY,
            {},
            { next: { revalidate: 60 } } // ISR: 60s
        );
        return stories.slice(0, 3); // Only top 3
    } catch (error) {
        console.error('Sanity fetch failed (FeaturedStories):', error);
        return [];
    }
}

export default async function FeaturedStories() {
    const stories = await fetchFeaturedStories();

    if (!stories.length) return null;

    return (
        <section className="py-20 md:py-28 bg-[#F8FAFC]">
            <div className="container mx-auto px-5 md:px-8 max-w-7xl">
                {/* Professional Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-[#1E293B] leading-tight">
            <span className="relative inline-block">
              <span className="absolute -translate-x-0.5 -translate-y-0.5 text-[#E2E8F0] select-none opacity-70 text-3xl md:text-4xl">
                Featured Success Stories
              </span>
              <span className="relative">Featured Success Stories</span>
            </span>
                    </h2>
                    <p className="mt-4 text-lg md:text-xl text-[#475569] max-w-3xl mx-auto font-light">
                        Real journeys of resilience, growth, and triumph from Nigerian youth
                    </p>
                </div>

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {stories.map((story, i) => (
                        <div
                            key={story._id}
                            className="group"
                            style={{
                                transform: i === 1 ? 'translateY(-8px)' : 'translateY(0)',
                                transition: 'transform 0.4s ease-out',
                            }}
                        >
                            <StoryCard story={story} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}