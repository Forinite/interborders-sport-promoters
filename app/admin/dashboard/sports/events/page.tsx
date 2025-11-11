'use client';

import { useSanityData } from '@/hooks/useSanityData';
import { EVENTS_QUERY } from '@/lib/queries';
import EventsList from './EventsList';
import {Skeleton} from "@/components/ui/skeleton";

export default function EventsAdminPage() {
    const { data: events, loading, error } = useSanityData(EVENTS_QUERY);

    if (loading) return <div className="space-y-4"><Skeleton className="h-16" /><Skeleton className="h-16" /></div>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!events?.length) return <p className="text-muted-foreground">No events found.</p>;

    return <EventsList events={events} />;
}