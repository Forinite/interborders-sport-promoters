// app/(components)/sports/page.tsx
'use client';
import { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import EventCard from './components/EventCard';
import NewsCard from './components/NewsCard';
import { client } from '@/sanity/lib/client';
import type { Event, News } from '@/types';

export default function SportsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [news, setNews] = useState<News[]>([]);
    const [filters, setFilters] = useState({ search: '', sport: 'all', location: 'all' });

    useEffect(() => {
        async function fetchFiltered() {
            const queryParts: string[] = [];
            const params: Record<string, any> = {};

            if (filters.search) {
                queryParts.push(`title match $search || description match $search || location match $search`);
                params.search = `*${filters.search}*`;
            }
            if (filters.sport !== 'all') {
                queryParts.push(`sport == $sport || category == $sport`);
                params.sport = filters.sport;
            }
            if (filters.location !== 'all') {
                queryParts.push(`location match $location`);
                params.location = `*${filters.location}*`;
            }

            const eventsQuery = `*[_type=="event"${queryParts.length ? ` && (${queryParts.join(' && ')})` : ''}] | order(date asc)`;
            const newsQuery = `*[_type=="news"${queryParts.length ? ` && (${queryParts.join(' && ')})` : ''}] | order(publishedAt desc)`;

            try {
                const [eventsData, newsData] = await Promise.all([
                    client.fetch<Event[]>(eventsQuery, params),
                    client.fetch<News[]>(newsQuery, params),
                ]);
                setEvents(eventsData);
                setNews(newsData);
            } catch (err) {
                console.error('Error fetching filtered data:', err);
            }
        }

        fetchFiltered();
    }, [filters]);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="container mx-auto px-5 md:px-8 py-16 md:py-24 max-w-7xl">
                <FilterBar onFilter={setFilters} />

                <section>
                    <h2 className="text-4xl font-bold text-[#1E293B] mb-12">Upcoming Events</h2>
                    {events.length === 0 ? (
                        <p className="text-center text-[#64748B] py-12">No events found.</p>
                    ) : (
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                            {events.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </div>
                    )}
                </section>

                <section className="mt-24">
                    <h2 className="text-4xl font-bold text-[#1E293B] mb-12">Latest News</h2>
                    {news.length === 0 ? (
                        <p className="text-center text-[#64748B] py-12">No news found.</p>
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
    );
}
