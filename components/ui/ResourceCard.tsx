// components/ui/ResourceCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FileText, PlayCircle, BookOpen, ArrowRight } from 'lucide-react';
import { FootballerImage2 } from '@/constants/images';
import { type Resource } from '@/types';

// ————————————————————————————————————————
// CONFIG MAP: DRY, TYPE-SAFE, NO CONSOLE
// ————————————————————————————————————————
const FORMAT_CONFIG = {
    pdf: {
        icon: <FileText className="h-5 w-5 text-red-500" />,
        label: 'PDF',
        action: (url?: string) =>
            url ? (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                >
                    Download PDF <ArrowRight className="h-4 w-4" />
                </a>
            ) : (
                <span className="text-slate-400 text-sm">File not available</span>
            ),
    },
    video: {
        icon: <PlayCircle className="h-5 w-5 text-blue-500" />,
        label: 'VIDEO',
        action: (url?: string) =>
            url ? (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                >
                    Watch Video <ArrowRight className="h-4 w-4" />
                </a>
            ) : (
                <span className="text-slate-400 text-sm">Video not available</span>
            ),
    },
    article: {
        icon: <BookOpen className="h-5 w-5 text-emerald-500" />,
        label: 'ARTICLE',
        action: (_id: string) => (
            <Link
                href={`/counselling/${_id}`}
                className="text-sky-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
            >
                Read Article <ArrowRight className="h-4 w-4" />
            </Link>
        ),
    },
} as const;

export default function ResourceCard({ resource }: { resource: Resource }) {
    // ————————————————————————————————————————
    // SAFE DEFAULTS
    // ————————————————————————————————————————
    const imageUrl = resource.image?.asset?.url || FootballerImage2;
    const imageAlt = resource.image?.alt || resource.title || 'Resource image';
    const title = resource.title || `${resource.format.charAt(0).toUpperCase() + resource.format.slice(1)} Resource`;
    const summary = resource.summary || `This ${resource.format} is designed to support your growth.`;

    // ————————————————————————————————————————
    // GET CONFIG (TYPE-SAFE)
    // ————————————————————————————————————————
    const config = FORMAT_CONFIG[resource.format] ?? {
        icon: <FileText className="h-5 w-5 text-slate-500" />,
        label: 'UNKNOWN',
        action: () => <span className="text-slate-400 text-sm">No action</span>,
    };

    const action = resource.format === 'article'
        ? config.action(resource._id)
        : config.action(resource.format === 'pdf' ? resource.fileUrl : resource.videoUrl);

    return (
        <div className="group relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Image */}
            <div className="relative aspect-video bg-slate-50">
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

                {/* Format Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 border border-slate-200 shadow-sm">
                    {config.icon}
                    <span className="tracking-wider text-slate-700">{config.label}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 flex flex-col justify-between min-h-[260px] sm:min-h-[280px]">
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 line-clamp-2 leading-tight">
                        {title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                        {summary}
                    </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                    {action}
                </div>
            </div>
        </div>
    );
}