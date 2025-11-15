// app/admin/dashboard/sports/events/EventsList.tsx
'use client';

import { useModal } from '../../Modals/ModalContext';
import { Button } from '@/components/ui/button';
import {
    Plus,
    Edit,
    Trash2,
    MapPin,
    Clock,
    Users,
    DollarSign,
    ExternalLink,
    Calendar,
} from 'lucide-react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { format } from 'date-fns';

export default function EventsList({ events }: { events: any[] }) {
    const { openModal } = useModal();

    const upcoming = events.filter((e) => new Date(e.date) >= new Date()).length;
    const total = events.length;

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">Events</h1>
                    <p className="text-[13px] text-slate-600">
                        {total} total • {upcoming} upcoming • {total - upcoming} past
                    </p>
                </div>
                <Button
                    size="sm"
                    onClick={() => openModal({ type: 'addEvent' })}
                    className="bg-gradient-to-r from-[#0A84FF] to-[#0052CC] text-white font-medium rounded-lg text-sm"
                >
                    <Plus className="h-4 w-4 mr-1" /> Add Event
                </Button>
            </div>

            {/* Empty State */}
            {events.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-xl py-10 text-center">
                    <p className="text-sm text-slate-500">
                        No events scheduled. Click “Add Event” to begin.
                    </p>
                </div>
            )}

            {/* List */}
            <div className="space-y-3">
                {events.map((event) => {
                    const imageUrl = event.image?.asset
                        ? urlFor(event.image).width(120).height(80).url()
                        : null;

                    const date = event.date ? new Date(event.date) : null;
                    const isUpcoming = date ? date >= new Date() : false;

                    return (
                        <div
                            key={event._id}
                            className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-4 hover:shadow-sm transition-shadow"
                        >
                            {/* Image */}
                            <div className="w-28 h-20 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt=""
                                        width={120}
                                        height={80}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                        <Calendar className="h-5 w-5 text-slate-400" />
                                    </div>
                                )}
                            </div>

                            {/* Center Content */}
                            <div className="flex-1 min-w-0">
                                {/* Title + Description */}
                                <h2 className="text-[15px] font-medium text-slate-900 truncate">
                                    {event.title}
                                </h2>
                                {event.description && (
                                    <p className="text-[13px] text-slate-500 line-clamp-1">
                                        {event.description}
                                    </p>
                                )}

                                {/* Metadata Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1 gap-x-4 mt-3 text-[12px] text-slate-600">
                                    {/* Date */}
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5" />
                                        {date ? format(date, 'dd MMM yyyy') : '—'}
                                    </div>

                                    {/* Time */}
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5" />
                                        {event.time || '—'}
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5" />
                                        <span className="truncate">{event.location || '—'}</span>
                                    </div>

                                    {/* Sport */}
                                    <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-[11px]">
                      {event.sport || '—'}
                    </span>
                                    </div>

                                    {/* Capacity */}
                                    <div className="flex items-center gap-1.5">
                                        <Users className="h-3.5 w-3.5" />
                                        {event.spotsLeft !== undefined
                                            ? `${event.spotsLeft} left`
                                            : '—'}
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center gap-1.5">
                                        {event.isFree ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[11px]">
                        <DollarSign className="h-3 w-3" />
                        Free
                      </span>
                                        ) : event.spotsLeft === 0 ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-md text-[11px]">
                        Sold Out
                      </span>
                                        ) : isUpcoming ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-[11px]">
                        Upcoming
                      </span>
                                        ) : (
                                            <span className="text-[11px] text-slate-500">
                        Completed
                      </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center flex-col gap-2 ml-2">
                                {event.registrationLink && (
                                    <a
                                        href={event.registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 hover:bg-slate-100 rounded-md transition-colors"
                                    >
                                        <ExternalLink className="h-4 w-4 text-slate-500" />
                                    </a>
                                )}

                                <button
                                    onClick={() =>
                                        openModal({ type: 'editEvent', data: event })
                                    }
                                    className="p-2 hover:bg-slate-100 rounded-md"
                                >
                                    <Edit className="h-4 w-4 text-slate-600" />
                                </button>

                                <button
                                    onClick={() =>
                                        openModal({ type: 'deleteEvent', data: event })
                                    }
                                    className="p-2 hover:bg-red-50 rounded-md"
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
