// components/ui/StoryCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { placeholderImage } from '@/constants/images';
import {Story} from "@/types";



export default function StoryCard({ story }: { story: Story }) {
    // Use Sanity image URL if exists, else fallback
    const imageUrl = story.image?.asset?.url || placeholderImage;

    return (
        <Link
            href={`/stories/${story.slug.current}`}
            className="block group focus:outline-none"
            aria-label={`Read success story: ${story.title}`}
        >
            {/* 7-Layer Paper Stack – No Blur, No Glow */}
            <div className="relative h-[520px] rounded-lg overflow-hidden transition-all duration-500
                      group-hover:translate-y-[-12px] group-hover:shadow-xl
                      group-focus-within:ring-4 group-focus-within:ring-[#0A84FF]/20">

                {/* Layer 1: Deep Back */}
                <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#E2E8F0] rounded-lg" />

                {/* Layer 2: Mid Shadow */}
                <div className="absolute inset-0 translate-x-2 translate-y-2 bg-[#F1F5F9] rounded-lg border-2 border-[#CBD5E1]" />

                {/* Layer 3: Main Card */}
                <div className="relative bg-white rounded-lg border-2 border-[#CBD5E1] shadow-md h-full flex flex-col">

                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-[#F8FAFC]">
                        <Image
                            src={imageUrl}
                            alt={story.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority={false}
                        />
                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Clean Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white border border-[#CBD5E1] rounded-md shadow-sm">
                            <span className="text-xs font-bold text-[#0052CC] tracking-wider">SUCCESS STORY</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                            <h3 className="text-xl md:text-2xl font-bold text-[#1E293B] line-clamp-2 leading-tight">
                                {story.title}
                            </h3>
                            <p className="text-[#475569] text-base leading-relaxed line-clamp-3">
                                {story.excerpt || 'No excerpt available.'}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-sm">
                            <span className="text-[#64748B]">Featured Athlete</span>
                            <span className="font-semibold text-[#0A84FF] group-hover:text-[#0052CC] transition-colors">
                Read Full Story
              </span>
                        </div>
                    </div>

                    {/* Layer 4: Inner Decorative Border */}
                    <div className="absolute inset-4 border border-[#E2E8F0] rounded-lg pointer-events-none" />
                </div>
            </div>
        </Link>
    );
}