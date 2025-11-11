// app/admin/dashboard/components/DashboardHeader.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Menu, Bell, Search } from 'lucide-react';

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    return (
        <header className="bg-white border-b px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search content..."
                            className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                    </Button>
                    <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-medium">
                            A
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-medium">Admin User</p>
                            <p className="text-xs text-muted-foreground">admin@youthsportng.org</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}