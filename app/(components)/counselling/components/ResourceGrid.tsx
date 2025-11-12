// app/(components)/counselling/components/ResourceGrid.tsx
import ResourceCard from '@/components/ui/ResourceCard';
import { type Resource } from '@/types';

export default function ResourceGrid({ resources }: { resources: Resource[] }) {
    return (
        <div className="relative">
            {/* Section Title with Depth */}
            <div className="mb-12">
                <h2 className="text-4xl font-black text-[#1E293B]">
          <span className="relative inline-block">
            <span className="absolute -translate-x-1 -translate-y-1 text-[#E2E8F0]">
              Mental Health Resources
            </span>
            <span className="relative">Mental Health Resources</span>
          </span>
                </h2>
                <p className="mt-4 text-lg text-[#475569]">
                    Curated tools to help you grow stronger, every day.
                </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
                {resources.map((resource, i) => (
                    <div
                        key={resource._id}
                        className="transition-all duration-700 hover:z-10"
                        style={{ animationDelay: `${i * 150}ms` }}
                    >
                        <ResourceCard resource={resource} />
                    </div>
                ))}
            </div>
        </div>
    );
}