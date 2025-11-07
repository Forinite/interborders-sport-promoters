// app/(components)/counselling/components/ResourceGrid.tsx
import ResourceCard from '@/components/ui/ResourceCard';
import { type Resource } from '@/types';

type ResourceGridProps = {
    resources: Resource[];
};

export default function ResourceGrid({ resources }: ResourceGridProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Mental Health Resources</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                {resources.map((resource) => (
                    <ResourceCard key={resource._id} resource={resource} />
                ))}
            </div>
        </div>
    );
}