// app/admin/dashboard/counselling/resources/ResourcesList.tsx
'use client';

import { useModal } from '../../Modals/ModalContext';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, FileText, Video, BookOpen, Tag, Calendar, Image as ImageIcon } from 'lucide-react';
import { Resource } from '@/types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface ResourcesListProps {
    resources: Resource[];
}

const formatIcons = {
    pdf: FileText,
    video: Video,
    article: BookOpen,
};

export default function ResourcesList({ resources }: ResourcesListProps) {
    const { openModal } = useModal();

    if (resources.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <p className="text-muted-foreground">No resources yet. Create your first one!</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Resources</h2>
                <Button
                    size="sm"
                    onClick={() => openModal({ type: 'addResource' })}
                    className="bg-green-600 hover:bg-green-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Resource
                </Button>
            </div>

            <div className="divide-y">
                {resources.map((resource) => {
                    const Icon = formatIcons[resource.format];
                    const imageUrl = resource.image?.asset
                        ? urlFor(resource.image).width(80).height(80).url()
                        : null;

                    const date = resource.publishedAt
                        ? new Date(resource.publishedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })
                        : '—';

                    return (
                        <div key={resource._id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex gap-4">
                                {/* Thumbnail */}
                                <div className="flex-shrink-0">
                                    {imageUrl ? (
                                        <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={imageUrl}
                                                alt={resource.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-20 w-20 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                                            <Icon className="h-8 w-8 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <Icon className="h-5 w-5 text-green-600" />
                                        <h3 className="text-lg font-medium text-foreground">{resource.title}</h3>
                                    </div>

                                    {resource.summary && (
                                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                            {resource.summary}
                                        </p>
                                    )}

                                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>{date}</span>
                                        </div>
                                    </div>

                                    {resource.tags && resource.tags.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-1">
                                            {resource.tags.slice(0, 3).map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
                                                >
                          <Tag className="h-3 w-3" />
                                                    {tag}
                        </span>
                                            ))}
                                            {resource.tags.length > 3 && (
                                                <span className="text-xs text-muted-foreground">
                          +{resource.tags.length - 3}
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
                                        onClick={() => openModal({ type: 'editResource', data: resource })}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => openModal({ type: 'deleteResource', data: resource })}
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