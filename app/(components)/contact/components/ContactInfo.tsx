// app/(components)/contact/components/ContactInfo.tsx
import { contactInfo } from '@/constants/counsellingData';
import { Phone, Mail, MapPin, Clock, Globe, Headphones } from 'lucide-react';

export default function ContactInfo() {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-extrabold mb-4">We’re Here 24/7</h3>
                <p className="text-white/90 leading-relaxed">
                    One mission, one team
                </p>
            </div>

            <div className="space-y-6">
                {[
                    {
                        icon: <Headphones className="h-6 w-6" />,
                        title: contactInfo.hotline,
                        subtitle: '24/7 Global Crisis Support • Free • Confidential',
                    },
                    {
                        icon: <Mail className="h-6 w-6" />,
                        title: contactInfo.email,
                        subtitle: 'Replies within 24 hours',
                        href: `mailto:${contactInfo.email}`,
                    },
                    {
                        icon: <MapPin className="h-6 w-6" />,
                        title: 'Global Headquarters',
                        subtitle: contactInfo.address,
                    },
                    {
                        icon: <Globe className="h-6 w-6" />,
                        title: 'Regional Offices',
                        subtitle: 'London • Dubai • Nairobi • New York • São Paulo',
                    },
                ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            {item.icon}
                        </div>
                        <div>
                            {item.href ? (
                                <a
                                    href={item.href}
                                    className="text-lg font-semibold hover:underline"
                                >
                                    {item.title}
                                </a>
                            ) : (
                                <p className="text-lg font-semibold">{item.title}</p>
                            )}
                            <p className="text-sm text-white/80">{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-6 border-t border-white/20">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 flex items-center gap-3">
                    <Clock className="h-6 w-6" />
                    <div>
                        <p className="font-semibold">Live Support</p>
                        <p className="text-sm text-white/80">Always open</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
