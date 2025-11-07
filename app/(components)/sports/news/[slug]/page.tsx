// app/(components)/sports/news/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { news } from '@/constants/sportsData';

export const dynamic = 'force-static';

export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
    return news.map((n) => ({ slug: n.slug.current }));
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
    const article = news.find((n) => n.slug.current === params.slug);

    if (!article) notFound();

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/sports" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                <ArrowLeft className="h-4 w-4" /> Back to Sports
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
            </header>

            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden bg-muted">
                <Image
                    src={`/images/news/${article._id}.jpg`}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                />
            </div>

            <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed">{article.excerpt}</p>
                <p className="mt-6">
                    Full article content will come from Sanity in production. This is a static placeholder.
                </p>
            </div>

            <div className="mt-12 flex gap-4">
                <Button variant="outline" asChild>
                    <Link href="/sports">More News</Link>
                </Button>
            </div>
        </article>
    );
}