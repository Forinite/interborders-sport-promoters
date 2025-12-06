// app/(components)/sports/[slug]/page.tsx

// app/(components)/sports/[slug]/page.tsx
import { client } from '@/sanity/lib/client';
import { EVENTS_QUERY } from '@/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {Calendar, MapPin, ArrowLeft, Clock, Trophy, DollarSign, Users} from 'lucide-react';

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch all events, then find the one with matching slug
    const events = await client.fetch(EVENTS_QUERY);
    const event = events.find((e: any) => e.slug.current === slug);

    console.log('Sanity event object:', event);

    if (!event) {
        return <div className="container mx-auto px-4 py-12 text-center">Event not found</div>;
    }

    const eventDate = new Date(event.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <article className="container mx-auto px-6 py-16 max-w-5xl">
            {/* Back Link */}
            <Link
                href="/sports"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium mb-12 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Events
            </Link>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Title */}
                    <header>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                            {event.title}
                        </h1>
                        <p className="text-xl text-slate-600 mt-4">
                            {event.sport}
                        </p>
                    </header>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-6 text-sm text-slate-600 border-b pb-8">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            {eventDate}{event.time && ` · ${event.time}`}
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            {event.location}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
                        <p className="whitespace-pre-line">{event.description}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t">
                        <div>
                            <p className="text-sm text-slate-500 uppercase tracking-wider">Age Group</p>
                            <p className="text-2xl font-semibold text-slate-900 mt-1">{event.ageGroup}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 uppercase tracking-wider">Entry Fee</p>
                            <p className="text-2xl font-semibold text-slate-900 mt-1">
                                {event.isFree ? 'Free' : 'Paid Registration'}
                            </p>
                        </div>
                        {event.spotsLeft !== undefined && (
                            <div className="sm:col-span-2">
                                <p className="text-sm text-slate-500 uppercase tracking-wider">Spots Remaining</p>
                                <p className={`text-3xl font-bold mt-1 ${event.spotsLeft < 20 ? 'text-red-600' : 'text-slate-900'}`}>
                                    {event.spotsLeft}
                                    {event.spotsLeft < 20 && <span className="text-sm font-normal ml-2">— Limited availability</span>}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-8">
                    {/* Image */}
                    {event.image?.asset?.url ? (
                        <div className="rounded-2xl overflow-hidden shadow-sm border">
                            <Image
                                src={event.image.asset.url}
                                alt={event.title}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="bg-slate-100 border-2 border-dashed rounded-2xl h-96 flex items-center justify-center">
                            <Calendar className="h-16 w-16 text-slate-300" />
                        </div>
                    )}

                    {/* CTA */}
                    <div className="space-y-4">
                        {event.registrationLink ? (
                            <Button
                                asChild
                                size="lg"
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium"
                            >
                                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                                    Register for Event
                                </a>
                            </Button>
                        ) : (
                            <div className="text-center py-8 text-slate-500">
                                <p className="font-medium">Registration not open yet</p>
                            </div>
                        )}

                        <Button asChild variant="outline" size="lg" className="w-full">
                            <Link href="/contact">Contact Organizer</Link>
                        </Button>
                    </div>
                </aside>
            </div>
        </article>
    );
}
