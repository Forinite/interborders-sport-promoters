// app/(components)/sports/components/FilterBar.tsx
'use client';
import React, { useState } from 'react';
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
                                      onFilter
                                  }: {
    onFilter?: (filters: { search: string; sport: string; location: string }) => void;
}) {
    const [search, setSearch] = useState('');
    const [sport, setSport] = useState('all');
    const [location, setLocation] = useState('all');

    const handleApply = () => {
        onFilter?.({ search, sport, location });
    };

    const handleClear = () => {
        setSearch('');
        setSport('all');
        setLocation('all');
        onFilter?.({ search: '', sport: 'all', location: 'all' });
    };

    const hasActiveFilters = search || sport !== 'all' || location !== 'all';

    return (
        <div className="relative mb-16">
            <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#E2E8F0] rounded-2xl" />
            <div className="relative bg-white rounded-2xl border-2 border-[#CBD5E1] shadow-xl p-8">
                <div className="grid gap-5 md:grid-cols-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-4 h-5 w-5 text-[#64748B]" />
                        <Input
                            placeholder="Search events, teams, locations..."
                            className="pl-12 h-14 text-base border-[#CBD5E1] focus:border-[#0A84FF] focus:ring-4 focus:ring-[#0A84FF]/10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

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

                    <div className="flex gap-3">
                        <Button className="flex-1 h-14 bg-[#0A84FF] hover:bg-[#0052CC] text-white font-bold text-base" onClick={handleApply}>
                            <Filter className="mr-2 h-5 w-5" />
                            Apply
                        </Button>
                        {hasActiveFilters && (
                            <Button variant="outline" size="icon" className="h-14 w-14 border-2 border-[#CBD5E1] hover:border-[#0A84FF]" onClick={handleClear}>
                                <X className="h-5 w-5" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
