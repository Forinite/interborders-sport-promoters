//app/(components)/sports/news/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { NEWS_QUERY } from '@/lib/queries';
import { JSX } from 'react';

export const revalidate = 0;

export default async function NewsDetailPage({
                                                 params,
                                             }: {
    params: Promise<{ slug: { slug: string } }>;
}) {
    const slug = await params;

    console.log('Slug-:', slug.slug);

    // Fetch all news articles
    const newsList: any[] = await client.fetch(NEWS_QUERY);
    console.log('Sanity news object:', newsList);

    // Find news article by slug.current
    const article = newsList.find((n) => n?.slug?.current === slug.slug);

    console.log('Sanity article object:', article);

    if (!article) {
        notFound();
    }

    function renderTextWithLinks(text: string): JSX.Element[] {
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        const parts = text.split(urlRegex);

        return parts.map((part, i) => {
            if (urlRegex.test(part)) {
                return (
                    <a
                        key={i}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline break-all"
                    >
                        {part}
                    </a>
                );
            }

            return <span key={i}>{part}</span>;
        });
    }

    // Same fallback logic as stories page
    const bodyText =
        article.body?.[0]?.children?.[0]?.text || article.excerpt;

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Back */}
            <Link
                href="/sports"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Sports News
            </Link>

            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.publishedAt
                            ? new Date(article.publishedAt).toLocaleDateString(
                                'en-GB',
                                {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                }
                            )
                            : 'Unpublished'}
                    </span>
                </div>
            </header>

            {/* Cover Image */}
            {article.image && (
                <div className="relative aspect-video mb-8 rounded-lg overflow-hidden bg-muted">
                    <Image
                        src={article.image.asset.url}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                </div>
            )}

            {/* Body */}
            <div className="prose prose-lg max-w-none mb-12 whitespace-pre-line text-muted-foreground">
                {renderTextWithLinks(bodyText)}
            </div>
        </article>
    );
}
