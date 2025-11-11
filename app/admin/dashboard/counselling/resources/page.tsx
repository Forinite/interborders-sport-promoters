// app/admin/dashboard/counselling/resources/page.tsx
import { client } from '@/sanity/lib/client';
import { RESOURCES_QUERY } from '@/lib/queries';
import ResourcesList from './ResourcesList';

export default async function ResourcesPage() {
    let resources: any[] = [];
    let loading = true;
    let error: string | null = null;

    try {
        resources = await client.fetch(RESOURCES_QUERY);
        loading = false;
    } catch (err) {
        console.error('Failed to fetch resources:', err);
        error = 'Failed to load resources. Please try again later.';
        loading = false;
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                        <div className="h-9 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex gap-4 p-4 border rounded-lg">
                                <div className="h-20 w-20 bg-gray-200 rounded-lg animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-700">{error}</p>
            </div>
        );
    }

    return <ResourcesList resources={resources} />;
}