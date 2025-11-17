// app/(components)/sports/components/EventCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users, BadgeDollarSign, ArrowRight } from 'lucide-react';
import { FootballerImage } from "@/constants/images";
import { Event } from "@/types";
import {urlFor} from "@/sanity/lib/image";



export default function EventCard({ event }: { event: Event }) {
    const imageUrl = event.image ? urlFor(event.image).width(800).height(450).url() : FootballerImage;
    const imageAlt = event.image?.alt || event.title;

    return (
        <Link href={`/sports/${event.slug.current}`} className="block group focus:outline-none">
            <div className="relative h-full min-h-[520px] transition-all duration-500
                      group-hover:translate-y-[-16px] group-hover:shadow-2xl
                      group-focus-within:ring-4 group-focus-within:ring-[#0A84FF]/20">

                {/* Depth Layers */}
                <div className="absolute inset-0 translate-x-5 translate-y-5 bg-[#E2E8F0] rounded-2xl" />
                <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#F1F5F9] rounded-2xl border-2 border-[#CBD5E1]" />

                {/* Main Card */}
                <div className="relative bg-white rounded-2xl border-2 border-[#CBD5E1] shadow-lg h-full flex flex-col overflow-hidden">
                    <div className="relative aspect-video">
                        <Image
                            src={imageUrl!}
                            alt={imageAlt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />

                        {event.spotsLeft != null && event.spotsLeft < 20 && (
                            <div className="absolute top-4 right-4 bg-red-600 text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg">
                                {event.spotsLeft} SPOTS LEFT
                            </div>
                        )}
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold text-[#1E293B] line-clamp-2 mb-4">
                            {event.title}
                        </h3>

                        <div className="space-y-4 text-[#475569]">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-[#0A84FF]" />
                                <span className="font-medium">
                  {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-[#0A84FF]" />
                                <span className="font-medium">{event.location}</span>
                            </div>
                        </div>

                        <p className="mt-6 text-[#475569] line-clamp-3 flex-1">
                            {event.description}
                        </p>

                        <div className="mt-8 pt-6 border-t-2 border-[#E2E8F0] flex items-center justify-between">
                            <div className="flex gap-6 text-sm font-medium">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#0A84FF]" />
                    {event.ageGroup}
                </span>
                                <span className="flex items-center gap-2">
                  <BadgeDollarSign className="h-5 w-5 text-[#0A84FF]" />
                                    {event.isFree ? 'FREE' : 'PAID'}
                </span>
                            </div>
                            <span className="font-bold text-[#0A84FF] flex items-center gap-2 group-hover:gap-3 transition-all">
                View Details
                <ArrowRight className="h-5 w-5" />
              </span>
                        </div>
                    </div>

                    <div className="absolute inset-6 border border-[#E2E8F0] rounded-2xl pointer-events-none" />
                </div>
            </div>
        </Link>
    );
}
