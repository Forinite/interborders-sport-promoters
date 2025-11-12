// app/(components)/home/components/QuickLinks.tsx
// app/(components)/home/components/QuickLinks.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function QuickLinks() {
    const portals = [
        {
            title: "SPORTS EVENTS",
            href: "/sports",
            description: "Training camps, tournaments, and national trials"
        },
        {
            title: "GET SUPPORT",
            href: "/counselling",
            description: "Mentorship, funding, and personal development"
        },
        {
            title: "INSPIRATION",
            href: "/stories",
            description: "Real stories of Nigerian youth breaking barriers"
        },
    ];

    return (
        <section className="py-24 md:py-32 bg-[#F8FAFC]">
            <div className="container mx-auto px-5 md:px-8 max-w-7xl">
                {/* Professional Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight">
            <span className="relative inline-block">
              {/* Etched Depth */}
                <span className="absolute -translate-x-0.5 -translate-y-0.5 text-[#E2E8F0] select-none">
                Choose Your Path
              </span>
              <span className="relative">Choose Your Path</span>
            </span>
                    </h2>
                    <p className="mt-4 text-lg md:text-xl text-[#475569] max-w-3xl mx-auto">
                        Explore opportunities designed to elevate Nigerian youth through sports and leadership
                    </p>
                </div>

                {/* Clean 3-Column Grid — Paper Stack Portals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {portals.map((portal, index) => (
                        <Link
                            key={portal.href}
                            href={portal.href}
                            className="group focus:outline-none"
                            aria-label={`Explore ${portal.title}`}
                        >
                            {/* 8-Layer Professional Portal */}
                            <div className="relative h-full min-h-[380px] transition-all duration-500
                              group-hover:translate-y-[-16px] group-hover:shadow-2xl
                              group-focus-within:ring-4 group-focus-within:ring-[#0A84FF]/20">

                                {/* Layer 1: Deep Back */}
                                <div className="absolute inset-0 translate-x-5 translate-y-5 bg-[#E2E8F0] rounded-xl" />

                                {/* Layer 2: Mid Shadow */}
                                <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#F1F5F9] rounded-xl border-2 border-[#CBD5E1]" />

                                {/* Layer 3: Main Card */}
                                <div className="relative bg-white rounded-xl border-2 border-[#CBD5E1] shadow-lg h-full
                                flex flex-col p-8 transition-all duration-500">

                                    {/* Icon Placeholder */}
                                    <div className="w-16 h-16 mx-auto mb-6 bg-[#0A84FF]/10 border-2 border-[#0A84FF]/30
                                  rounded-xl flex items-center justify-center">
                                        <div className="w-10 h-10 bg-[#0A84FF] rounded-lg" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#1E293B] text-center mb-4">
                                        {portal.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[#475569] text-center flex-1 mb-8 leading-relaxed">
                                        {portal.description}
                                    </p>

                                    {/* CTA */}
                                    <div className="mt-auto flex items-center justify-center gap-3 text-[#0A84FF] font-semibold">
                                        <span>Explore Now</span>
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                    </div>

                                    {/* Layer 4: Inner Border */}
                                    <div className="absolute inset-6 border border-[#E2E8F0] rounded-xl pointer-events-none
                                  transition-colors group-hover:border-[#CBD5E1]" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}