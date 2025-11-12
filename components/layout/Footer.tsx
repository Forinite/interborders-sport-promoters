//components/layout/Footer.tsx
import Link from 'next/link';
import {
    Mail,
    Phone,
    MapPin,
    Twitter,
    Instagram,
    Youtube,
    Facebook,
    Shield,
    Heart,
    ArrowUpRight,
} from 'lucide-react';
import { contactInfo } from '@/constants/counsellingData';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Sports & Events', href: '/sports' },
        { name: 'Success Stories', href: '/stories' },
        { name: 'Free Counselling', href: '/counselling' },
        { name: 'Join Program', href: '/join' },
        { name: 'About Us', href: '/about' },
    ];

    const programs = [
        { name: 'National Youth Games', href: '/programs/games' },
        { name: 'Talent Academy', href: '/programs/academy' },
        { name: 'Mental Health Initiative', href: '/counselling' },
        { name: 'Leadership Training', href: '/programs/leadership' },
    ];

    const socials = [
        { icon: Twitter, href: contactInfo.social.twitter, color: 'hover:text-[#1DA1F2]' },
        { icon: Instagram, href: contactInfo.social.instagram, color: 'hover:text-[#E4405F]' },
        { icon: Youtube, href: contactInfo.social.youtube || '#', color: 'hover:text-[#FF0000]' },
        { icon: Facebook, href: contactInfo.social.facebook || '#', color: 'hover:text-[#1877F2]' },
    ];

    return (
        <footer className="mt-32 bg-gradient-to-b from-white to-[#FAFBFC] border-t border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* Main Grid */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                        <Link href="/" className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#0A84FF] to-[#0052CC] rounded-lg flex items-center justify-center shadow-sm">
                                <span className="text-white font-bold text-lg">ISP</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 leading-tight">
                                    InterBoarder <br /> Sport Promoters
                                </h2>
                            </div>
                        </Link>

                        <p className="text-sm text-slate-600 leading-relaxed mb-6">
                            Empowering youth through sports, mentorship, and mental health awareness.
                        </p>

                        <div className="flex gap-3">
                            {socials.map(({ icon: Icon, href, color }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-all ${color}`}
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <ArrowUpRight className="h-5 w-5 text-[#0A84FF]" />
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-600 hover:text-[#0A84FF] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-emerald-600" />
                            Our Programs
                        </h3>
                        <ul className="space-y-3">
                            {programs.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="bg-gradient-to-br from-[#0A84FF] to-[#0052CC] text-white rounded-2xl p-8 shadow-md">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Phone className="h-5 w-5" />
                            Get in Touch
                        </h3>
                        <ul className="space-y-4 text-white/90">
                            <li className="flex items-start gap-3">
                                <Phone className="h-4 w-4 mt-[2px]" />
                                <div>
                                    <p className="text-sm font-medium">{contactInfo.hotline}</p>
                                    <p className="text-xs opacity-80">24/7 Crisis Support</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4" />
                                <a href={`mailto:${contactInfo.email}`} className="text-sm hover:underline">
                                    {contactInfo.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 mt-[2px]" />
                                <p className="text-sm leading-snug">{contactInfo.address}</p>
                            </li>
                        </ul>

                        <div className="mt-6 border-t border-white/20 pt-4">
                            <p className="text-xs">
                                <Heart className="inline h-3 w-3 mr-1 fill-white" />
                                Over 250,000 youth supported
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
                    <p>© {currentYear} InterBoarder Sports Promoters — All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-[#0A84FF] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-[#0A84FF] transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/accessibility" className="hover:text-[#0A84FF] transition-colors">
                            Accessibility
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

