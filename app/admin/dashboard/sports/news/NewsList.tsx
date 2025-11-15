// app/admin/dashboard/sports/news/NewsList.tsx
'use client';

import { useModal } from '../../Modals/ModalContext';
import { Button } from '@/components/ui/button';
import {
    Plus,
    Edit,
    Trash2,
    Calendar,
    User,
    Tag,
    ImageIcon,
} from 'lucide-react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { format } from 'date-fns';

export default function NewsList({ news }: { news: any[] }) {
    const { openModal } = useModal();

    const total = news.length;
    const today = new Date().toISOString().split('T')[0];
    const recent = news.filter(
        (n) => n.publishedAt && n.publishedAt.startsWith(today)
    ).length;

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">
                        News Dispatch
                    </h1>
                    <p className="text-[13px] text-slate-600">
                        {total} articles • {recent} today
                    </p>
                </div>

                <Button
                    size="sm"
                    onClick={() => openModal({ type: 'addNews' })}
                    className="bg-gradient-to-r from-[#0A84FF] to-[#0052CC] text-white rounded-lg text-sm"
                >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Article
                </Button>
            </div>

            {/* Empty */}
            {news.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-xl py-10 text-center">
                    <p className="text-sm text-slate-500">
                        No articles published. Click “Add Article” to create one.
                    </p>
                </div>
            )}

            {/* List Mode */}
            <div className="space-y-3">
                {news.map((article) => {
                    const imageUrl = article.image?.asset
                        ? urlFor(article.image).width(100).height(70).url()
                        : null;

                    return (
                        <div
                            key={article._id}
                            className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-4 hover:shadow-sm transition-shadow"
                        >
                            {/* Image */}
                            <div className="w-24 h-16 rounded-md overflow-hidden border border-slate-200 flex-shrink-0">
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt=""
                                        width={100}
                                        height={70}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                        <ImageIcon className="h-5 w-5 text-slate-400" />
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h2 className="text-[15px] font-medium text-slate-900 truncate">
                                    {article.title}
                                </h2>
                                {article.excerpt && (
                                    <p className="text-[13px] text-slate-500 line-clamp-1 mt-0.5">
                                        {article.excerpt}
                                    </p>
                                )}

                                {/* Meta */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1 gap-x-4 mt-3 text-[12px] text-slate-600">
                                    {/* Author */}
                                    <div className="flex items-center gap-1.5">
                                        <User className="h-3.5 w-3.5" />
                                        {article.author || '—'}
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {article.publishedAt
                                            ? format(new Date(article.publishedAt), 'dd MMM yyyy')
                                            : '—'}
                                    </div>

                                    {/* Tags */}
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        {article.tags?.length > 0 ? (
                                            <>
                                                {article.tags.slice(0, 3).map((tag: string) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[11px] font-medium rounded-md"
                                                    >
                            {tag}
                          </span>
                                                ))}
                                                {article.tags.length > 3 && (
                                                    <span className="text-[11px] text-slate-500">
                            +{article.tags.length - 3}
                          </span>
                                                )}
                                            </>
                                        ) : (
                                            <span className="text-slate-400">—</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center flex-col gap-2 ml-2">
                                <button
                                    onClick={() =>
                                        openModal({ type: 'editNews', data: article })
                                    }
                                    className="p-2 rounded-md hover:bg-slate-100"
                                >
                                    <Edit className="h-4 w-4 text-slate-600" />
                                </button>

                                <button
                                    onClick={() =>
                                        openModal({ type: 'deleteNews', data: article })
                                    }
                                    className="p-2 rounded-md hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4 text-slate-600 hover:text-red-600" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
