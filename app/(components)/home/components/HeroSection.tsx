// app/(components)/home/components/HeroSection.tsx
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
            <Image
                src="/images/hero-youth-sports.jpg"
                alt="Youth playing football in Lagos"
                fill
                priority
                className="object-cover brightness-75"
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="container relative z-10 flex h-full flex-col justify-end pb-12 text-white">
                <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                    Play. Grow. Thrive.
                </h1>
                <p className="mb-8 max-w-2xl text-lg md:text-xl">
                    Join thousands of Nigerian youth transforming their lives through sports and
                    personal development.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700">
                        Explore Opportunities
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                        Read Success Stories
                    </Button>
                </div>
            </div>
        </section>
    );
}