// app/(components)/counselling/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { resources } from '@/constants/counsellingData';
import { Button } from '@/components/ui/button';
import { FileText, PlayCircle, BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-static';

export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
    return resources.map((r) => ({ slug: r._id }));
}

export default function ResourceDetailPage({ params }: { params: { slug: string } }) {
    const resource = resources.find((r) => r._id === params.slug);
    if (!resource) notFound();

    const Icon = resource.format === 'pdf' ? FileText : resource.format === 'video' ? PlayCircle : BookOpen;

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/counselling" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                <ArrowLeft className="h-4 w-4" /> Back to Resources
            </Link>

            <header className="mb-8">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase">{resource.format}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{resource.title}</h1>
            </header>

            <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground">{resource.summary}</p>
                {resource.body ? (
                    <div dangerouslySetInnerHTML={{ __html: resource.body.join('') }} />
                ) : (
                    <p className="mt-6 italic">Full content coming soon from Sanity CMS.</p>
                )}
            </div>

            <div className="mt-12">
                {resource.format === 'pdf' && resource.fileUrl && (
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                        <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                            Download PDF
                        </a>
                    </Button>
                )}
                {resource.format === 'video' && resource.videoUrl && (
                    <Button asChild>
                        <a href={resource.videoUrl} target="_blank" rel="noopener noreferrer">
                            Watch Video
                        </a>
                    </Button>
                )}
            </div>
        </article>
    );
}