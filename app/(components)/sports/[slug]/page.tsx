// app/(components)/sports/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, BadgeDollarSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { events } from '@/constants/sportsData';

export const dynamic = 'force-static';

export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
    return events.map((e) => ({ slug: e.slug.current }));
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
    const event = events.find((e) => e.slug.current === params.slug);

    if (!event) notFound();

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/sports" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                <ArrowLeft className="h-4 w-4" /> Back to Sports
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
              {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              {event.time && ` · ${event.time}`}
          </span>
                    <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
                        {event.location}
          </span>
                </div>
            </header>

            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden bg-muted">
                <Image
                    src={`/images/events/${event._id}.jpg`}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                />
            </div>

            <div className="prose prose-lg max-w-none mb-8">
                <p className="text-lg leading-relaxed">{event.description}</p>
                <ul className="mt-6 space-y-2">
                    <li><strong>Sport:</strong> {event.sport}</li>
                    <li><strong>Age Group:</strong> {event.ageGroup}</li>
                    <li><strong>Cost:</strong> {event.isFree ? 'Free' : 'Paid Registration'}</li>
                    {event.spotsLeft !== undefined && (
                        <li><strong>Spots Left:</strong> {event.spotsLeft}</li>
                    )}
                </ul>
            </div>

            <div className="flex gap-4">
                <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                        Register Now
                    </a>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/contact">Contact Organizer</Link>
                </Button>
            </div>
        </article>
    );
}