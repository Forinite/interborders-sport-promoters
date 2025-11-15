// components/ui/ResourceCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FileText, PlayCircle, BookOpen, ArrowRight } from 'lucide-react';
import { FootballerImage2 } from "@/constants/images";
import {Resource} from "@/types";

export default function ResourceCard({ resource }: { resource: Resource }) {
    const imageUrl = resource.image?.asset?.url || FootballerImage2;
    const imageAlt = resource.image?.alt || resource.title;

    const getIcon = () => {

        switch (resource.format) {
            case 'pdf':
                return <FileText className="h-5 w-5 text-red-500" />;
            case 'video':
                return <PlayCircle className="h-5 w-5 text-blue-500" />;
            case 'article':
                return <BookOpen className="h-5 w-5 text-emerald-500" />;
        }

    };

    const getAction = () => {

        switch (resource.format) {
            case 'pdf':
                console.log(resource)
                return resource.fileUrl ? (
                    <a
                        href={resource.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        Download PDF <ArrowRight className="h-4 w-4" />
                    </a>
                ) : null;
            case 'video':
                return resource.videoUrl ? (
                    <a
                        href={resource.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        Watch Video <ArrowRight className="h-4 w-4" />
                    </a>
                ) : null;
            case 'article':
                return (
                    <Link
                        href={`/counselling/${resource._id}`}
                        className="text-sky-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        Read Article <ArrowRight className="h-4 w-4" />
                    </Link>
                );
        }
    };

    return (
        <div className="group relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all">
            <div className="relative aspect-video">
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 border border-slate-200 shadow-sm">
                    {getIcon()}
                    <span className="uppercase tracking-wide text-slate-700">{resource.format}</span>
                </div>
            </div>

            <div className="p-6 flex flex-col justify-between min-h-[280px]">
                <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3 line-clamp-2">
                        {resource.title || resource.format + "Resource"}
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed line-clamp-3">
                        {resource.summary || "This" + resource.format + "is aimed at helping you"}
                    </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100">
                    {getAction()}
                </div>
            </div>
        </div>
    );
}