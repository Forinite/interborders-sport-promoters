// app/(components)/sports/components/FilterBar.tsx
// app/(components)/sports/components/FilterBar.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Trophy, Filter, X } from 'lucide-react';
import {
    CustomSelect,
    CustomSelectTrigger,
    CustomSelectValue,
    CustomSelectContent,
    CustomSelectItem
} from '@/components/ui/custom-select';

export default function FilterBar({
                                      allEvents = [],
                                      allNews = [],
                                      onFilter
                                  }: {
    allEvents?: any[];
    allNews?: any[];
    onFilter?: (filtered: { events: any[]; news: any[] }) => void;
}) {
    const [search, setSearch] = useState('');
    const [sport, setSport] = useState('all');
    const [location, setLocation] = useState('all');

    // Real filtering logic
    const filtered = useMemo(() => {
        const query = search.toLowerCase();

        const filterItems = (items: any[]) => items.filter(item => {
            const matchesSearch = !search ||
                item.title.toLowerCase().includes(query) ||
                item.location.toLowerCase().includes(query) ||
                item.description?.toLowerCase().includes(query);

            const matchesSport = sport === 'all' ||
                item.sport?.toLowerCase() === sport ||
                item.category?.toLowerCase() === sport;

            const matchesLocation = location === 'all' ||
                item.location.toLowerCase().includes(location);

            return matchesSearch && matchesSport && matchesLocation;
        });

        return {
            events: filterItems(allEvents || []),
            news: filterItems(allNews || [])
        };
    }, [search, sport, location, allEvents, allNews]);

    // Notify parent (SportsPage) of changes
    React.useEffect(() => {
        onFilter?.(filtered);
    }, [filtered, onFilter]);

    const hasActiveFilters = search || sport !== 'all' || location !== 'all';

    return (
        <div className="relative mb-16">
            {/* Deep Back */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#E2E8F0] rounded-2xl" />

            {/* Main Bar */}
            <div className="relative bg-white rounded-2xl border-2 border-[#CBD5E1] shadow-xl p-8">
                <div className="grid gap-5 md:grid-cols-4">

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-4 h-5 w-5 text-[#64748B]" />
                        <Input
                            placeholder="Search events, teams, locations..."
                            className="pl-12 h-14 text-base border-[#CBD5E1] focus:border-[#0A84FF] focus:ring-4 focus:ring-[#0A84FF]/10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Sport — Custom Dropdown */}
                    <CustomSelect value={sport} onValueChange={setSport}>
                        <CustomSelectTrigger className="h-14 border-2 border-[#CBD5E1] hover:border-[#0A84FF] transition-colors">
                            <Trophy className="h-5 w-5 text-[#0A84FF]" />
                            <CustomSelectValue placeholder="All Sports" />
                        </CustomSelectTrigger>
                        <CustomSelectContent>
                            <CustomSelectItem value="all">All Sports</CustomSelectItem>
                            <CustomSelectItem value="football">Football</CustomSelectItem>
                            <CustomSelectItem value="basketball">Basketball</CustomSelectItem>
                            <CustomSelectItem value="athletics">Athletics</CustomSelectItem>
                        </CustomSelectContent>
                    </CustomSelect>

                    {/* Location — Custom Dropdown */}
                    <CustomSelect value={location} onValueChange={setLocation}>
                        <CustomSelectTrigger className="h-14 border-2 border-[#CBD5E1] hover:border-[#0A84FF] transition-colors">
                            <MapPin className="h-5 w-5 text-[#0A84FF]" />
                            <CustomSelectValue placeholder="All Nigeria" />
                        </CustomSelectTrigger>
                        <CustomSelectContent>
                            <CustomSelectItem value="all">All Nigeria</CustomSelectItem>
                            <CustomSelectItem value="lagos">Lagos</CustomSelectItem>
                            <CustomSelectItem value="abuja">Abuja</CustomSelectItem>
                            <CustomSelectItem value="ph">Port Harcourt</CustomSelectItem>
                        </CustomSelectContent>
                    </CustomSelect>

                    {/* Apply + Clear */}
                    <div className="flex gap-3">
                        <Button
                            className="flex-1 h-14 bg-[#0A84FF] hover:bg-[#0052CC] text-white font-bold text-base"
                            onClick={() => onFilter?.(filtered)}
                        >
                            <Filter className="mr-2 h-5 w-5" />
                            Apply ({filtered.events.length + filtered.news.length})
                        </Button>

                        {hasActiveFilters && (
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-14 w-14 border-2 border-[#CBD5E1] hover:border-[#0A84FF]"
                                onClick={() => {
                                    setSearch('');
                                    setSport('all');
                                    setLocation('all');
                                }}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Active filters chips */}
                {hasActiveFilters && (
                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[#E2E8F0]">
                        {search && (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A84FF]/10 border border-[#0A84FF]/30 rounded-full text-sm font-medium text-[#0052CC]">
                Search: "{search}"
                <button onClick={() => setSearch('')} className="ml-2"><X className="h-3 w-3" /></button>
              </span>
                        )}
                        {sport !== 'all' && (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A84FF]/10 border border-[#0A84FF]/30 rounded-full text-sm font-medium text-[#0052CC]">
                Sport: {sport}
                                <button onClick={() => setSport('all')} className="ml-2"><X className="h-3 w-3" /></button>
              </span>
                        )}
                        {location !== 'all' && (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A84FF]/10 border border-[#0A84FF]/30 rounded-full text-sm font-medium text-[#0052CC]">
                Location: {location}
                                <button onClick={() => setLocation('all')} className="ml-2"><X className="h-3 w-3" /></button>
              </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}