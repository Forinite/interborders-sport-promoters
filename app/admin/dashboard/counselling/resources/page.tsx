// app/admin/dashboard/counselling/resources/page.tsx
import { client } from '@/sanity/lib/client';
import { RESOURCES_QUERY } from '@/lib/queries';
import ResourcesList from './ResourcesList';
import { AlertCircle } from 'lucide-react';

export default async function ResourcesPage() {
    let resources: any[] = [];
    let error = false;

    try {
        resources = await client.fetch(RESOURCES_QUERY);
    } catch (err) {
        console.error('Failed to fetch resources:', err);
        error = true;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <AlertCircle className="h-9 w-9 text-red-500 mb-3" />
                <p className="font-semibold text-red-600">Knowledge vault offline</p>
                <p className="text-xs text-slate-500 mt-1">Check connection and try again.</p>
            </div>
        );
    }

    return <ResourcesList resources={resources} />;
}