// app/admin/dashboard/sports/news/NewsList.tsx
'use client';

import { useModal } from '../../Modals/ModalContext';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Calendar, User, Tag, Image as ImageIcon } from 'lucide-react';
import { News } from '@/types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface NewsListProps {
    news: News[];
}

export default function NewsList({ news }: NewsListProps) {
    const { openModal } = useModal();

    if (news.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <p className="text-muted-foreground">No news articles yet. Create your first one!</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">News Articles</h2>
                <Button
                    size="sm"
                    onClick={() => openModal({ type: 'addNews' })}
                    className="bg-green-600 hover:bg-green-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Article
                </Button>
            </div>

            <div className="divide-y">
                {news.map((article) => {
                    const imageUrl = article.image?.asset
                        ? urlFor(article.image).width(80).height(80).url()
                        : null;

                    const date = article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })
                        : '—';

                    return (
                        <div key={article._id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex gap-4">
                                {/* Image */}
                                <div className="flex-shrink-0">
                                    {imageUrl ? (
                                        <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={imageUrl}
                                                alt={article.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-20 w-20 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                                            <ImageIcon className="h-8 w-8 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-medium text-foreground">{article.title}</h3>

                                    {article.excerpt && (
                                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                    )}

                                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                                        {article.author && (
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                <span>{article.author}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>{date}</span>
                                        </div>
                                    </div>

                                    {article.tags && article.tags.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-1">
                                            {article.tags.slice(0, 3).map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                                                >
                          <Tag className="h-3 w-3" />
                                                    {tag}
                        </span>
                                            ))}
                                            {article.tags.length > 3 && (
                                                <span className="text-xs text-muted-foreground">
                          +{article.tags.length - 3}
                        </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => openModal({ type: 'editNews', data: article })}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => openModal({ type: 'deleteNews', data: article })}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}