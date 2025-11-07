// components/ui/StoryCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { type Story } from '@/types';
import {placeholderImage} from "@/constants/images";

type StoryCardProps = {
    story: Story;
};

export default function StoryCard({ story }: StoryCardProps) {
    // const placeholderImage = '/images/placeholder-story.jpg';

    return (
        <Card className="overflow-hidden transition-transform hover:scale-[1.02] h-full flex flex-col">
            <div className="relative aspect-video bg-muted">
                <Image
                    src={story.image?.asset?._ref ? placeholderImage: `/images/stories/${story._id}.jpg` }
                    alt={story.image?.alt || story.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <CardHeader className="flex-1">
                <CardTitle className="line-clamp-2 text-lg">{story.title}</CardTitle>
                <CardDescription className="line-clamp-3 text-sm">{story.excerpt}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-0">
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <Link href={`/stories/${story.slug.current}`}>Read Story</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}