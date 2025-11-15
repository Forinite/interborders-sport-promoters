// components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, ChevronDown, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { navLinks } from '@/constants/navLinks';

export default function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`sticky top-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-100'
                        : 'bg-white/80 backdrop-blur-xl border-b border-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-20">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[#E2E8F0] rounded-lg opacity-60 group-hover:opacity-80 transition" />
                                <div className="relative w-12 h-12 bg-gradient-to-br from-[#0A84FF] to-[#0052CC] rounded-lg flex items-center justify-center shadow-md">
                                    <span className="text-white font-black text-xl tracking-tight">ISP</span>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-slate-900 leading-none">InterBoarder</h1>
                                <p className="text-[11px] text-slate-500 font-medium tracking-widest">SPORT PROMOTERS</p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative text-[15px] font-medium transition-all duration-300 ${
                                            isActive ? 'text-[#0A84FF]' : 'text-slate-700 hover:text-[#0A84FF]'
                                        }`}
                                    >
                                        {link.name}
                                        <span
                                            className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-[#0A84FF] to-[#0052CC] transition-all duration-300 ${
                                                isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}
                                        />
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            {/* Language Selector */}
                            <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:border-[#0A84FF] hover:bg-[#0A84FF]/5 transition">
                                <Globe className="h-4 w-4 text-slate-600" />
                                <span className="text-sm font-medium">EN</span>
                                <ChevronDown className="h-3 w-3" />
                            </button>

                            {/* CTA */}
                            <Link href="/join">
                                <button className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-[#0A84FF] to-[#0052CC] text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition">
                                    Join
                                </button>
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav */}
                {mobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 top-20 bg-white h-fit backdrop-blur-2xl z-40 border-t border-slate-100">
                        <div className="max-w-7xl mx-auto px-6 py-8">
                            <nav className="space-y-6">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`block text-2xl font-bold transition ${
                                                isActive ? 'text-[#0A84FF]' : 'text-slate-800 hover:text-[#0A84FF]'
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="mt-10 border-t border-slate-200 pt-8">
                                <Link href="/join">
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full py-4 bg-gradient-to-r from-[#0A84FF] to-[#0052CC] text-white text-lg font-semibold rounded-xl shadow-lg"
                                    >
                                        Join the Movement
                                    </button>
                                </Link>
                            </div>

                            <p className="mt-8 text-center text-slate-500 text-sm">
                                Active in 47 countries • 250,000+ youth supported
                            </p>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
