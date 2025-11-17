// app/(components)/counselling/components/ResourceGrid.tsx
// app/(components)/counselling/components/ResourceGrid.tsx
import ResourceCard from '@/components/ui/ResourceCard';
import { type Resource } from '@/types';

export default function ResourceGrid({ resources }: { resources: Resource[] }) {
    return (
        <div className="relative">
            {/* Section Title */}
            <div className="mb-8 sm:mb-10 md:mb-12">
                <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B]">
          <span className="relative inline-block">
            <span className="absolute -translate-x-0.5 -translate-y-0.5 text-[#E2E8F0] text-2xl sm:text-3xl">
              Mental Health Resources
            </span>
            <span className="relative">Mental Health Resources</span>
          </span>
                </h2>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#475569]">
                    Curated tools to help you grow stronger, every day.
                </p>
            </div>

            {/* Responsive Grid */}
            <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2">
                {resources.map((resource, i) => (
                    <div
                        key={resource._id}
                        className="transition-all duration-500 hover:z-10 hover:scale-[1.02] origin-center"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <ResourceCard resource={resource} />
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {resources.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-[#64748B] text-lg">No resources available at this time.</p>
                </div>
            )}
        </div>
    );
}