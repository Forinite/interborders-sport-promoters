// app/(components)/sports/page.tsx
import FilterBar from './components/FilterBar';
import EventCard from './components/EventCard';
import NewsCard from './components/NewsCard';
import { events } from '@/constants/sportsData';
import { news } from '@/constants/sportsData';

export default function SportsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Sports & Opportunities</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Find tournaments, training programs, and stay updated with youth sports news across Nigeria.
                </p>
            </div>

            <FilterBar />

            <div className="space-y-12">
                {/* Events Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                </section>

                {/* News Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Latest News</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {news.map((item) => (
                            <NewsCard key={item._id} news={item} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}