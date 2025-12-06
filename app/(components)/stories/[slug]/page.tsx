// app/(components)/stories/[slug]/page.tsx

// app/(components)/stories/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Share2, Calendar, User } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { STORIES_QUERY } from '@/lib/queries';
import {JSX} from "react";

export const revalidate = 0;

export default async function StoryPage({ params }: { params: Promise<{ slug: { slug: string } }> }) {
    const slug = await params;

    console.log('Slug-:', slug.slug);

    // Fetch all stories (existing query). Then find the one matching params.slug
    const stories: any[] = await client.fetch(STORIES_QUERY);
    console.log('Sanity stories object:', stories);

    // Find story by comparing slug.current
    const story = stories.find((s) => s?.slug?.current === slug.slug);

    console.log('Sanity story object:', story);

    if (!story) {
        // If not found, show 404
        notFound();
    }

    function renderTextWithLinks(text: string): JSX.Element[] {
        // URL recognition regex
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        // Split text by URLs while keeping the URL tokens
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



    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Back Button */}
            <Link href="/stories" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                <ArrowLeft className="h-4 w-4" />
                Back to Stories
            </Link>

            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{story.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
              {story.author || 'ISP Team'}
          </span>

                    <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
                        {story.publishedAt
                            ? new Date(story.publishedAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })
                            : 'Unpublished'}
          </span>
                </div>
            </header>

            {/* Cover Image */}
            {story.image && (
                <div className="relative aspect-video mb-8 rounded-lg overflow-hidden bg-muted">
                    <Image src={story.image.asset.url} alt={story.title || 'Story cover'} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
                </div>
            )}

            {/* Body: fallback to excerpt if no body */}
            <div className="prose prose-lg max-w-none mb-12 whitespace-pre-line text-muted-foreground">
                {renderTextWithLinks(story.body?.[0]?.children?.[0]?.text || story.excerpt)}
            </div>

            {/* Tags + Share */}
            <div className="flex items-center justify-between border-t pt-6">
                <div className="flex gap-2 flex-wrap">
                    {Array.isArray(story.tags) &&
                        story.tags.map((tag: string) => (
                            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                {tag}
              </span>
                        ))}
                </div>

            </div>
        </article>
    );
}