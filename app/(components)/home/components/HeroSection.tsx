// app/(components)/home/components/HeroSection.tsx
import Image from 'next/image';
import Link from 'next/link';
import {BasketBallPlayersImage, BasketBallPlayersImage2, FootballerImage} from '@/constants/images';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-10">
                <Image
                    src={BasketBallPlayersImage2}
                    alt="Nigerian youth athlete in action"
                    fill
                    priority
                    className="object-cover brightness-75 saturate-110"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Main Content */}
            <div className="container relative z-20 mx-auto px-5 md:px-8 max-w-7xl">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Text */}
                    <div className="space-y-6 md:space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-[#0A84FF]/10 border border-[#0A84FF]/30 rounded-lg">
                                <Sparkles className="w-4 h-4 text-[#0A84FF]" />
                                <span className="text-sm font-semibold text-[#0A84FF] tracking-wider">
                  EMPOWERING NIGERIAN YOUTH
                </span>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight relative">
                            Ignite the <span className="text-[#00FF9D]">Champion</span> Within
                            <span className="absolute top-2 left-2 text-[#00FF9D]/20 select-none hidden md:inline">
                Ignite the Champion Within
              </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
                            Transforming lives through sports, mentorship, and personal development.
                            Join thousands of Nigerian youth building brighter futures.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <LayeredButton href="/counselling" primary>
                                <div className="flex items-center gap-2" >
                                    Get Help <ArrowRight className="ml-2 w-5 h-5 inline" />
                                </div>

                            </LayeredButton>
                            <LayeredButton href="/stories">Read Success Stories</LayeredButton>
                        </div>
                    </div>

                    {/* Right: Featured Card */}
                    <div className="relative hidden md:block">
                        {/* Card Layers */}
                        <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#111827] rounded-xl" />
                        <div className="absolute inset-0 translate-x-2 translate-y-2 bg-[#1E293B] rounded-xl border border-[#374151]" />
                        <div className="relative bg-[#0F172A] rounded-xl border border-[#4B5563] p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-white">Featured Athlete</h3>
                                    <div className="px-3 py-1 bg-[#00FF9D]/20 text-[#00FF9D] text-xs font-semibold rounded-full">
                                        Rising Star
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-lg font-semibold text-white">Aisha Mohammed</h4>
                                    <p className="text-white/70 text-sm">
                                        From Lagos slums to national U-17 team captain. Scored 12 goals in 2025 qualifiers.
                                    </p>
                                </div>
                                <div className="pt-3 border-t border-[#374151] flex items-center justify-between text-sm text-white/70">
                                    <span>Sponsored since 2024</span>
                                    <span className="font-semibold text-[#00FF9D]">Read Full Story →</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-white/70 tracking-wider">Scroll to explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
                </div>
            </div>
        </section>
    );
}

// Layered Button
function LayeredButton({ children, href, primary = false }: { children: React.ReactNode; href: string; primary?: boolean }) {
    return (
        <Link href={href} className="group relative inline-block">
            {/* Back Layer */}
            <div className={`absolute inset-0 rounded-lg ${primary ? 'bg-[#00FF9D]/10' : 'bg-white/10'}`} />
            {/* Middle Layer */}
            <div className={`absolute inset-0 rounded-lg translate-x-0.5 translate-y-0.5 border ${primary ? 'border-[#00FF9D]' : 'border-white/20'}`} />
            {/* Front Layer */}
            <div
                className={`relative px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300
        ${primary ? 'bg-[#00FF9D] text-black' : 'bg-white text-[#0F172A]'} group-hover:-translate-y-1`}
            >
                {children}
            </div>
        </Link>
    );
}
