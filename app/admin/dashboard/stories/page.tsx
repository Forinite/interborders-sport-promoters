// app/admin/dashboard/stories/page.tsx
'use client';

import { useSanityData } from '@/hooks/useSanityData';
import { STORIES_QUERY } from '@/lib/queries';
import StoriesList from './StoriesList';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import {Story} from "@/types";

export default function StoriesPage() {
    const { data: stories, loading, error, refetch } = useSanityData<Story>(STORIES_QUERY);

    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <p className="text-lg font-medium text-red-600">Error Loading Stories</p>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <button
                    onClick={refetch}
                    className="text-sm text-green-600 hover:underline"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // if (!stories?.length) {
    //     return (
    //         <div className="text-center p-8">
    //             <p className="text-lg text-muted-foreground">No stories found.</p>
    //             <p className="text-sm mt-2">Create your first story to get started!</p>
    //         </div>
    //     );
    // }

    return <StoriesList stories={stories} />;
}