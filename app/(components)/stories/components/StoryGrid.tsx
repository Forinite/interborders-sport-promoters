// app/(components)/stories/components/StoryGrid.tsx
import StoryCard from '@/components/ui/StoryCard';
import { type Story } from '@/types';

type StoryGridProps = {
    stories: Story[];
};

export default function StoryGrid({ stories }: StoryGridProps) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
                <StoryCard key={story._id} story={story} />
            ))}
        </div>
    );
}