// app/admin/dashboard/stories/StoriesList.tsx
// app/admin/dashboard/stories/StoriesList.tsx
"use client";

import { useModal } from "../Modals/ModalContext";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { format } from "date-fns";

export default function StoriesList({ stories }: { stories: any[] }) {
    const { openModal } = useModal();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Success Stories</h1>
                    <p className="text-xs text-slate-600 mt-0.5">
                        {stories.length} total • {stories.filter(s => s.featured).length} featured
                    </p>
                </div>

                <Button
                    size="sm"
                    onClick={() => openModal({ type: "addStory" })}
                    className="bg-gradient-to-r from-[#0A84FF] to-[#0052CC] text-white rounded-lg"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Story
                </Button>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Title</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Author</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Date</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Tags</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Actions</th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                    {stories.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-12 text-slate-500">
                                No stories found.
                            </td>
                        </tr>
                    ) : (
                        stories.map((story) => {
                            const img = story.image?.asset
                                ? urlFor(story.image).width(60).height(60).url()
                                : null;

                            return (
                                <tr key={story._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            {img ? (
                                                <Image
                                                    src={img}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover rounded-lg border"
                                                    alt=""
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-slate-100 rounded-lg border" />
                                            )}
                                            <div>
                                                <p className="font-medium text-slate-900 truncate max-w-52">
                                                    {story.title}
                                                </p>
                                                {story.excerpt && (
                                                    <p className="text-xs text-slate-500 line-clamp-1">
                                                        {story.excerpt}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 text-slate-600">{story.author || "—"}</td>

                                    <td className="px-4 py-4 text-slate-600 text-xs">
                                        {story.publishedAt
                                            ? format(new Date(story.publishedAt), "dd MMM yyyy")
                                            : "—"}
                                    </td>

                                    <td className="px-4 py-4">
                                        {story.tags?.length ? (
                                            <div className="flex flex-wrap gap-1">
                                                {story.tags.slice(0, 3).map((tag: string) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 bg-[#0A84FF]/10 text-[#0A84FF] text-xs rounded-md"
                                                    >
                                                            {tag}
                                                        </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-400">—</span>
                                        )}
                                    </td>

                                    <td className="px-4 py-4">
                                        {story.featured ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-md">
                                                    <Star className="h-3 w-3" />
                                                    Featured
                                                </span>
                                        ) : (
                                            <span className="text-xs text-slate-500">Draft</span>
                                        )}
                                    </td>

                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() =>
                                                    openModal({ type: "editStory", data: story })
                                                }
                                                className="h-8 w-8 p-0"
                                            >
                                                <Edit className="h-4 w-4 text-slate-700" />
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() =>
                                                    openModal({ type: "deleteStory", data: story })
                                                }
                                                className="h-8 w-8 p-0 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
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

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">
                {stories.length === 0 ? (
                    <p className="text-center text-slate-500 py-10">No stories found.</p>
                ) : (
                    stories.map((story) => {
                        const img = story.image?.asset
                            ? urlFor(story.image).width(300).height(200).url()
                            : null;

                        const isFeatured = story.featured;

                        return (
                            <div
                                key={story._id}
                                className={`relative bg-white border rounded-xl p-4 space-y-3 ${
                                    isFeatured
                                        ? "border-yellow-400 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                                        : "border-slate-200"
                                }`}
                            >
                                {/* FEATURED BADGE */}
                                {isFeatured && (
                                    <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-md text-[10px] font-medium shadow">
                                        <Star className="h-3 w-3" />
                                        Featured
                                    </div>
                                )}

                                {/* IMAGE */}
                                {img && (
                                    <div className="w-full h-40 relative rounded-lg overflow-hidden">
                                        <Image
                                            src={img}
                                            alt=""
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                {/* TITLE */}
                                <div>
                                    <h2 className="font-medium text-slate-900 text-sm">
                                        {story.title}
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                        {story.excerpt}
                                    </p>
                                </div>

                                {/* META */}
                                <div className="flex items-center justify-between text-xs text-slate-500">
                                    <span>{story.author || "Unknown"}</span>
                                    <span>
                            {story.publishedAt
                                ? format(new Date(story.publishedAt), "dd MMM yyyy")
                                : "—"}
                        </span>
                                </div>

                                {/* TAGS */}
                                {story.tags?.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {story.tags.slice(0, 3).map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 bg-[#0A84FF]/10 text-[#0A84FF] text-[10px] rounded-md"
                                            >
                                    {tag}
                                </span>
                                        ))}
                                    </div>
                                )}

                                {/* ACTIONS */}
                                <div className="flex justify-end gap-3 pt-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() =>
                                            openModal({ type: "editStory", data: story })
                                        }
                                        className="h-8 w-8 p-0"
                                    >
                                        <Edit className="h-4 w-4 text-slate-700" />
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() =>
                                            openModal({ type: "deleteStory", data: story })
                                        }
                                        className="h-8 w-8 p-0 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

        </div>
    );
}
