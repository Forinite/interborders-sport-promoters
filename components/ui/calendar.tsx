// components/ui/calendar.tsx
'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
                             className,
                             classNames,
                             showOutsideDays = true,
                             ...props
                         }: CalendarProps) {
    return (
        <div className="relative max-w-2xl mx-auto">
            {/* Depth Layers */}
            <div className="absolute inset-0 translate-x-2 translate-y-2 bg-blue-100 rounded-2xl blur-[1px]" />
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-blue-50/60 rounded-2xl border border-blue-200" />

            {/* Main Calendar */}
            <div className="relative bg-white/80 backdrop-blur-md rounded-2xl border border-blue-200 shadow-xl overflow-hidden transition-all hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)]">

                {/* Header */}
                <div className="bg-gradient-to-r from-[#0A63E0] via-[#004BCC] to-[#003A9B] px-6 py-4 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                                <CalendarIcon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold tracking-tight leading-tight">
                                    Interboarders Calendar
                                </p>
                                <p className="text-xs opacity-80">
                                    Sports & Youth Development
                                </p>
                            </div>
                        </div>

                        <span className="text-base font-semibold opacity-90">ISP</span>
                    </div>
                </div>

                {/* Main Date Grid */}
                <DayPicker
                    showOutsideDays={showOutsideDays}
                    className={cn('p-6', className)}
                    classNames={{
                        months: 'flex flex-col space-y-6',
                        month: 'space-y-4',
                        caption: 'flex justify-center pt-2 relative items-center',
                        caption_label: 'text-base font-semibold text-slate-800 tracking-wide',

                        nav: 'space-x-2 flex items-center absolute right-4 top-2',
                        nav_button: cn(
                            'h-8 w-8 rounded-lg flex items-center justify-center border border-blue-200 bg-white/70 backdrop-blur-sm',
                            'hover:bg-[#004BCC] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md'
                        ),
                        nav_button_previous: '',
                        nav_button_next: '',

                        table: 'w-full border-collapse',
                        head_row: 'flex mb-2',
                        head_cell: 'text-slate-500 font-medium text-[11px] uppercase tracking-wide w-10 text-center',

                        row: 'flex w-full mt-1 justify-center',
                        cell: 'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 ',

                        day: cn(
                            'min-h-9 min-w-9 p-2  items-center justify-center  font-medium text-slate-700 rounded-lg transition-all duration-300',
                            'hover:bg-blue-100 hover:text-[#004BCC] hover:scale-105'
                        ),

                        day_selected: cn(
                            'bg-[#004BCC] text-white font-semibold',
                            'shadow-md ring-2 ring-[#004BCC]/30 scale-105'
                        ),

                        day_today: cn(
                            'bg-gradient-to-br from-amber-400 to-orange-400 text-white font-semibold',
                            'shadow-md ring-2 ring-amber-300/50'
                        ),

                        day_outside: 'text-slate-300 opacity-40',
                        day_disabled: 'text-slate-300 line-through opacity-50',
                        day_hidden: 'invisible',
                        ...classNames,
                    }}
                    components={{

                    }}
                    {...props}
                />

                {/* Footer */}
                <div className="bg-slate-50 border-t border-blue-100 px-6 py-3 text-center">
                    <p className="text-xs font-medium text-slate-600 tracking-wide">
                        Empowering youth through sports, unity, and growth.
                    </p>
                </div>
            </div>
        </div>
    );
}
