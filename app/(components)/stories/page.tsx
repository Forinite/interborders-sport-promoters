// app/(components)/stories/page.tsx

// app/(components)/stories/page.tsx
import StoryGrid from './components/StoryGrid';
import { stories } from '@/constants/storiesData';
import { featuredStories } from '@/constants/homeData';
import StoryCard from "@/components/ui/StoryCard";

export default function StoriesPage() {
    const allStories = [...featuredStories, ...stories];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="container mx-auto px-5 md:px-8 py-16 md:py-24 max-w-7xl">

                {/* National Hero Header */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-black text-[#1E293B] leading-tight">
            <span className="relative inline-block">
              {/* Deep Etched Shadow */}
                <span className="absolute -translate-x-1.5 -translate-y-1.5 text-[#E2E8F0] select-none opacity-70">
                SUCCESS STORIES
              </span>
              <span className="relative">SUCCESS STORIES</span>
            </span>
                    </h1>

                    <p className="mt-8 text-xl md:text-2xl text-[#475569] max-w-4xl mx-auto leading-relaxed font-light">
                        Real journeys of Nigerian youth who turned challenges into triumphs through sports, resilience, and community support.
                    </p>

                    {/* National Badge */}
                    <div className="mt-10 inline-flex items-center gap-4 px-8 py-4 bg-white border-2 border-[#CBD5E1] rounded-full shadow-xl">
                        <div className="w-10 h-10 bg-[#0A84FF] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">ISP</span>
                        </div>
                        <span className="text-lg font-bold text-[#1E293B] tracking-wider">
              {allStories.length} STORIES OF HOPE
            </span>
                    </div>
                </div>


                {/* Rest of the Grid */}
                <StoryGrid stories={allStories.slice(1)} />
            </div>
        </div>
    );
}