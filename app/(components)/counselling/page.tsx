// app/(components)/counselling/page.tsx
// app/(components)/counselling/page.tsx
import ResourceGrid from './components/ResourceGrid';
import BookingPanel from './components/BookingPanel';
import ContactBand from './components/ContactBand';
import { RESOURCES_QUERY } from '@/lib/queries';
import type { Resource } from '@/types';
import { client } from '@/sanity/lib/client';

async function fetchResources(): Promise<Resource[]> {
    try {
        const resources = await client.fetch<Resource[]>(RESOURCES_QUERY, {}, { next: { revalidate: 60 } });
        return resources;
    } catch (error) {
        console.error('Sanity resources fetch error:', error);
        return [];
    }
}

export default async function CounsellingPage() {
    const resources = await fetchResources();

    return (
        <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 max-w-7xl">

                {/* National Healing Header */}
                <header className="text-center mb-12 sm:mb-16 md:mb-20">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#1E293B] leading-tight">
            <span className="relative inline-block">
              <span className="absolute -translate-x-1 -translate-y-1 text-[#E2E8F0] select-none opacity-70 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                GET SUPPORT
              </span>
              <span className="relative">GET SUPPORT</span>
            </span>
                    </h1>

                    <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-[#475569] max-w-3xl mx-auto leading-relaxed font-light px-2">
                        Free counselling, mental health resources, and personal development tools designed for youth.
                    </p>

                    {/* Official Seal — Mobile Responsive */}
                    <div className="mt-8 sm:mt-10 md:mt-12 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-6 sm:px-8 md:px-10 py-5 sm:py-6 bg-white border-4 border-[#CBD5E1] rounded-full shadow-2xl w-fit mx-auto">
                        <div className="w-14 h-14 md:block hidden sm:w-16 sm:h-16 bg-[#0A84FF] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-black text-xl sm:text-2xl">ISP</span>
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-xl sm:text-2xl font-bold text-[#1E293B]">Youth</p>
                            <p className="text-xs sm:text-sm text-[#64748B] font-medium">Mental Health & Development Division</p>
                        </div>
                    </div>
                </header>

                {/* Main Layout — Mobile Stacked, Desktop Side-by-Side */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Resources Section */}
                    <section className="flex-1 lg:w-0">
                        <ResourceGrid resources={resources} />
                    </section>

                    {/* Booking Panel — Full Width on Mobile */}
                    <aside className="lg:w-96 xl:w-80 flex-shrink-0">
                        <div className="sticky top-6">
                            <BookingPanel />
                        </div>
                    </aside>
                </div>

                <div className="mt-16 sm:mt-20">
                    <ContactBand />
                </div>
            </div>
        </div>
    );
}