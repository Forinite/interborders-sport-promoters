// app/admin/dashboard/sports/events/page.tsx

'use client';

import { useSanityData } from '@/hooks/useSanityData';
import { EVENTS_QUERY } from '@/lib/queries';
import EventsList from './EventsList';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function EventsAdminPage() {
    const { data: events = [], loading, error, refetch } = useSanityData<any>(EVENTS_QUERY);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} onRetry={refetch} />;

    return <EventsList events={events} />;
}

// Compact, professional states
function LoadingState() {
    return (
        <div className="space-y-3">
            <Skeleton className="h-10 w-80 rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
        </div>
    );
}

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle className="h-9 w-9 text-red-500 mb-3" />
            <p className="font-semibold text-red-600">Failed to load events</p>
            <p className="text-xs text-slate-500 mt-1 max-w-md">{error}</p>
            <button
                onClick={onRetry}
                className="mt-3 text-xs font-medium text-[#0A84FF] hover:underline flex items-center gap-1.5"
            >
                <RefreshCw className="h-3 w-3" />
                Retry
            </button>
        </div>
    );
}