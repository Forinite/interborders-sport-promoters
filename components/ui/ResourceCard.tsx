// components/ui/ResourceCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { FileText, PlayCircle, BookOpen } from 'lucide-react';
import { type Resource } from '@/types';

type ResourceCardProps = {
    resource: Resource;
};

export default function ResourceCard({ resource }: ResourceCardProps) {
    const getIcon = () => {
        switch (resource.format) {
            case 'pdf':
                return <FileText className="h-5 w-5" />;
            case 'video':
                return <PlayCircle className="h-5 w-5" />;
            case 'article':
                return <BookOpen className="h-5 w-5" />;
        }
    };

    const getAction = () => {
        switch (resource.format) {
            case 'pdf':
                return (
                    <Button asChild className="w-full">
                        <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                            Download PDF
                        </a>
                    </Button>
                );
            case 'video':
                return (
                    <Button asChild className="w-full">
                        <a href={resource.videoUrl} target="_blank" rel="noopener noreferrer">
                            Watch Video
                        </a>
                    </Button>
                );
            case 'article':
                return (
                    <Button asChild className="w-full">
                        <Link href={`/counselling/${resource._id}`}>Read Article</Link>
                    </Button>
                );
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <div className="relative aspect-video bg-muted">
                <Image
                    src={`/images/resources/${resource._id}.jpg`}
                    alt={resource.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            <CardHeader>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-green-600">
                        {getIcon()}
                        <span className="text-sm font-medium capitalize">{resource.format}</span>
                    </div>
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <CardDescription>{resource.summary}</CardDescription>
            </CardContent>
            <CardFooter>{getAction()}</CardFooter>
        </Card>
    );
}