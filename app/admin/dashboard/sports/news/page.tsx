// app/admin/dashboard/sports/news/page.tsx
import { client } from '@/sanity/lib/client';
import { NEWS_QUERY } from '@/lib/queries';
import NewsList from './NewsList';
import { AlertCircle } from 'lucide-react';

export default async function NewsPage() {
    let news: any[] = [];
    let error = false;

    try {
        news = await client.fetch(NEWS_QUERY);
    } catch (err) {
        console.error('Failed to fetch news:', err);
        error = true;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <AlertCircle className="h-9 w-9 text-red-500 mb-3" />
                <p className="font-semibold text-red-600">Failed to load news</p>
                <p className="text-xs text-slate-500 mt-1">Check your connection and try again.</p>
            </div>
        );
    }

    return <NewsList news={news} />;
}