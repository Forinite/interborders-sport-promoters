// components/layout/Footer.tsx
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { contactInfo } from '@/constants/counsellingData';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Sports', href: '/sports' },
        { name: 'Stories', href: '/stories' },
        { name: 'Counselling', href: '/counselling' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const socialLinks = [
        {
            name: 'Twitter',
            href: contactInfo.social.twitter,
            icon: <Twitter className="h-5 w-5" />,
        },
        {
            name: 'Instagram',
            href: contactInfo.social.instagram,
            icon: <Instagram className="h-5 w-5" />,
        },
        {
            name: 'WhatsApp',
            href: `https://wa.me/${contactInfo.social.whatsapp.replace(/\D/g, '')}`,
            icon: <Phone className="h-5 w-5" />,
        },
    ];

    return (
        <footer className="bg-muted/50 border-t mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/public" className="flex items-center space-x-2 mb-4">
                            <div className="h-8 w-8 rounded-full bg-green-600" />
                            <span className="text-xl font-bold">YouthSportNG</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Empowering Nigerian youth through sports, stories, and support.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold mb-4">Get in Touch</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <a href={`tel:${contactInfo.hotline.replace(/\s/g, '')}`}>
                                    {contactInfo.hotline}
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5" />
                                <span>{contactInfo.address}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social & Newsletter */}
                    <div>
                        <h3 className="font-semibold mb-4">Stay Connected</h3>
                        <div className="flex gap-3 mb-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-muted hover:bg-green-100 text-muted-foreground hover:text-green-600 transition-colors"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Follow us for updates, stories, and opportunities.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>
                        &copy; {currentYear} YouthSportNG. All rights reserved. | Made with{' '}
                        <span className="text-red-500">heart</span> in Nigeria
                    </p>
                </div>
            </div>
        </footer>
    );
}