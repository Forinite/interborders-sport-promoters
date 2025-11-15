// app/admin/dashboard/components/DashboardHeader.tsx
// app/admin/dashboard/components/DashboardHeader.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Menu, Bell, Search, Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <header className="bg-white border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">

                {/* Left: Menu + Search */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="lg:hidden"
                    >
                        <Menu className="h-5 w-5 text-slate-600" />
                    </Button>

                    {/* Global Search */}
                    <div className="relative">
                        {searchOpen ? (
                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 w-80 transition-all">
                                <Search className="h-4 w-4 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search stories, events, users..."
                                    className="bg-transparent outline-none flex-1 text-sm"
                                    autoFocus
                                    onBlur={() => setSearchOpen(false)}
                                />
                            </div>
                        ) : (
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                <Search className="h-4 w-4 text-slate-500" />
                                <span className="text-sm text-slate-500">Search...</span>
                                <kbd className="ml-auto text-xs text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">⌘K</kbd>
                            </button>
                        )}
                    </div>
                </div>

                {/* Right: Notifications + User */}
                <div className="flex items-center gap-4">
                    {/* Language */}
                    <button className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                        <Globe className="h-4 w-4" />
                        <span>EN</span>
                        <ChevronDown className="h-3 w-3" />
                    </button>

                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5 text-slate-600" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                    </Button>

                    {/* User */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0A84FF] to-[#0052CC] flex items-center justify-center text-white font-black text-sm shadow-md">
                            A
                        </div>
                        <div className="hidden lg:block">
                            <p className="text-sm font-semibold text-slate-900">Admin</p>
                            <p className="text-xs text-slate-500">admin@interboarder.org</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}