// app/admin/dashboard/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    FileText,
    Calendar,
    Newspaper,
    HeartHandshake,
    Menu,
    LogOut
} from 'lucide-react';
import {signOut} from "next-auth/react";

const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Stories', href: '/admin/dashboard/stories', icon: FileText },
    { name: 'Events', href: '/admin/dashboard/sports/events', icon: Calendar },
    { name: 'News', href: '/admin/dashboard/sports/news', icon: Newspaper },
    { name: 'Resources', href: '/admin/dashboard/counselling', icon: HeartHandshake },
];

interface SidebarProps {
    open: boolean;
    onToggle: () => void;
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={`${
            open ? 'w-64' : 'w-20'
        } bg-white border-r transition-all duration-300 flex flex-col`}>
            <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                    <div className={`flex items-center space-x-3 ${open ? 'block' : 'hidden md:block'}`}>
                        <div className="h-8 w-8 rounded-full bg-green-600" />
                        <span className="font-bold text-lg">Admin</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggle}
                        className="md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-green-50 text-green-600'
                                            : 'hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className={`${open ? 'block' : 'hidden md:block'}`}>
                    {item.name}
                  </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t">
                // Inside Sidebar.tsx — replace the logout button
                <Button
                    variant="ghost"
                    className="w-full justify-start space-x-3"
                    onClick={() => signOut({ callbackUrl: '/admin/login' })}
                >
                    <LogOut className="h-5 w-5" />
                    <span className={`${open ? 'block' : 'hidden md:block'}`}>Logout</span>
                </Button>
            </div>
        </aside>
    );
}