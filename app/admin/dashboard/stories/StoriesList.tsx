// app/admin/dashboard/stories/StoriesList.tsx
'use client';

import { useModal } from '../Modals/ModalContext';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Calendar, User, Tag, Image as ImageIcon } from 'lucide-react';
import { Story } from '@/types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface StoriesListProps {
    stories: Story[];
}

export default function StoriesList({ stories }: StoriesListProps) {
    const { openModal } = useModal();

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Success Stories</h2>
                <Button
                    size="sm"
                    onClick={() => openModal({ type: 'addStory' })}
                    className="bg-green-600 hover:bg-green-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Story
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Story
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Author & Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tags
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {stories.map((story) => {
                        const imageUrl = story.image?.asset ? urlFor(story.image).width(80).height(80).url() : null;

                        return (
                            <tr key={story._id} className="hover:bg-gray-50 transition-colors">
                                {/* Story Preview */}
                                <td className="px-6 py-4">
                                    <div className="flex items-start gap-3">
                                        {imageUrl ? (
                                            <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                <Image
                                                    src={imageUrl}
                                                    alt={story.image?.alt || story.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="h-16 w-16 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                                                <ImageIcon className="h-6 w-6 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">{story.title}</p>
                                            {story.excerpt && (
                                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                    {story.excerpt}
                                                </p>
                                            )}
                                            {story.featured && (
                                                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                            Featured
                          </span>
                                            )}
                                        </div>
                                    </div>
                                </td>

                                {/* Author & Date */}
                                <td className="px-6 py-4 text-sm">
                                    <div className="space-y-1">
                                        {story.author ? (
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <User className="h-3.5 w-3.5" />
                                                <span>{story.author}</span>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground italic">No author</span>
                                        )}
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>
                          {story.publishedAt
                              ? new Date(story.publishedAt).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                              })
                              : '—'}
                        </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Tags */}
                                <td className="px-6 py-4">
                                    {story.tags && story.tags.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                            {story.tags.slice(0, 3).map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                                                >
                            <Tag className="h-3 w-3" />
                                                    {tag}
                          </span>
                                            ))}
                                            {story.tags.length > 3 && (
                                                <span className="text-xs text-muted-foreground">
                            +{story.tags.length - 3}
                          </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-xs text-muted-foreground">No tags</span>
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => openModal({ type: 'editStory', data: story })}
                                            className="hover:text-green-600"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => openModal({ type: 'deleteStory', data: story })}
                                            className="hover:text-red-600"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {stories.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No stories yet. Create your first one!</p>
                </div>
            )}
        </div>
    );
}