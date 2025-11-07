// app/(components)/stories/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { stories } from '@/constants/storiesData';
import { featuredStories } from '@/constants/homeData';

export const dynamic = 'force-static';

export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
    const allStories = [...featuredStories, ...stories];
    return allStories.map((s) => ({ slug: s.slug.current }));
}

export default function StoryPage({ params }: { params: { slug: string } }) {
    const allStories = [...featuredStories, ...stories];
    const story = allStories.find((s) => s.slug.current === params.slug);

    if (!story) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/stories" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                <ArrowLeft className="h-4 w-4" />
                Back to Stories
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{story.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
              {story.author || 'YouthSportNG Team'}
          </span>
                    <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
                        {new Date(story.publishedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
          </span>
                </div>
            </header>

            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden bg-muted">
                <Image
                    src={`/images/stories/${story._id}.jpg`}
                    alt={story.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {story.excerpt}
                </p>
                <p className="mt-6">
                    This is a placeholder for the full story content. In production, this will be rich text
                    from Sanity with headings, images, quotes, and formatting.
                </p>
            </div>

            <div className="flex items-center justify-between border-t pt-6">
                <div className="flex gap-2">
                    {story.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
                        >
              {tag}
            </span>
                    ))}
                </div>
                <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                </Button>
            </div>
        </article>
    );
}