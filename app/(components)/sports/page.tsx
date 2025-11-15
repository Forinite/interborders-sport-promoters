// app/(components)/sports/page.tsx

import FilterBar from './components/FilterBar';
import EventCard from './components/EventCard';
import NewsCard from './components/NewsCard';
import { EVENTS_QUERY, NEWS_QUERY } from '@/lib/queries';
import type { Event, News } from '@/types';
import {client} from "@/sanity/lib/client";



async function fetchEvents(): Promise<Event[]> {
    try {
        const events = await client.fetch<Event[]>(EVENTS_QUERY, {}, { next: { revalidate: 60 } });
        return events;
    } catch (error) {
        console.error('Sanity events fetch error:', error);
        return [];
    }
}

async function fetchNews(): Promise<News[]> {
    try {
        const news = await client.fetch<News[]>(NEWS_QUERY, {}, { next: { revalidate: 60 } });
        return news;
    } catch (error) {
        console.error('Sanity news fetch error:', error);
        return [];
    }
}

export default async function SportsPage() {
    const [events, news] = await Promise.all([fetchEvents(), fetchNews()]);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="container mx-auto px-5 md:px-8 py-16 md:py-24 max-w-7xl">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-[#1E293B] leading-tight">
            <span className="relative inline-block text-6xl md:text-7xl">
              <span className="absolute -translate-x-1 -translate-y-1 text-[#E2E8F0] select-none opacity-70">
                Sports & Opportunities
              </span>
              <span className="relative">Sports & Opportunities</span>
            </span>
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl text-[#475569] max-w-4xl mx-auto leading-relaxed font-light">
                        Tournaments • Training Camps • National Trials • Youth Sports News Across Nigeria
                    </p>
                </div>

                <FilterBar />

                <div className="space-y-24">
                    {/* Events */}
                    <section>
                        <h2 className="text-4xl font-bold text-[#1E293B] mb-12">
                            Upcoming Events
                        </h2>
                        {events.length === 0 ? (
                            <p className="text-center text-[#64748B] py-12">No upcoming events at this time.</p>
                        ) : (
                            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                                {events.map((event) => (
                                    <EventCard key={event._id} event={event} />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* News */}
                    <section>
                        <h2 className="text-4xl font-bold text-[#1E293B] mb-12">
                            Latest News
                        </h2>
                        {news.length === 0 ? (
                            <p className="text-center text-[#64748B] py-12">No news articles available.</p>
                        ) : (
                            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                                {news.map((item) => (
                                    <NewsCard key={item._id} news={item} />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}