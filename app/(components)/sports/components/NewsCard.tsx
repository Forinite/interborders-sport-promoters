// app/(components)/sports/components/NewsCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { type News } from '@/types';

type NewsCardProps = {
    news: News;
};

export default function NewsCard({ news }: NewsCardProps) {
    return (
        <Card className="overflow-hidden h-full flex flex-col">
            <div className="relative aspect-square bg-muted">
                <Image
                    src={`/images/news/${news._id}.jpg`}
                    alt={news.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">{news.title}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(news.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <CardDescription className="line-clamp-3">{news.excerpt}</CardDescription>
            </CardContent>
            <CardFooter>
                <Button asChild variant="outline" className="w-full">
                    <Link href={`/sports/news/${news.slug.current}`}>Read More</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
