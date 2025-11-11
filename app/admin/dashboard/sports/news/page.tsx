// app/admin/dashboard/sports/news/page.tsx
import { client } from '@/sanity/lib/client';
import { NEWS_QUERY } from '@/lib/queries';
import NewsList from './NewsList';

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
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-700">Failed to load news. Please try again later.</p>
            </div>
        );
    }

    return <NewsList news={news} />;
}
