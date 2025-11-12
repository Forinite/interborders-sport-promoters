// app/(components)/sports/components/NewsCard.tsx

// app/(components)/sports/componentsnNewsCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import {FootballerImage} from "@/constants/images";

export default function NewsCard({ news }: { news: any }) {
    return (
        <Link href={`/sports/news/${news.slug.current}`} className="block group focus:outline-none">
            {/* Master Container — Fixed shorter height, wider feel */}
            <div className="relative h-[280px] md:h-[320px] transition-all duration-500
                      group-hover:shadow-2xl group-focus-within:ring-4 group-focus-within:ring-[#0A84FF]/20">

                {/* LAYER 1: Deep Back — Moves 12px */}
                <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#E2E8F0] rounded-xl
                        transition-all duration-500 group-hover:translate-x-12 group-hover:translate-y-12" />

                {/* LAYER 2: Mid Layer — Moves 8px */}
                <div className="absolute inset-0 translate-x-2 translate-y-2 bg-[#F1F5F9] rounded-xl border-2 border-[#CBD5E1]
                        transition-all duration-500 group-hover:translate-x-8 group-hover:translate-y-8" />

                {/* LAYER 3: Main Card — Moves 4px */}
                <div className="absolute inset-0 translate-x-1 translate-y-1 bg-white rounded-xl border-2 border-[#CBD5E1]
                        shadow-lg transition-all duration-500
                        group-hover:translate-x-4 group-hover:translate-y-4">

                    {/* Actual Content Card — Stays still */}
                    <div className="relative h-full bg-white rounded-xl border-2 border-[#CBD5E1] overflow-hidden
                          flex flex-col md:flex-row">

                        {/* Image — Left side, fixed */}
                        <div className="relative w-full md:w-5/12 h-48 md:h-full overflow-hidden">
                            <Image
                                src={FootballerImage}
                                alt={news.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                        </div>

                        {/* Content — Right side, clean hierarchy */}
                        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-[#1E293B] line-clamp-2 leading-tight">
                                    {news.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-2 text-sm text-[#475569]">
                                    <Calendar className="h-4 w-4 text-[#0A84FF]" />
                                    <span className="font-medium">
                    {new Date(news.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                                </div>
                            </div>

                            <p className="text-sm text-[#475569] line-clamp-2 mt-3">
                                {news.excerpt}
                            </p>

                            <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex justify-end">
                <span className="text-sm font-bold text-[#0A84FF] flex items-center gap-2">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </span>
                            </div>
                        </div>
                    </div>

                    {/* Inner decorative border — static */}
                    <div className="absolute inset-4 border border-[#E2E8F0] rounded-xl pointer-events-none" />
                </div>
            </div>
        </Link>
    );
}