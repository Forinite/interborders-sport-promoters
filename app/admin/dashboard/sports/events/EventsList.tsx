// app/admin/dashboard/sports/events/EventsList.tsx
'use client';

import { useModal } from '../../Modals/ModalContext';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, MapPin, Clock, Users, DollarSign, ExternalLink } from 'lucide-react';
import { Event } from '@/types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface EventsListProps {
    events: Event[];
}

export default function EventsList({ events }: EventsListProps) {
    const { openModal } = useModal();

    if (events.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <p className="text-muted-foreground">No events yet. Create your first one!</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Upcoming Events</h2>
                <Button
                    size="sm"
                    onClick={() => openModal({ type: 'addEvent' })}
                    className="bg-green-600 hover:bg-green-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                </Button>
            </div>

            <div className="divide-y">
                {events.map((event) => {
                    const imageUrl = event.image?.asset
                        ? urlFor(event.image).width(80).height(80).url()
                        : null;

                    const date = event.date ? new Date(event.date) : null;
                    const formattedDate = date
                        ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '—';

                    return (
                        <div key={event._id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex gap-4">
                                {/* Image */}
                                <div className="flex-shrink-0">
                                    {imageUrl ? (
                                        <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={imageUrl}
                                                alt={event.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-20 w-20 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                                            <MapPin className="h-8 w-8 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-medium text-foreground">{event.title}</h3>
                                    {event.sport && (
                                        <p className="text-sm text-green-600 font-medium">{event.sport}</p>
                                    )}

                                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{event.location || '—'}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{formattedDate}{event.time ? `, ${event.time}` : ''}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            <span>{event.ageGroup || 'All ages'}</span>
                                        </div>
                                    </div>

                                    {event.description && (
                                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                            {event.description}
                                        </p>
                                    )}

                                    <div className="mt-3 flex items-center gap-3 text-sm">
                                        {event.isFree ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        <DollarSign className="h-3 w-3" />
                        Free Entry
                      </span>
                                        ) : (
                                            <span className="text-muted-foreground">Paid</span>
                                        )}
                                        {event.spotsLeft !== undefined && (
                                            <span className="text-xs">
                        {event.spotsLeft > 0 ? (
                            <span className="text-orange-600 font-medium">{event.spotsLeft} spots left</span>
                        ) : (
                            <span className="text-red-600 font-medium">Sold Out</span>
                        )}
                      </span>
                                        )}
                                        {event.registrationLink && (
                                            <a
                                                href={event.registrationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-green-600 hover:underline text-xs"
                                            >
                                                Register
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => openModal({ type: 'editEvent', data: event })}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => openModal({ type: 'deleteEvent', data: event })}
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