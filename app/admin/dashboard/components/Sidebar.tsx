// app/admin/dashboard/components/Sidebar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import {
    LayoutDashboard,
    FileText,
    Calendar,
    Newspaper,
    HeartHandshake,
    LogOut,
    Menu,
    X
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Stories', href: '/admin/dashboard/stories', icon: FileText },
    { name: 'Events', href: '/admin/dashboard/sports/events', icon: Calendar },
    { name: 'News', href: '/admin/dashboard/sports/news', icon: Newspaper },
    { name: 'Resources', href: '/admin/dashboard/counselling/resources', icon: HeartHandshake },
];

interface SidebarProps {
    open: boolean;
    onToggle: () => void;
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const Logo = ({ showText = true }: { showText?: boolean }) => (
        <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-black rounded-md flex items-center justify-center text-white font-semibold">
                IB
            </div>
            {showText && <span className="text-[15px] font-semibold text-slate-800">InterBoarder</span>}
        </Link>
    );

    const NavSection = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className="flex flex-col h-full">
            <div className="border-b border-slate-200 px-4 py-4 flex items-center justify-between">
                <Logo showText={open || isMobile} />
                {isMobile && (
                    <button onClick={() => setMobileOpen(false)}>
                        <X className="h-5 w-5 text-slate-600" />
                    </button>
                )}
            </div>

            <ul className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = pathname.startsWith(item.href);

                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={() => isMobile && setMobileOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                                    ${active
                                    ? 'bg-slate-100 text-slate-900 font-medium'
                                    : 'text-slate-600 hover:bg-slate-50'}
                                `}
                            >
                                <Icon className="h-4 w-4" />
                                {(open || isMobile) && <span>{item.name}</span>}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <div className="border-t border-slate-200 px-3 py-3">
                <button
                    onClick={() => signOut({ callbackUrl: '/admin/login' })}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    {(open || isMobile) && <span>Logout</span>}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={`hidden md:flex flex-col border-r border-slate-200 bg-white h-screen transition-all duration-300
                ${open ? 'w-60' : 'w-20'}`}
            >
                <div className="px-4 py-3 flex justify-end">
                    <button
                        onClick={onToggle}
                        className="p-2 rounded-md hover:bg-slate-100 transition-colors"
                    >
                        <Menu className="h-5 w-5 text-slate-600" />
                    </button>
                </div>
                <NavSection />
            </aside>

            {/* Mobile Drawer */}
            <button
                className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-md shadow-sm"
                onClick={() => setMobileOpen(true)}
            >
                <Menu className="h-6 w-6 text-slate-700" />
            </button>

            <div className={`md:hidden fixed inset-0 z-50 ${mobileOpen ? 'block' : 'hidden'}`}>
                <div
                    className="absolute inset-0 bg-black/40"
                    onClick={() => setMobileOpen(false)}
                />
                <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
                    <NavSection isMobile />
                </div>
            </div>
        </>
    );
}
