// app/(components)/stories/page.tsx
import StoryGrid from './components/StoryGrid';
import { stories } from '@/constants/storiesData';
import { featuredStories } from '@/constants/homeData';

export default function StoriesPage() {
    const allStories = [...featuredStories, ...stories];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Real journeys of Nigerian youth who turned challenges into triumphs through sports,
                    resilience, and community support.
                </p>
            </div>
            <StoryGrid stories={allStories} />
        </div>
    );
}