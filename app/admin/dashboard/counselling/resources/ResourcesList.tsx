// app/admin/dashboard/counselling/resources/ResourcesList.tsx
'use client';

import { useModal } from '../../Modals/ModalContext';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, FileText, Video, BookOpen, Tag, Calendar, Download, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { format } from 'date-fns';

const formatIcons: Record<string, any> = {
    pdf: FileText,
    video: Video,
    article: BookOpen,
};

const formatColors: Record<string, string> = {
    pdf: 'text-red-600 bg-red-50',
    video: 'text-purple-600 bg-purple-50',
    article: 'text-blue-600 bg-blue-50',
};

export default function ResourcesList({ resources }: { resources: any[] }) {
    const { openModal } = useModal();

    const total = resources.length;
    const pdfCount = resources.filter(r => r.format === 'pdf').length;
    const videoCount = resources.filter(r => r.format === 'video').length;

    return (
        <div className="space-y-5">

            {/* Knowledge Vault Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Knowledge Vault</h1>
                    <p className="text-sm text-slate-600 mt-0.5">
                        {total} resources • {pdfCount} PDFs • {videoCount} videos
                    </p>
                </div>
                <Button
                    size="sm"
                    onClick={() => openModal({ type: 'addResource' })}
                    className="bg-gradient-to-r from-[#0A84FF] to-[#0052CC] text-white font-medium rounded-xl text-sm"
                >
                    <Plus className="h-4 w-4 mr-1.5" />
                    Add Resource
                </Button>
            </div>

            {/* Dense Intelligence Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Resource</th>
                        <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Type</th>
                        <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Date</th>
                        <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Tags</th>
                        <th className="px-4 py-2.5 text-right font-semibold text-slate-700">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {resources.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-10 text-slate-500 text-xs">
                                Vault is empty. Click "Add Resource" to upload intelligence.
                            </td>
                        </tr>
                    ) : (
                        resources.map((resource) => {
                            const Icon = formatIcons[resource.format] || FileText;
                            const colorClass = formatColors[resource.format] || 'text-slate-600 bg-slate-50';
                            const imageUrl = resource.image?.asset ? urlFor(resource.image).width(50).height(50).url() : null;

                            return (
                                <tr key={resource._id} className="hover:bg-slate-50 transition-colors">
                                    {/* Title + Image */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2.5">
                                            {imageUrl ? (
                                                <div className="w-9 h-9 rounded-md overflow-hidden border border-slate-200">
                                                    <Image src={imageUrl} alt="" width={36} height={36} className="object-cover" />
                                                </div>
                                            ) : (
                                                <div className={`w-9 h-9 rounded-md flex items-center justify-center ${colorClass}`}>
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-slate-900 truncate max-w-80">{resource.title}</p>
                                                {resource.summary && (
                                                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{resource.summary}</p>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Type */}
                                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${colorClass}`}>
                        <Icon className="h-3 w-3" />
                          {resource.format?.toUpperCase() || '—'}
                      </span>
                                    </td>

                                    {/* Date */}
                                    <td className="px-4 py-3 text-slate-600">
                                        {resource.publishedAt ? (
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>{format(new Date(resource.publishedAt), 'dd MMM yyyy')}</span>
                                            </div>
                                        ) : (
                                            <span className="text-slate-400">—</span>
                                        )}
                                    </td>

                                    {/* Tags */}
                                    <td className="px-4 py-3">
                                        {resource.tags?.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {resource.tags.slice(0, 3).map((tag: string) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 bg-[#0A84FF]/10 text-[#0A84FF] text-xs font-medium rounded-md"
                                                    >
                              {tag}
                            </span>
                                                ))}
                                                {resource.tags.length > 3 && (
                                                    <span className="text-xs text-slate-500">+{resource.tags.length - 3}</span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-slate-400 text-xs">—</span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end items-center gap-1.5">
                                            {resource.fileUrl && (
                                                <a
                                                    href={resource.fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"
                                                    title="Download"
                                                >
                                                    <Download className="h-3.5 w-3.5 text-slate-500" />
                                                </a>
                                            )}
                                            {resource.link && (
                                                <a
                                                    href={resource.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"
                                                    title="Open"
                                                >
                                                    <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                                                </a>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => openModal({ type: 'editResource', data: resource })}
                                                className="h-7 w-7 p-0 hover:bg-slate-100"
                                            >
                                                <Edit className="h-3.5 w-3.5 text-slate-600" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => openModal({ type: 'deleteResource', data: resource })}
                                                className="h-7 w-7 p-0 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-3.5 w-3.5 text-slate-600 hover:text-red-600" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}