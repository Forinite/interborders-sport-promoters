// app/admin/dashboard/stories/page.tsx
'use client';

import { useSanityData } from '@/hooks/useSanityData';
import { STORIES_QUERY } from '@/lib/queries';
import StoriesList from './StoriesList';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function StoriesPage() {
    const { data: stories = [], loading, error, refetch } = useSanityData<any>(STORIES_QUERY);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} onRetry={refetch} />;

    return <StoriesList stories={stories} />;
}

function LoadingState() {
    return (
        <div className="space-y-3">
            <Skeleton className="h-10 w-64 rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
        </div>
    );
}

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
            <p className="font-semibold text-red-600">Failed to load stories</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">{error}</p>
            <button
                onClick={onRetry}
                className="mt-4 text-sm font-medium text-[#0A84FF] hover:underline flex items-center gap-2"
            >
                <RefreshCw className="h-3.5 w-3.5" />
                Retry
            </button>
        </div>
    );
}