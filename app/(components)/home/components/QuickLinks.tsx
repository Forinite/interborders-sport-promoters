// app/(components)/home/components/QuickLinks.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, HeartHandshake, Trophy } from 'lucide-react';

export default function QuickLinks() {
    const links = [
        {
            href: '/sports',
            title: 'Sports Events',
            description: 'Find tournaments, training, and opportunities near you',
            icon: <Trophy className="h-8 w-8" />,
        },
        {
            href: '/counselling',
            title: 'Get Support',
            description: 'Free counselling, resources, and personal growth tools',
            icon: <HeartHandshake className="h-8 w-8" />,
        },
        {
            href: '/stories',
            title: 'Inspiration',
            description: 'Read real stories of youth overcoming challenges',
            icon: <Calendar className="h-8 w-8" />,
        },
    ];

    return (
        <section className="bg-muted/50 py-16">
            <div className="container mx-auto px-4">
                <div className="grid gap-6 md:grid-cols-3">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group flex flex-col items-center rounded-lg bg-background p-8 text-center shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="mb-4 text-green-600 transition-transform group-hover:scale-110">
                                {link.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">{link.title}</h3>
                            <p className="mb-4 text-sm text-muted-foreground">{link.description}</p>
                            <Button variant="ghost" className="mt-auto">
                                Explore <span className="ml-1">→</span>
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}