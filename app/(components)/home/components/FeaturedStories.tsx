// app/(components)/home/components/FeaturedStories.tsx
import StoryCard from '@/components/ui/StoryCard';
import { type Story } from '@/types/index';

type FeaturedStoriesProps = {
    stories: Story[];
};

export default function FeaturedStories({ stories }: FeaturedStoriesProps) {
    if (stories.length === 0) return null;

    return (
        <section className="container mx-auto px-4 py-16">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold md:text-4xl">Featured Success Stories</h2>
                <p className="mt-3 text-muted-foreground">
                    Real journeys of resilience and triumph
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {stories.slice(0, 3).map((story) => (
                    <StoryCard key={story._id} story={story} />
                ))}
            </div>
        </section>
    );
}