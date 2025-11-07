// app/(components)/sports/components/EventCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, BadgeDollarSign } from 'lucide-react';
import { type Event } from '@/types';

type EventCardProps = {
    event: Event;
};

export default function EventCard({ event }: EventCardProps) {
    return (
        <Card className="overflow-hidden h-full flex flex-col">
            <div className="relative aspect-video bg-muted">
                <Image
                    src={`/images/events/${event._id}.jpg`}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                {event.spotsLeft !== undefined && event.spotsLeft < 20 && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {event.spotsLeft} spots left
                    </div>
                )}
            </div>
            <CardHeader>
                <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-2">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
              {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </span>
                    <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
                        {event.location.split(',')[0]}
          </span>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <CardDescription className="line-clamp-3">{event.description}</CardDescription>
                <div className="flex items-center gap-4 mt-4 text-sm">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
              {event.ageGroup}
          </span>
                    <span className="flex items-center gap-1">
            <BadgeDollarSign className="h-4 w-4" />
                        {event.isFree ? 'Free' : 'Paid'}
          </span>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <Link href={`/sports/${event.slug.current}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}